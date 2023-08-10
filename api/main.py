from typing import Iterator

from fastapi import Depends, FastAPI, status
from sqlalchemy.orm import Session
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

app = FastAPI()

create_tables()


def get_session() -> Iterator[Session]:
    """get a session from the database."""
    session: Session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def daily_report_command_usecase(
    session: Session = Depends(get_session),
) -> DailyReportCommandUseCase:
    daily_report_repository: DailyReportRepository = DailyReportRepositoryImpl(session)
    uow: DailyReportCommandUseCaseUnitOfWork = DailyReportCommandUseCaseUnitOfWorkImpl(
        session, daily_report_repository=daily_report_repository
    )
    return DailyReportCommandUseCaseImpl(uow)


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
    #  後でtry exceptを書く
    return daily_report_command_usecase.create_daily_report(data)
