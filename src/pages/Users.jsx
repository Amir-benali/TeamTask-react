import { useState, useEffect, use } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../features/auth/authSlice"
import { useNavigate } from "react-router"

export default function UsersPage() {
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = 'http://localhost:5000'; 
  const {token} = JSON.parse(localStorage.getItem('token')) || {};
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {

    dispatch(getUser())
    .unwrap()
    .then(() => {
      setMounted(true)
      if (user.role !== 'manager') {
        navigate('/403')
    }
    })
    .catch((error) => {
      console.error("Failed to fetch user:", error)
      setMounted(true)
      navigate('/login')
    })
  }, []
  )
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data
      setUsers(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setLoading(false)
    }
  }
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          setUsers(users.filter(user => user._id !== userId))
        }
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }
  useEffect(() => {
    setMounted(true)
    fetchUsers()
  }, [token])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 flex overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />
    
        {/* Content */}
 <div className="w-full p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Users</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-200 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=8b5cf6&color=fff&size=40`}
                            alt={`${user.username}'s avatar`}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{user.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'user' ? 'bg-yellow-100 text-green-800' : 
                        user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-300">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
      </div>
    </div>
  )
}
