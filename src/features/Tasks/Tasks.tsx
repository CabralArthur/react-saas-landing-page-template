export const Tasks = ({
    onLogoutClick
}: {
    onLogoutClick: () => void
}) => {

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900">Tasks</h1>
        <button
          onClick={onLogoutClick}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border border-purple-100">
        <h2 className="text-xl font-semibold mb-4 text-purple-800">Your Tasks</h2>
        <p className="text-purple-600">
          This is where your tasks will be displayed. Coming soon!
        </p>
      </div>
    </div>
  )
} 