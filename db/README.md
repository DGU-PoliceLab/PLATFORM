# DB

## 개요

-   config.py : .env로부터 데이터베이스 설정을 불러옵니다.
-   controller.py : 데이터베이스 클래스를 정의합니다.
    -   MysqlDB : 기반/영구데이터 저장을 위한 데이터베이스를 정의 및 제어합니다.
    -   RedisDB : 임시데이터 저장을 위한 데이터베이스를 정의 및 제어합니다.
    -   RedisMQ : 실시간데이터 전달을 위한 데이터베이스를 정의 및 제어합니다.
    -   SocketManager : 소켓 통신을 위해 사용합니다. (기본값 : 사용하지 않음)

## 데이터베이스 설정 변경

루트 디렉토리에 있는 `.env`를 수정합니다.

만약, 루트 디렉토리에 `.env`파일이 없다면 아래 내용으로 `.env`파일을 구성합니다.

```plain
# redis
REDIS_HOST='localhost'
REDIS_PORT=16379
REDIS_DATABASE=0

# mysql
MYSQL_HOST='localhost'
MYSQL_PORT=13306
MYSQL_USER='root'
MYSQL_PASSWORD='1q2w3e4r!'
MYSQL_DATABASE="pls"
MYSQL_CHARSET="utf8"
```
