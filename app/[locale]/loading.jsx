export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-xl w-2/3 mb-6" />
      <div className="h-6 bg-gray-200 rounded-xl w-full mb-3" />
      <div className="h-6 bg-gray-200 rounded-xl w-5/6 mb-3" />
      <div className="h-6 bg-gray-200 rounded-xl w-4/6 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded-lg w-1/3" />
              <div className="h-5 bg-gray-200 rounded-lg w-full" />
              <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
              <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
