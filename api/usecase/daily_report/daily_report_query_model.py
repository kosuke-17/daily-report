from typing import Optional
from pydantic import BaseModel, Field

from domain.daily_report import DailyReport


class DailyReportReadModel(BaseModel):
    id: str = Field(example="vytxeTZskVKR7C7WgdSP2w")
    memo: Optional[str] = Field()

    class Config:
        # orm_mode = True
        from_attributes = True

    @staticmethod
    def from_entity(dailyReport: DailyReport) -> "DailyReportReadModel":
        return DailyReportReadModel(
            id=dailyReport.daily_report_id, memo=dailyReport.memo
        )
