import { Link } from 'react-router-dom'
import { formatDate } from '../utils/date'

const HeroSection = ({ article, sideStories = [] }) => {
  if (!article) {
    return (
      <section className="border-b border-neutral-300 py-10">
        <p className="text-sm text-neutral-600">No articles are available yet.</p>
      </section>
    )
  }

  return (
    <section className="grid min-w-0 gap-8 border-b border-neutral-300 py-6 sm:py-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
      <article className="min-w-0">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-red-700">Featured story</p>
        <Link
          to={`/article/${article._id || article.id}`}
          className="block overflow-wrap-anywhere font-serif text-2xl font-bold leading-tight text-neutral-950 hover:underline sm:text-3xl lg:text-4xl"
        >
          {article.title}
        </Link>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
          {article.summary || article.content || 'Follow the latest reporting from trusted news sources.'}
        </p>
        <p className="mt-5 break-words text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {article.source} · {formatDate(article.publishedAt)}
        </p>
      </article>
      <div className="min-w-0 space-y-5 border-t border-neutral-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <p className="text-xs font-bold uppercase tracking-wide text-neutral-950">Top stories</p>
        {sideStories.map((story) => (
          <article key={story._id || story.id} className="min-w-0 border-b border-neutral-200 pb-4">
            <Link
              to={`/article/${story._id || story.id}`}
              className="block overflow-wrap-anywhere font-serif text-base font-bold leading-snug text-neutral-950 hover:underline sm:text-lg"
            >
              {story.title}
            </Link>
            <p className="mt-2 break-words text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {story.source} · {formatDate(story.publishedAt)}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HeroSection
