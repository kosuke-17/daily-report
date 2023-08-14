from typing import List, Optional
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm.session import Session
from usecase.daily_report.daily_report_query_service import DailyReportQueryService
from infrastructure.mysql.daily_report.daily_report_dto import DailyReportDTO

from usecase.daily_report.daily_report_query_model import DailyReportReadModel


class DailyReportQueryServiceImpl(DailyReportQueryService):
    def __init__(self, session: Session):
        self.session: Session = session

    def find_by_id(self, id: str) -> Optional[DailyReportReadModel]:
        try:
            daily_report_dto = self.session.query(DailyReportDTO).filter_by(id=id).one()
        except NoResultFound:
            return None
        except:
            raise

        return daily_report_dto.to_read_model()

    def find_all(self) -> List[DailyReportReadModel]:
        MAX_NUMBER_FOR_GET_DAILY_REPORTS = 100
        try:
            daily_report_dtos = (
                self.session.query(DailyReportDTO)
                .order_by(DailyReportDTO.id)
                .limit(MAX_NUMBER_FOR_GET_DAILY_REPORTS)
                .all()
            )
        except:
            raise

        if len(daily_report_dtos) == 0:
            return []

        return list(
            map(
                lambda daily_report_dto: daily_report_dto.to_read_model(),
                daily_report_dtos,
            )
        )
