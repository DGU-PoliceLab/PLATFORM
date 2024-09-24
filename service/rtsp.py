import cv2
import time

def getRtspStream(url):
    while True:
        # RTSP 스트림 시도
        cap = cv2.VideoCapture(url)

        # 스트림 연결 실패시 예외 처리
        if not cap.isOpened():
            print("Could not start video capture. Retrying in 10 seconds...")
            time.sleep(10)
            continue  # 10초 후 재시도

        print("RTSP stream connected.")

        while True:
            flag, frame = cap.read()
            if not flag:
                print("Failed to read frame. Retrying RTSP connection...")
                cap.release()  # 연결 해제
                break  # 다시 RTSP 스트림 연결 시도

            # 프레임이 있으면 버퍼로 인코딩
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--PNPframe\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
