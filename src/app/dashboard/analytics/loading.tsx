export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-surface-1 rounded animate-pulse"></div>
        <div className="h-4 w-64 bg-surface-1 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface-1 border border-gray-800 rounded-2xl p-6">
            <div className="h-4 w-24 bg-surface-2 rounded animate-pulse mb-4"></div>
            <div className="h-10 w-32 bg-surface-2 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
