from abc import ABC, abstractmethod
from typing import Optional, cast

import shortuuid
from domain.daily_report import DailyReport

from usecase.daily_report.daily_report_command_model import DailyReportCreateModel
from usecase.daily_report.daily_report_query_model import DailyReportReadModel
from domain.daily_report import DailyReportRepository


class DailyReportCommandUseCaseUnitOfWork(ABC):
    daily_report_repository: DailyReportRepository

    @abstractmethod
    def begin(self):
        raise NotImplementedError

    @abstractmethod
    def commit(self):
        raise NotImplementedError

    @abstractmethod
    def rollback(self):
        raise NotImplementedError


class DailyReportCommandUseCase(ABC):
    @abstractmethod
    def create_daily_report(
        self, data: DailyReportCreateModel
    ) -> Optional[DailyReportReadModel]:
        raise NotImplementedError


class DailyReportCommandUseCaseImpl(DailyReportCommandUseCase):
    def __init__(
        self,
        uow: DailyReportCommandUseCaseUnitOfWork,
    ):
        self.uow: DailyReportCommandUseCaseUnitOfWork = uow

    def create_daily_report(
        self, data: DailyReportCreateModel
    ) -> Optional[DailyReportReadModel]:
        try:
            uuid = shortuuid.uuid()
            daily_report = DailyReport(daily_report_id=uuid, memo=data.memo)

            created_daily_report = self.uow.daily_report_repository.create(daily_report)
            print(created_daily_report)
            print(type(created_daily_report))
            self.uow.commit()

            # created_daily_report = self.uow.daily_report_repository.find_by_id(uuid)
        except:
            self.uow.rollback()
            raise

        return DailyReportReadModel.from_entity(cast(DailyReport, created_daily_report))
