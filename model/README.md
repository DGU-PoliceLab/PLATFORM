# Model

## 개요

-   cctv.py : CCTV 데이터 입/출력을 위한 데이터형을 정의합니다.
-   event.py : 이벤트 데이터 입/출력을 위한 데이터형을 정의합니다.
-   location.py : 유치실 데이터 입/출력을 위한 데이터형을 정의합니다.
-   log.py : 로그 데이터 입/출력을 위한 데이터형을 정의합니다.
-   message.py : 메세지 데이터 입/출력을 위한 데이터형을 정의합니다.
-   rtsp.py : RTSP 데이터 입/출력을 위한 데이터형을 정의합니다.
-   snap.py : 스냅샷 데이터 입/출력을 위한 데이터형을 정의합니다.

## CCTV Model

### CctvCreateModel

CCTV 등록 요청 데이터형입니다.

-   name : string, CCTV 이름
-   url : string, rtsp 주소

```json
{
    "name": "테스트",
    "url": "rtsp://"
}
```

### CctvCheckModel

CCTV 조회 요청 데이터형입니다.

-   name : string, CCTV 이름

```json
{
    "name": "테스트"
}
```

### CctvUpdateModel

CCTV 수정 요청 데이터형입니다.

-   target : integer, CCTV ID
-   name : string, CCTV 이름
-   url : string, rtsp 주소

```json
{
    "target": 1,
    "name": "테스트",
    "url": "rtsp://"
}
```

### CctvDeleteModel

CCTV 삭제 요청 데이터형입니다.

-   target : integer, CCTV ID

```json
{
    "target": 1
}
```

## Event Model

### EventCreateModel

이벤트 등록 요청 데이터형입니다.

-   e_type : string, 이벤트 유형 ID
-   name : string, 이벤트 유형 이름

```json
{
    "e_type": "event type id",
    "name": "이벤트 유형 이름"
}
```

### EventReadModel

이벤트 조회 요청 데이터형입니다.

-   target : string, optional, 이벤트 유형 ID

```json
{
    "target": None
}
```

### EventUpdateModel

이벤트 수정 요청 데이터형입니다.

-   target : string, 이벤트 유형 ID
-   e_type : string, 수정할 이벤트 유형 ID
-   name : string, 수정할 이벤트 유형 이름

```json
{
    "e_type": "event type id",
    "name": "이벤트 유형 이름"
}
```

### EventDeleteModel

이벤트 삭제 요청 데이터형입니다.

-   target: 이벤트 유형 ID

```json
{
    "target": "1"
}
```

## Location Model

### LocationCreateModel

유치실 등록 요청 데이터형입니다.

-   name : string, 유치실명
-   cctv : integer, 유치실 설치 CCTV ID

```json
{
    "e_type": "event type id",
    "name": "이벤트 유형 이름"
}
```

### LocationCheckModel

유치실 조회 요청 데이터형입니다.

-   name : string, 유치실명

```json
{
    "name": "유치실 1"
}
```

### LocationUpdateModel

유치실 수정 요청 데이터형입니다.

-   target : integer, 유치실 ID
-   name : string, 수정할 유치실명
-   cctv : integer, 수정할 유치실 설치 CCTV ID

```json
{
    "target": 1,
    "name": "유치실 1",
    "cctv": "1"
}
```

### LocationDeleteModel

유치실 등록 요청 데이터형입니다.

-   target : integer, 유치실 ID

```json
{
    "target": 1
}
```
