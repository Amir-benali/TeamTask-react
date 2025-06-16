import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import DashboardPage from './pages/Dashboard.jsx'
import TasksPage from './pages/Tasks.jsx'
import UsersPage from './pages/Users.jsx'
import TasksUpdateFormPage from './pages/TasksUpdateForm.jsx'
import TasksFormPage from './pages/TasksForm.jsx'
import RegisterPage from './pages/Register.jsx'
import Forbidden from './pages/Forbidden.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<App />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='tasks' element={<TasksPage />} />
          <Route path='users' element={
              <UsersPage />
          } />
          <Route path="403" element={<Forbidden />} />
          <Route path='tasks/create' element={
              <TasksFormPage />
          } />
          <Route path='tasks/update/:id' element={
              <TasksUpdateFormPage />
          } />

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)