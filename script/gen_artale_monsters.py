import uuid
import json
# 用隨機 UUID 作為基礎命名空間
base_namespace = uuid.uuid4()
# 將 "apple" 轉為 UUID
custom_namespace = uuid.uuid5(base_namespace, "artale")




# 指定 JSON 檔案路徑
file_path = "/home/vagrant/artale-drop/drop_data.json"

# 開啟並讀取 JSON 檔案
try:
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)  # 將 JSON 轉為 Python 字典
        keys = list(data.keys())  # 取得最外層的鍵
        for key in keys:

            uuid_id = uuid.uuid5(custom_namespace, key)
            # print(f"Monster UUID: {uuid_id}, {key}")
            print(f"INSERT INTO artale_monsters (id,name) VALUES ('{uuid_id}','{key}') ;")
except FileNotFoundError:
    print("找不到檔案，請確認路徑是否正確")
except json.JSONDecodeError:
    print("JSON 格式錯誤，請檢查檔案內容")