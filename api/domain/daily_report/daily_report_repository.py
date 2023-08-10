from abc import ABC, abstractmethod
from typing import Optional

from domain.daily_report import DailyReport


class DailyReportRepository(ABC):
    @abstractmethod
    def create(self, dailyReport: DailyReport) -> Optional[DailyReport]:
        raise NotImplementedError
