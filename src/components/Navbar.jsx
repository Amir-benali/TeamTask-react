import { Bell, Search, User, LogOut, Settings, LoaderIcon } from "lucide-react"
import { use, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUser, logoutUser } from "../features/auth/authSlice"
import { useNavigate } from "react-router"

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const {user, isSuccess, isLoading} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((userData) => {
      // Success case handling
      })
      .catch((error) => {
      navigate('/login')
      })
    

  }, [])
  
  const handleLogout = (e) => {
    e.preventDefault()
    try {
      dispatch(logoutUser())
      .unwrap()
      .then(() => {
        window.location.reload()
      }
      )
      .catch((error) => {
        console.error("Logout failed:", error)
      })
    }
    catch (error) {
      console.error("Logout failed:", error)
    }
  }
  
  // Display values based on loading state
  const displayUsername = isLoading ? <LoaderIcon/>: user?.username || ""
  const displayRole = isLoading ? "" : user?.role || ""
  
  return (
    <nav className="h-16 bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50 flex items-center justify-between px-6">
      {/* Search Section */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">{displayUsername}</p>
              <p className="text-xs text-gray-400">{displayRole}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-lg shadow-2xl py-2 z-50">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button 
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
