from typing import Optional


class DailyReport:
    def __init__(
        self,
        daily_report_id: str,
        memo: Optional[str] = None,
        # created_at: Optional[int] = None,
        # updated_at: Optional[int] = None,
    ):
        self.daily_report_id: str = daily_report_id
        self.memo: Optional[str] = memo
        # self.created_at: Optional[int] = created_at
        # self.updated_at: Optional[int] = updated_at
