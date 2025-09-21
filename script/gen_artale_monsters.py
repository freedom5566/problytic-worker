import json
import uuid

# 讀取 JSON
with open("../src/lib/datas/drop_data.json", encoding="utf-8") as f:
    drop_data = json.load(f)

with open("../src/lib/datas/item.json", encoding="utf-8") as f:
    items_data = json.load(f)

# namespace UUID，可以自己選擇固定值
base_namespace = uuid.uuid4()
# # 將 "apple" 轉為 UUID
custom_namespace = uuid.uuid5(base_namespace, "artale")

result = {}

for monster_name, drop_list in drop_data.items():
    # 產生 UUID v5

    monster_uuid = str(uuid.uuid5(custom_namespace, monster_name))
    # 聚合 datas
    datas = {}
    for item_id, item_name in items_data.items():
        if item_name in drop_list:
            datas[item_id] = item_name

    result[monster_uuid] = {
        "name": monster_name,
        "datas": datas
    }

# 寫入 output.json
with open("problytic-artale-datas.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("聚合完成，已輸出 problytic-artale-datas.json")
