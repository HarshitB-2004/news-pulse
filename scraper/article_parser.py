import requests
from bs4 import BeautifulSoup


def extract_article(url):
    response=requests.get(url)

    if response.status_code !=200:
        return None
    
    soup=BeautifulSoup(response.text,"html.parser")

    title=""

    if soup.find("h1"):
        title=soup.find("h1").text.strip()

    paragraphs=soup.find_all("p")
    content=""

    for p in paragraphs:
        content += p.text + "\n"

    return{
        "title":title,
        "content":content
    }