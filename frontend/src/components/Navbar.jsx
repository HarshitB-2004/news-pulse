import { Link, NavLink } from 'react-router-dom'

const categories = ['World', 'Business', 'Politics', 'Science', 'Culture', 'Opinion']

const Navbar = () => {
  return (
    <header className="border-b border-neutral-300 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-neutral-200 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 bg-red-700 px-2 py-1 text-lg font-bold tracking-tight text-white sm:text-xl">
              News
            </span>
            <span className="truncate text-lg font-bold tracking-tight text-neutral-950 sm:text-xl">Pulse</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-neutral-800">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-700' : '')}>
              Home
            </NavLink>
            <NavLink to="/clusters" className={({ isActive }) => (isActive ? 'text-red-700' : '')}>
              Related Coverage
            </NavLink>
          </nav>
        </div>
        <div className="-mx-4 flex gap-5 overflow-x-auto px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-600 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <span key={category} className="shrink-0">
              {category}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
