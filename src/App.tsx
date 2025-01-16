import { Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <div className="min-h-screen bg-purple-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}
