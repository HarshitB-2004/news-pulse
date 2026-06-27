import { useEffect, useMemo, useState } from 'react'
import ArticleCard from '../components/ArticleCard'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getArticles, getClusters, getStatus } from '../services/api'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [clusters, setClusters] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadNewsroom = async () => {
      try {
        const [articleData, clusterData, statusData] = await Promise.all([
          getArticles(),
          getClusters(),
          getStatus(),
        ])
        setArticles(articleData || [])
        setClusters(clusterData || [])
        setStatus(statusData || null)
      } catch {
        setError('News Pulse could not load the latest stories. Please make sure the API is running.')
      } finally {
        setLoading(false)
      }
    }

    loadNewsroom()
  }, [])

  const featured = articles[0]
  const topStories = articles.slice(1, 5)
  const latestStories = articles.slice(5, 15)
  const sourceGroups = useMemo(() => {
    return articles.reduce((groups, article) => {
      if (!article.source) return groups
      groups[article.source] = (groups[article.source] || 0) + 1
      return groups
    }, {})
  }, [articles])

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex min-w-0 flex-col gap-2 border-b border-neutral-300 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-red-700">Live newsroom</p>
            <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              Today in focus
            </h1>
          </div>
          <p className="text-sm text-neutral-600">
            Reporting gathered from {Object.keys(sourceGroups).length || 'trusted'} sources.
          </p>
        </div>

        {loading ? <p className="py-10 text-sm text-neutral-600">Loading the latest reports...</p> : null}
        {error ? <p className="border border-neutral-300 px-4 py-3 text-sm text-neutral-700">{error}</p> : null}

        {!loading && !error ? (
          <>
            <HeroSection article={featured} sideStories={topStories} />
            <div className="grid min-w-0 gap-10 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <section className="min-w-0">
                <div className="mb-5 flex flex-col gap-2 border-b border-neutral-300 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-950">Latest news</h2>
                  <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Updated by publication time
                  </span>
                </div>
                <div className="grid min-w-0 gap-6 md:grid-cols-2">
                  {latestStories.map((article) => (
                    <ArticleCard key={article._id || article.id} article={article} />
                  ))}
                </div>
              </section>
              <Sidebar articles={articles} clusters={clusters} status={status} />
            </div>
          </>
        ) : null}
      </main>
      <footer className="border-t border-neutral-300 py-6">
        <div className="mx-auto max-w-7xl px-4 text-xs text-neutral-500 sm:px-6 lg:px-8">
          News Pulse gathers coverage from established publishers for a clearer view of developing stories.
        </div>
      </footer>
    </div>
  )
}

export default Home
