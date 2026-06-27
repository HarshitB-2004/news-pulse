# from rss_reader import fetch_article
# from article_parser import extract_article
# from database import save_article
from database import collection
from clustering import create_clusters

# articles=fetch_article()

# all_articles=[]
# for article in articles:
#     data=extract_article(article.link)

#     if data:
#         data["url"]=article.link
#         data["published"]=article.published
#         data["summary"]=article.summary

#         save_article(data)

#         all_articles.append(data)

#         print(f"Fetched: {data['title']}")



articles=list(collection.find())


clusters=create_clusters(articles)


for idx,cluster in enumerate(clusters):
    cluster_id=f"cluster_{idx}"
    
    for article in cluster:
        collection.update_one(
            {"url": article["url"]},
            {
                "$set":{
                    "clusterId":cluster_id
                }
            }
        )
print(f"Total Cluster:{len(clusters)}")