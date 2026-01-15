import requests
import json

# API基础URL
BASE_URL = "http://127.0.0.1:8000"

def test_api():
    print("开始测试API接口...")
    
    # 1. 获取所有用户
    print("\n1. 测试获取所有用户:")
    try:
        response = requests.get(f"{BASE_URL}/users/")
        print(f"状态码: {response.status_code}")
        print(f"响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
    except Exception as e:
        print(f"请求失败: {e}")
    
    # 2. 创建一个用户
    print("\n2. 测试创建用户:")
    try:
        user_data = {
            "name": "testuser",
            "fullname": "Test User"
        }
        response = requests.post(f"{BASE_URL}/users/", json=user_data)
        print(f"状态码: {response.status_code}")
        print(f"响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        
        # 尝试从响应中获取用户ID
        try:
            response_data = response.json()
            if 'data' in response_data and 'id' in response_data['data']:
                user_id = response_data['data']['id']
                print(f"创建的用户ID: {user_id}")
                
                # 3. 获取指定用户
                print(f"\n3. 测试获取用户 {user_id}:")
                response = requests.get(f"{BASE_URL}/users/{user_id}")
                print(f"状态码: {response.status_code}")
                print(f"响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
                
                # 4. 为用户创建地址
                print(f"\n4. 测试为用户 {user_id} 创建地址:")
                address_data = {
                    "email_address": "test@example.com"
                }
                response = requests.post(f"{BASE_URL}/addresses/users/{user_id}", json=address_data)
                print(f"状态码: {response.status_code}")
                print(f"响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
                
                # 5. 获取用户的所有地址
                print(f"\n5. 测试获取用户 {user_id} 的地址:")
                response = requests.get(f"{BASE_URL}/addresses/users/{user_id}")
                print(f"状态码: {response.status_code}")
                print(f"响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
                
        except Exception as e:
            print(f"解析响应失败: {e}")
            
    except Exception as e:
        print(f"请求失败: {e}")

if __name__ == "__main__":
    test_api()