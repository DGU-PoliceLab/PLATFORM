from util.object import ObjectManager

objectManager = ObjectManager()

# 스냅샷을 생성
def read(target):
    response = objectManager.read(target)
    return response

# 스냅샷을 조회
def update(target, data):
    response = objectManager.update(target, data)
    return response