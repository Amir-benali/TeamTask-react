import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useNavigate } from "react-router"

export default function TasksUpdateFormPage() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    status: "todo",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const {token} = JSON.parse(localStorage.getItem('token')) || {}
  const API_URL = 'http://localhost:5000';
  
  useEffect(() => {
    setMounted(true)
    fetchUsers()
    getTask()
  }, [])
    const id = window.location.pathname.split("/").pop()

  const getTask = async () => {
    if (!window.location.pathname.split("/").pop()) return
    try {
      const response = await axios.get(`${API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        const data = {
    status: response.data.status || "todo",
  }
        setFormData(data)
    }

  }
    catch (error) {
      console.log(error);
      // navigate("/tasks")
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")


    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (response.status === 200) {
        navigate("/tasks") 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task")
    } finally {
      setLoading(false)
    }
  }



  if (!mounted) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-900 overflow-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
              Update Task
            </h1>
            <p className="text-gray-400">Update your specific task </p>
          </div>

          {/* Form Card */}
          <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>

              
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
       
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/tasks")}
                  className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:opacity-90 transition-all duration-200 flex items-center"
                >
                  {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
