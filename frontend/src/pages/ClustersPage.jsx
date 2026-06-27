import { useEffect, useState } from 'react'
import ClusterCard from '../components/ClusterCard'
import Navbar from '../components/Navbar'
import { getClusters } from '../services/api'

const hasRelatedCoverage = (cluster) => {
  const articles = cluster.articles || []
  const leadTitle = articles[0]?.title?.trim().toLowerCase()

  return articles.length > 1 && articles.slice(1).some((article) => article.title?.trim().toLowerCase() !== leadTitle)
}

const ClustersPage = () => {
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const visibleClusters = clusters.filter(hasRelatedCoverage)

  useEffect(() => {
    const loadClusters = async () => {
      try {
        const data = await getClusters()
        setClusters(data || [])
      } catch {
        setError('Related coverage could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    loadClusters()
  }, [])

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="border-b border-neutral-300 pb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-red-700">Related coverage</p>
          <h1 className="mt-2 overflow-wrap-anywhere font-serif text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            How major stories are being reported
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
            News Pulse groups articles that appear to cover the same event, making it easier to compare headlines,
            sources, and emphasis across publishers.
          </p>
        </header>

        {loading ? <p className="py-10 text-sm text-neutral-600">Loading related coverage...</p> : null}
        {error ? <p className="mt-8 border border-neutral-300 px-4 py-3 text-sm text-neutral-700">{error}</p> : null}

        {!loading && !error ? (
          <section className="divide-y divide-neutral-300">
            {visibleClusters.length ? (
              visibleClusters.map((cluster) => <ClusterCard key={cluster._id} cluster={cluster} />)
            ) : (
              <p className="py-10 text-sm text-neutral-600">No related coverage groups are available yet.</p>
            )}
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default ClustersPage
