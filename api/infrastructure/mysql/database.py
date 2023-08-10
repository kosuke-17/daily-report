from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# TODO: 後でenvに移す
# データベース作成時に設定したやつ
DB_USER = "root"
DB_PASS = "pass"
DB_NAME = "daily_report"

# 接続するホストのIPアドレス
DB_HOST = "127.0.0.1"
# 接続するポート番号
DB_PORT = "3306"

SQLALCHEMY_DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:root@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8"
)

# データベースとの接続
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def create_tables():
    Base.metadata.create_all(bind=engine)
