
import { useState } from "react"
import { Home, BarChart3, Users, Settings, FileText, Bell, Zap, ChevronLeft, ChevronRight, List } from "lucide-react"
import { Link, useLocation } from "react-router";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation();
  const currentPath = location.pathname;
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard", active: currentPath === "/dashboard" },
    { icon: Users, label: "Users", path: "/users", active: currentPath === "/users"   },
    { icon: List, label: "Tasks", path: "/tasks", active: currentPath === "/tasks" },
  ];

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} h-screen bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 flex flex-col`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-white font-bold text-lg">Dashboard</h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 ">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link to={item.path} key={index}>
              <button
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  item.active
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
             
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
              {item.active && !isCollapsed && (
                <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              )}
            </button>
            </Link>
          )
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-700/50">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}
