import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import Navbar from '../components/Navbar'
import { getArticleById, getArticles, getClusters } from '../services/api'
import { formatDate } from '../utils/date'

const ArticlePage = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [articles, setArticles] = useState([])
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const [articleData, articleList, clusterData] = await Promise.all([
          getArticleById(id),
          getArticles(),
          getClusters(),
        ])
        setArticle(articleData)
        setArticles(articleList || [])
        setClusters(clusterData || [])
      } catch {
        setError('This article could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [id])

  const relatedCluster = useMemo(() => {
    if (!article?.clusterId) return null
    return clusters.find((cluster) => cluster._id === article.clusterId)
  }, [article, clusters])

  const relatedArticles = useMemo(() => {
    if (relatedCluster?.articles?.length) {
      return relatedCluster.articles.filter((item) => (item._id || item.id) !== id).slice(0, 4)
    }
    return articles.filter((item) => item.source === article?.source && (item._id || item.id) !== id).slice(0, 4)
  }, [article, articles, id, relatedCluster])

  const paragraphs = (article?.content || article?.summary || '')
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {loading ? <p className="py-10 text-sm text-neutral-600">Loading article...</p> : null}
        {error ? <p className="border border-neutral-300 px-4 py-3 text-sm text-neutral-700">{error}</p> : null}

        {article ? (
          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,680px)_260px]">
            <article className="min-w-0">
              <Link to="/" className="text-xs font-bold uppercase tracking-wide text-red-700 hover:underline">
                News Pulse
              </Link>
              <h1 className="mt-4 overflow-wrap-anywhere font-serif text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 break-words text-sm font-semibold uppercase tracking-wide text-neutral-500">
                {article.source} · {formatDate(article.publishedAt)}
              </p>
              {article.summary ? (
                <p className="mt-6 border-b border-neutral-300 pb-6 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                  {article.summary}
                </p>
              ) : null}
              <div className="mt-7 space-y-6 overflow-wrap-anywhere font-serif text-base leading-8 text-neutral-900 sm:text-lg">
                {paragraphs.length ? (
                  paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                ) : (
                  <p>Full article text is not available from this source.</p>
                )}
              </div>
              {article.url ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block border border-neutral-950 px-3 py-2 text-xs font-bold uppercase tracking-wide text-neutral-950 hover:bg-neutral-950 hover:text-white"
                >
                  Read original report
                </a>
              ) : null}
            </article>

            <aside className="min-w-0 space-y-8 border-t border-neutral-300 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {relatedCluster ? (
                <section>
                  <h2 className="border-t-4 border-red-700 pt-3 text-sm font-bold uppercase tracking-wide">
                    How different sources covered this
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    This story appears in {relatedCluster.articles.length} related reports.
                  </p>
                </section>
              ) : null}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide">Related articles</h2>
                <div className="mt-4 space-y-5">
                  {relatedArticles.map((item, index) => (
                    <ArticleCard key={item._id || item.id} article={item} compact numbered={index + 1} />
                  ))}
                </div>
              </section>
            </aside>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default ArticlePage
