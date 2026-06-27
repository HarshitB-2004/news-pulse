STOP_WORDS={
     "the", "a", "an", "is", "are", "was", "were",
    "to", "of", "for", "in", "on", "at", "and",
    "or", "after", "before", "with", "by", "how",
    "what", "who", "why", "will", "be", "as",
    "says", "say", "new", "reveals", "revealed",
    "news", "week", "day", "years", "year" }

def clean_words(title):
     words=title.lower().split()

     return{
          word.strip(".,!?'::()")
          for word in words
          if word not in STOP_WORDS and len(word) > 2
           }


def are_similar(article1, article2):

    words1 = clean_words(article1["title"])
    words2 = clean_words(article2["title"])

    common_words = words1.intersection(words2)

    return len(common_words) >= 2

def create_clusters(articles):

    clusters=[]

    for article in articles:
        added=False

        for cluster in clusters:

            if are_similar(article,cluster[0]):
                cluster.append(article)
                added=True
                break
        if not added:
                clusters.append([article])

    return clusters