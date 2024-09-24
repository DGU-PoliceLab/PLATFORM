from datetime import datetime
from db.controller import MysqlDB

# CCTV를 생성하는 함수
def create(name, url):
    try:
        db = MysqlDB()
        sql = "INSERT INTO cctv (name, url) VALUE (%s, %s)"
        db.cur.execute(sql, (name, url))
        db.conn.commit()
        return True
    except Exception as e:
        print("Error occured in services.cctv.create",e)
        return False

# CCTV를 조회하는 함수
def read():
    try:
        db = MysqlDB()
        sql = "SELECT * FROM cctv"
        db.cur.execute(sql)
        response = db.cur.fetchall()
        return response
    except Exception as e:
        print("Error occured in services.cctv.read",e)

# CCTV를 조회하는 함수
def check(name):
    try:
        db = MysqlDB()
        sql = "SELECT * FROM cctv WHERE name = %s"
        db.cur.execute(sql, (name))
        response = db.cur.fetchall()
        if len(response) == 0:
            return True
        else:
            return False
    except Exception as e:
        print("Error occured in services.cctv.check_duplicate",e)

# CCTV 정보를 업데이트하는 함수
def update(target, name, url):
    try:
        db = MysqlDB()
        now = datetime.now()
        sql = "UPDATE cctv SET name = %s, url = %s, created_at = %s WHERE id = %s"
        db.cur.execute(sql, (name, url, now, target))
        db.conn.commit()
        return True
    except Exception as e:
        print("Error occured in services.cctv.update",e)
        return False

# CCTV 정보를 삭제하는 함수
def delete(target):
    try:
        db = MysqlDB()
        sql = "DELETE FROM cctv WHERE id = %s"
        db.cur.execute(sql, (target))
        db.conn.commit()
        return True
    except Exception as e:
        print("Error occured in services.cctv.delete",e)
        return False