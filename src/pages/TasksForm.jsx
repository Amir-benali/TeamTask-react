import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

export default function TasksFormPage() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState([])
  const {user} = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isValid, setIsValid] = useState(false)
  const {token} = JSON.parse(localStorage.getItem('token')) || {}
  const API_URL = 'http://localhost:5000';
  
  useEffect(() => {
    setMounted(true)
    fetchUsers()
  }, [])

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

    formvalidate()
    if (!isValid) {
      setLoading(false)
      return
    }
    console.log("Submitting form data:", formData)
    try {
      const response = await axios.post(`${API_URL}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (response.status === 201) {
        navigate("/tasks") 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  const formvalidate = () => {
    if (!formData.assignedTo && user.role === "user") {
            formData.assignedTo = user._id
    }
    if (!formData.assignedTo) {
      setError("Assigned user is required")
      setIsValid(false)
      return
    }
    if (!formData.title || !formData.description) {
      setError("Title and description are required")
      setIsValid(false)
      return
    }
    if(formData.title.length < 3) {
      setError("Title must be at least 3 characters long")
      setIsValid(false)
      return
    }
    if(formData.description.length < 10) {
      setError("Description must be at least 10 characters long")
      setIsValid(false)
      return
    }
    
    setIsValid(true)
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
              Create New Task
            </h1>
            <p className="text-gray-400">Create a new task for your team</p>
          </div>

          {/* Form Card */}
          <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="title">Task Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe the task"
                  required
                ></textarea>
              </div>
              
          
       {user && user.role !== "user" && <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="assignedTo">Assigned To</label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>}
              
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
