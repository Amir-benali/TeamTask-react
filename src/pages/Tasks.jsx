import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"

export default function TasksPage() {
  const [mounted, setMounted] = useState(false)
  const [tasks, setTasks] = useState([])
  const [menuOpen, setMenuOpen] = useState(null) 
  const navigate = useNavigate()
  const {token} = JSON.parse(localStorage.getItem('token')) || {}
  const [filteredTasks, setFilteredTasks] = useState([])
  const { user} = useSelector((state) => state.auth)
  const API_URL = 'http://localhost:5000';
  useEffect(() => {
    setMounted(true)
    fetchTasks()
  }, [])

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.status === 200) {
          setTasks(tasks.filter(task => task._id !== taskId))
        }
      } catch (error) {
        console.error("Failed to delete task:", error)
      }
    }
  }
  const fetchTasks = async () => {

    const response = await axios.get(API_URL+'/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      setTasks(response.data)
    }
  }
  if (!mounted) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absoflute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
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
            Task Management
          </h1>
          <p className="text-gray-400">Manage your team's tasks and track progress.</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
             {user && user.role === "manager" && <button onClick={() => navigate("/tasks/create")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:opacity-90 transition-all duration-200">
              New Task
            </button>}
            <select 
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => {
                const status = e.target.value;
                if (status === "all") {
                  setFilteredTasks([]);
                } else {
                  const filtered = tasks.filter(task => 
                    task.status === status || 
                    (status === "high-priority" && task.status === "highpriority")
                  );
                  setFilteredTasks(filtered);
                }
              }}
            >
              <option value="all">All Tasks</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="todo">To Do</option>
            </select>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tasks.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400">No tasks found</p>
            </div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task._id} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/70 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full ${
                    task.status === "inprogress" || task.status === "in-progress" ? "bg-yellow-500/20 text-yellow-300" : 
                    task.status === "completed" ? "bg-green-500/20 text-green-300" : 
                    "bg-red-500/20 text-red-300"
                  }`}>
                    {task.status === "inprogress" || task.status === "in-progress" ? "In Progress" : 
                     task.status === "completed" ? "Completed" : 
                     task.status === "todo" ? "To Do" : "High Priority"}
                  </span>
                  <div className="relative">
                    <button 
                      className="p-1 hover:bg-gray-700 rounded-full"
                      onClick={() => setMenuOpen(menuOpen === task._id ? null : task._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {menuOpen === task._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-10">
                        <div className="py-1">
                          { user && user.role == "user" && <button onClick={() => navigate(`/tasks/update/${task._id}`)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Edit Task</button> }
                          <button onClick={() => handleDeleteTask(task._id)} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">Delete Task</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-white font-medium text-lg mb-2 line-clamp-2">{task.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>
                
                <div className="flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <span className="text-gray-400 text-xs">Assigned to: </span>
                    <span className="text-gray-300 text-xs ml-1">{task.assignedTo?.username || "Unassigned"}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-5 hover:bg-gray-800/70 transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full ${
                    task.status === "inprogress" || task.status === "in-progress" ? "bg-yellow-500/20 text-yellow-300" : 
                    task.status === "completed" ? "bg-green-500/20 text-green-300" : 
                    "bg-red-500/20 text-red-300"
                  }`}>
                    {task.status === "inprogress" || task.status === "in-progress" ? "In Progress" : 
                     task.status === "completed" ? "Completed" : 
                     task.status === "todo" ? "To Do" : "High Priority"}
                  </span>
                  <div className="relative">
                    <button 
                      className="p-1 hover:bg-gray-700 rounded-full"
                      onClick={() => setMenuOpen(menuOpen === task._id ? null : task._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {menuOpen === task._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-10">
                        <div className="py-1">
                          { user && user.role == "user" && <button onClick={() => navigate(`/tasks/update/${task._id}`)} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Edit Task</button> }
                          <button onClick={() => handleDeleteTask(task._id)} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">Delete Task</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-white font-medium text-lg mb-2 line-clamp-2">{task.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{task.description}</p>
                
                <div className="flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <span className="text-gray-400 text-xs">Assigned to: </span>
                    <span className="text-gray-300 text-xs ml-1">{task.assignedTo?.username || "Unassigned"}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>


      </div>

      </div>
    </div>
  )
}
