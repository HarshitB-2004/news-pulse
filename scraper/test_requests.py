import requests

url="http://example.com"

response=requests.get(url)
print(response.text)