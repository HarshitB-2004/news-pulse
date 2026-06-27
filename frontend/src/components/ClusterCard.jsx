import { Link } from 'react-router-dom'
import { formatDate } from '../utils/date'

const clusterTitle = (cluster) => {
  const firstArticle = cluster?.articles?.[0]
  return firstArticle?.title || 'Developing story'
}

const ClusterCard = ({ cluster }) => {
  const articles = cluster?.articles || []
  const leadTitle = articles[0]?.title?.trim().toLowerCase()
  const relatedArticles = articles
    .slice(1)
    .filter((article) => article.title?.trim().toLowerCase() !== leadTitle)
  const sources = [...new Set(articles.map((article) => article.source).filter(Boolean))]

  if (articles.length < 2 || relatedArticles.length < 1) return null

  return (
    <article className="min-w-0 border-b border-neutral-300 py-6">
      <div className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-red-700">Multiple perspectives</p>
          <h2 className="mt-2 overflow-wrap-anywhere font-serif text-xl font-bold leading-tight text-neutral-950 sm:text-2xl">
            {clusterTitle(cluster)}
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            {articles.length} reports from {sources.length || 'several'} sources
          </p>
        </div>
        <div className="min-w-0 space-y-4">
          {relatedArticles.slice(0, 4).map((article) => (
            <div key={article._id || article.id} className="min-w-0 border-l-2 border-neutral-200 pl-4">
              <Link
                to={`/article/${article._id || article.id}`}
                className="block overflow-wrap-anywhere font-serif text-base font-bold leading-snug text-neutral-950 hover:underline sm:text-lg"
              >
                {article.title}
              </Link>
              <p className="mt-2 break-words text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {article.source} · {formatDate(article.publishedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ClusterCard
