from datetime import datetime
from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from domain.daily_report import DailyReport

from infrastructure.mysql.database import Base


def unixtimestamp() -> int:
    return int(datetime.now().timestamp() * 1000)


class DailyReportDTO(Base):
    __tablename__ = "daily_report"
    id: Mapped[str] = mapped_column(String(255), primary_key=True, autoincrement=False)
    memo: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    # created_at: Mapped[int] = mapped_column(index=True, nullable=False)
    # updated_at: Mapped[int] = mapped_column(index=True, nullable=False)

    @staticmethod
    def from_entity(daily_report: DailyReport) -> "DailyReportDTO":
        now = unixtimestamp()
        return DailyReportDTO(
            id=daily_report.daily_report_id,
            memo=daily_report.memo,
            # created_at=now,
            # updated_at=now,
        )
