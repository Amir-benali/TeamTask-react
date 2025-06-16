import { TrendingUp, Users, DollarSign, Activity, ArrowUp, ArrowDown } from "lucide-react"

export default function Content() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.4%",
      trend: "down",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Server Uptime",
      value: "99.9%",
      change: "+0.1%",
      trend: "up",
      icon: Activity,
      color: "from-orange-500 to-red-500",
    },
  ]

  const recentActivity = [
    { user: "Alice Johnson", action: "Created new project", time: "2 minutes ago" },
    { user: "Bob Smith", action: "Updated user profile", time: "5 minutes ago" },
    { user: "Carol Davis", action: "Completed task #1234", time: "10 minutes ago" },
    { user: "David Wilson", action: "Uploaded new document", time: "15 minutes ago" },
  ]

  return (
    <div className="flex-1 p-6 bg-gray-900 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-400">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Revenue Overview</h2>
          <div className="h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 hover:bg-gray-700/30 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">{activity.user[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{activity.user}</p>
                  <p className="text-gray-400 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg text-white hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-200">
            <h3 className="font-medium mb-1">Create Project</h3>
            <p className="text-gray-400 text-sm">Start a new project</p>
          </button>
          <button className="p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg text-white hover:from-blue-600/30 hover:to-cyan-600/30 transition-all duration-200">
            <h3 className="font-medium mb-1">Add User</h3>
            <p className="text-gray-400 text-sm">Invite team member</p>
          </button>
          <button className="p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg text-white hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-200">
            <h3 className="font-medium mb-1">Generate Report</h3>
            <p className="text-gray-400 text-sm">Create analytics report</p>
          </button>
        </div>
      </div>
    </div>
  )
}
