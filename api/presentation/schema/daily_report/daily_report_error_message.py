from pydantic import BaseModel, Field

from domain.daily_report_exception import BookNotFoundError


class ErrorMessageDailyReportNotFound(BaseModel):
    detail: str = Field(example=BookNotFoundError.message)
