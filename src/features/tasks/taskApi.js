import axios from 'axios';

const API_URL = 'http://localhost:5000/auth'; 

const token = JSON.parse(localStorage.getItem('token'));

const getTasks = async () => {
  const response = await axios.get(API_URL + '/tasks', {
    headers: {
      Authorization: `Bearer ${token?.token}`
    }
  });
  return response.data;
}

const createTask = async (task) => {
  const response = await axios.post(API_URL + '/tasks', task, {
    headers: {
      Authorization: `Bearer ${token?.token}`
    }
  });
  return response.data;
}

const updateTask = async (id, task) => {
  const response = await axios.put(API_URL + '/tasks/' + id, task, {
    headers: {
      Authorization: `Bearer ${token?.token}`
    }
  });
  return response.data;
}

const deleteTask = async (id) => {
  const response = await axios.delete(API_URL + '/tasks/' + id, {
    headers: {
      Authorization: `Bearer ${token?.token}`
    }
  });
  return response.data;
}

const taskApi = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};

export default taskApi;
