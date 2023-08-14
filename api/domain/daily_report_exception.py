class BookNotFoundError(Exception):
    message = "該当する日記が見つかりませんでした"

    def __init__(self):
        return BookNotFoundError.message
