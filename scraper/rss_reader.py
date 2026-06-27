import feedparser

RSS_FEEDS={"BBC":'http://feeds.bbci.co.uk/news/rss.xml',
           "NPR":"https://feeds.npr.org/1001/rss.xml",
           "Guardian":"https://www.theguardian.com/world/rss"
           }

def fetch_article():
    all_articles=[]

    for source,url in RSS_FEEDS.items():
        feed=feedparser.parse(url)

        for article in feed.entries:
            article.source=source
            all_articles.append(article)
    return all_articles