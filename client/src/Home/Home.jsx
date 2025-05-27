import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../TaskCard/TaskCard';

const endpoint = '/api/tasks'

const Home = () => {

  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [filteredTasks, setFilteredTasks] = useState([]);

  const getAllTasks = async () => {
    Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      })
    try{
      const response = await axiosInstance.get(endpoint);
      setTasks(response.data)
      Swal.close()
    } catch (error){
      Swal.fire('Error', 'No se pudieron cargar las tareas', 'error');
    }
  }

  useEffect(() => {
    getAllTasks()
  }, [])

  useEffect(() => {
      // Aplicar filtro cuando cambien las tasks o el filtro seleccionado
      let result = tasks.filter(task => task.deleted === false);
      if (filter === 'completed') {
          result = result.filter(task => task.completed);
      } else if (filter === 'pending') {
          result = result.filter(task => !task.completed);
      }
      setFilteredTasks(result);
  }, [tasks, filter]);

  return(
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-dark">Task Manager</h1>
      </header>
  
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field w-48"
          >
            <option value="all">Todas las tareas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>
        
        <button
          className="button-primary"
          onClick={() => navigate('/create-task')}
        >
          Crear task
        </button>
      </div>
  
      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            !task.deleted && (
              <TaskCard
                key={task.id}
                task={task}
                getAllTasks={getAllTasks}
              />
            )
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg text-gray-500">
              No se encontraron tareas {filter === 'completed' ? 'completadas' : filter === 'pending' ? 'pendientes' : ''}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home