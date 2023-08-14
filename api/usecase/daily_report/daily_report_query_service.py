from abc import ABC, abstractmethod
from typing import List, Optional

from usecase.daily_report.daily_report_query_model import DailyReportReadModel


class DailyReportQueryService(ABC):
    @abstractmethod
    def find_by_id(self, id: str) -> Optional[DailyReportReadModel]:
        raise NotImplementedError

    @abstractmethod
    def find_all(self) -> List[DailyReportReadModel]:
        raise NotImplementedError
