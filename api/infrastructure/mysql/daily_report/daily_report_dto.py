from datetime import datetime
from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from usecase.daily_report.daily_report_query_model import DailyReportReadModel
from domain.daily_report import DailyReport

from infrastructure.mysql.database import Base


def unixtimestamp() -> int:
    return int(datetime.now().timestamp() * 1000)


class DailyReportDTO(Base):
    __tablename__ = "daily_report"
    id: Mapped[str] = mapped_column(String(255), primary_key=True, autoincrement=False)
    memo: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    def to_entity(self) -> DailyReportReadModel:
        return DailyReportReadModel(
            id=self.id,
            memo=self.memo,
        )

    def to_read_model(self) -> DailyReportReadModel:
        return DailyReportReadModel(
            id=self.id,
            memo=self.memo,
        )

    @staticmethod
    def from_entity(daily_report: DailyReport) -> "DailyReportDTO":
        return DailyReportDTO(
            id=daily_report.daily_report_id,
            memo=daily_report.memo,
        )
