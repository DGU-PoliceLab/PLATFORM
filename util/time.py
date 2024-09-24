import time
import datetime

# 현재 시간을 반환하는 함수
def now():
    now = datetime.datetime.now()
    return now

# 타임스탬프를 반환하는 함수
def timestamp(datetime = datetime.datetime.now):
    timestamp = time.mktime(datetime.timetuple())
    return timestamp
