from typing import Optional

from pydantic import BaseModel, Field, validator


class DailyReportCreateModel(BaseModel):
    memo: Optional[str] = Field(example="pthonを学習しました")

    @validator("memo")
    def _validate_memo(cls, v, values, **kwargs):
        if len(v) >= 140:
            raise ValueError("memoは140文字以上の入力できません")
        return v
