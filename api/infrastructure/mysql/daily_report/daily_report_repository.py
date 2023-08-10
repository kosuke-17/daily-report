from sqlalchemy.orm.session import Session
from domain.daily_report import DailyReport, DailyReportRepository
from usecase.daily_report.daily_report_command_usecase import (
    DailyReportCommandUseCaseUnitOfWork,
)

from .daily_report_dto import DailyReportDTO


class DailyReportRepositoryImpl(DailyReportRepository):
    def __init__(self, session: Session):
        self.session: Session = session

    def create(self, daily_report: DailyReport):
        daily_report_dto = DailyReportDTO.from_entity(daily_report)
        try:
            self.session.add(daily_report_dto)
        except:
            raise


class DailyReportCommandUseCaseUnitOfWorkImpl(DailyReportCommandUseCaseUnitOfWork):
    def __init__(
        self,
        session: Session,
        daily_report_repository: DailyReportRepository,
    ):
        self.session: Session = session
        self.daily_report_repository: DailyReportRepository = daily_report_repository

    def begin(self):
        self.session.begin()

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()
