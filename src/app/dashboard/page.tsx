export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
        <p className="text-gray-400">Your personal command center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-1 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Focus Time</h3>
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">2h 45m</p>
            <p className="text-xs text-gray-500">Today</p>
          </div>
        </div>

        <div className="bg-surface-1 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Tasks Done</h3>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">12</p>
            <p className="text-xs text-gray-500">Today</p>
          </div>
        </div>

        <div className="bg-surface-1 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-orange-500/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Current Streak</h3>
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">7 days</p>
            <p className="text-xs text-gray-500">Keep it up!</p>
          </div>
        </div>

        <div className="bg-surface-1 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all shadow-lg hover:shadow-violet-500/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400">Notes</h3>
            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">24</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-1 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/20">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Focus Session
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface-2 text-gray-300 rounded-lg font-medium hover:bg-surface-3 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-surface-2 text-gray-300 rounded-lg font-medium hover:bg-surface-3 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              New Note
            </button>
          </div>
        </div>

        <div className="bg-surface-1 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">Completed focus session</p>
                <p className="text-xs text-gray-500">25 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">Finished 3 tasks</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-violet-400 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">Created new note</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
