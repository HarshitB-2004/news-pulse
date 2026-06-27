from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client=MongoClient(
    MONGO_URI
)

db=client["news_pulse"]

collection=db["articles"]

def save_article(article):

    existing=collection.find_one({
        "url":article["url"]
    })

    if not existing:
        collection.insert_one(article)
        print("Saved:",article["title"])