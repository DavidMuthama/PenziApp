import requests

# your API secret from (Tools -> API Keys) page
apiSecret = "00d3be552b74159e9a913259fc02863cf436c2f1"

message = {
    "secret": apiSecret,
    "mode": "devices",
    "device": "00000000-0000-0000-c477-fa8c4fe7758a",
    "sim": 1,
    "priority": 1,
    "phone": "+254729741134",
    "message": "test if bugged"
}

r = requests.post(url = "https://www.cloud.smschef.com/api/send/sms", params = message)
  
# do something with response object
result = r.json()
print(result)