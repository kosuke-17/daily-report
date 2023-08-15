import logging
from logging import config
from typing import Iterator, List
from domain.daily_report_exception import BookNotFoundError
from presentation.schema.daily_report.daily_report_error_message import (
    ErrorMessageDailyReportNotFound,
)
from infrastructure.mysql.daily_report.daily_report_service import (
    DailyReportQueryServiceImpl,
)
from starlette.middleware.cors import CORSMiddleware

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session
from usecase.daily_report.daily_report_query_service import DailyReportQueryService
from usecase.daily_report.daily_report_query_usecase import (
    DailyReportQueryUseCase,
    DailyReportQueryUseCaseImpl,
)
from domain.daily_report import DailyReportRepository
from infrastructure.mysql.daily_report.daily_report_repository import (
    DailyReportCommandUseCaseUnitOfWorkImpl,
    DailyReportRepositoryImpl,
)

from infrastructure.mysql.database import SessionLocal, create_tables
from usecase.daily_report.daily_report_command_model import DailyReportCreateModel
from usecase.daily_report.daily_report_command_usecase import (
    DailyReportCommandUseCase,
    DailyReportCommandUseCaseImpl,
    DailyReportCommandUseCaseUnitOfWork,
)
from usecase.daily_report.daily_report_query_model import DailyReportReadModel

config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

app = FastAPI()

create_tables()


# CORSを回避するために追加（今回の肝）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)

def get_session() -> Iterator[Session]:
    """get a session from the database."""
    session: Session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def daily_report_query_usecase(
    session: Session = Depends(get_session),
) -> DailyReportQueryUseCase:
    daily_report_query_service: DailyReportQueryService = DailyReportQueryServiceImpl(
        session
    )
    return DailyReportQueryUseCaseImpl(daily_report_query_service)


def daily_report_command_usecase(
    session: Session = Depends(get_session),
) -> DailyReportCommandUseCase:
    daily_report_repository: DailyReportRepository = DailyReportRepositoryImpl(session)
    uow: DailyReportCommandUseCaseUnitOfWork = DailyReportCommandUseCaseUnitOfWorkImpl(
        session, daily_report_repository=daily_report_repository
    )
    return DailyReportCommandUseCaseImpl(uow)


@app.get(
    "/daily-reports",
    response_model=List[DailyReportReadModel],
    status_code=status.HTTP_200_OK,
)
async def get_daily_reports(
    daily_report_query_usecase: DailyReportQueryUseCase = Depends(
        daily_report_query_usecase
    ),
):
    try:
        daily_reports = daily_report_query_usecase.fetch_daily_reports()
    except Exception as err:
        print("エラー発生")
        logger.error(err)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    print(daily_reports)
    print(type(daily_reports))
    return daily_reports


@app.get(
    "/daily-reports/{daily_report_id}",
    response_model=DailyReportReadModel,
    status_code=status.HTTP_200_OK,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "model": ErrorMessageDailyReportNotFound,
        }
    },
)
async def get_daily_report(
    daily_report_id: str,
    daily_report_query_usecase: DailyReportQueryUseCase = Depends(
        daily_report_query_usecase
    ),
):
    try:
        dailyReport = daily_report_query_usecase.fetch_daily_report_by_id(
            daily_report_id
        )
    except BookNotFoundError as err:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=err.message,
        )
    except Exception as err:
        logger.error(err)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return dailyReport


@app.post(
    "/daily-reports",
    response_model=DailyReportReadModel,
    status_code=status.HTTP_201_CREATED,
)
async def create_daily_reports(
    data: DailyReportCreateModel,
    daily_report_command_usecase: DailyReportCommandUseCase = Depends(
        daily_report_command_usecase
    ),
):
    try:
        daily_report = daily_report_command_usecase.create_daily_report(data)

    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    except e:
        logger.error(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return daily_report
