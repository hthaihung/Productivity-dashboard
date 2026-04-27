export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-32 bg-surface-1 rounded animate-pulse"></div>
        <div className="h-4 w-48 bg-surface-1 rounded animate-pulse"></div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-1 border border-gray-800 rounded-2xl p-6 h-32">
            <div className="h-6 w-3/4 bg-surface-2 rounded animate-pulse mb-3"></div>
            <div className="h-4 w-full bg-surface-2 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
