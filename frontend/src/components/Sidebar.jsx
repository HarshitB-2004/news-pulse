import { Link } from 'react-router-dom'

const Sidebar = ({ articles = [], clusters = [], status }) => {
  const sources = [...new Set(articles.map((article) => article.source).filter(Boolean))].slice(0, 6)
  const clusterList = clusters
    .filter((cluster) => {
      const clusterArticles = cluster.articles || []
      const leadTitle = clusterArticles[0]?.title?.trim().toLowerCase()

      return (
        clusterArticles.length > 1 &&
        clusterArticles.slice(1).some((article) => article.title?.trim().toLowerCase() !== leadTitle)
      )
    })
    .slice(0, 4)

  return (
    <aside className="min-w-0 space-y-8">
      <section className="border-b border-neutral-300 pb-6">
        <h2 className="border-t-4 border-red-700 pt-3 text-sm font-bold uppercase tracking-wide text-neutral-950">
          Newsroom
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-2xl font-bold text-neutral-950">{status?.totalArticles ?? articles.length}</p>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Articles</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-950">{status?.totalSources ?? sources.length}</p>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Sources</p>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-300 pb-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-950">Sources</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {sources.map((source) => (
            <span key={source} className="border border-neutral-300 px-2 py-1 text-xs font-semibold text-neutral-700">
              {source}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-950">Related coverage</h2>
        <div className="mt-4 space-y-4">
          {clusterList.map((cluster) => (
            <Link
              key={cluster._id}
              to="/clusters"
              className="block overflow-wrap-anywhere border-b border-neutral-200 pb-3 font-serif text-base font-bold leading-snug text-neutral-950 hover:underline"
            >
              {cluster.articles?.[0]?.title || 'Developing story'}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  )
}

export default Sidebar
