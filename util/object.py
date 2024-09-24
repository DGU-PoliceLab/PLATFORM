import os
import cv2
import pickle
from db.controller import RedisDB
from util.snapshot import snapshot

# 스냅샷을 관리하는 클래스
class ObjectManager():
    
    # 생성자
    def __init__(self):
        self.db = RedisDB()
        self.conn = self.db.conn
        self.conn.set("snap", self._to_byte({}))

    # 데이터를 바이트로 변환
    def _to_byte(self, data):
        byteData = pickle.dumps(data)
        return byteData
    
    # 바이트를 데이터로 변환
    def _to_data(self, byteData):
        data = pickle.loads(byteData)
        return data
    
    # 데이터를 조회
    def read(self, target = None):
        try:
            byteData = self.conn.get("snap")
            objectData = self._to_data(byteData)
            if target is not None:
                if target in objectData:
                    return objectData[target]
                else:
                    return []
            else:
                return objectData
        except Exception as e:
            print("Error occurred in utils.objectManage.ObjectManager.read:", e)
            return False
        
    # 데이터를 업데이트
    def update(self, target, data):
        try:
            objectData = self.read()
            objectData[target] = data
            byteData = self._to_byte(objectData)
            self.conn.set("snap", byteData)
            return True
        except Exception as e:
            print("Error occurred in utils.objectManage.ObjectManager.update:", e)
            return False
