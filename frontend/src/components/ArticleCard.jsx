import { Link } from 'react-router-dom'
import { formatDate } from '../utils/date'

const getId = (article) => article?._id || article?.id

const ArticleCard = ({ article, compact = false, numbered }) => {
  if (!article) return null

  return (
    <article className="min-w-0 border-b border-neutral-200 pb-5">
      <div className="flex gap-3">
        {numbered ? (
          <span className="shrink-0 pt-1 text-sm font-bold text-red-700">{String(numbered).padStart(2, '0')}</span>
        ) : null}
        <div className="min-w-0">
          <Link
            to={`/article/${getId(article)}`}
            className={`block overflow-wrap-anywhere font-serif font-bold leading-snug text-neutral-950 hover:underline ${
              compact ? 'text-base' : 'text-lg sm:text-xl'
            }`}
          >
            {article.title}
          </Link>
          {!compact ? (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-700">
              {article.summary || article.content || 'Coverage and context from the latest reporting.'}
            </p>
          ) : null}
          <p className="mt-3 break-words text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {article.source} · {formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
