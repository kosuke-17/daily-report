from abc import ABC, abstractmethod
from typing import List, Optional
from domain.daily_report_exception import BookNotFoundError

from usecase.daily_report.daily_report_query_model import DailyReportReadModel
from usecase.daily_report.daily_report_query_service import DailyReportQueryService

from .daily_report_query_model import DailyReportReadModel


class DailyReportQueryUseCase(ABC):
    @abstractmethod
    def fetch_daily_report_by_id() -> Optional[DailyReportReadModel]:
        raise NotImplementedError

    # @abstractmethod
    # def fetch_books(self) -> List[DailyReportReadModel]:
    #     raise NotImplementedError


class DailyReportQueryUseCaseImpl(DailyReportQueryUseCase):
    def __init__(self, daily_report_query_service: DailyReportQueryService):
        self.daily_report_query_service: DailyReportQueryService = (
            daily_report_query_service
        )

    def fetch_daily_report_by_id(
        self, daily_report_id: str
    ) -> Optional[DailyReportReadModel]:
        try:
            dailyReport = self.daily_report_query_service.find_by_id(id=daily_report_id)
            if dailyReport is None:
                raise BookNotFoundError
        except:
            raise

        return dailyReport

    def fetch_daily_report(self) -> List[DailyReportReadModel]:
        try:
            dailyReports = self.daily_report_query_service.find_all()
        except:
            raise

        return dailyReports
