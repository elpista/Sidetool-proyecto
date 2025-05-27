import React, {useState, useEffect} from 'react'
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const endpoint = '/api/tasks'

const CreateTask = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const store = async (e) => {
        e.preventDefault()
        if(title === '' || !isNaN(title)){
            Swal.fire({
            icon: 'error',
            title: '¡Hay un problema!',
            text: '¡El título no puede estar vacío ni ser un número!',
            })
        } else{
            try{
            Swal.fire({
                title: 'Cargando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                }
            })
            await axiosInstance.post(endpoint, {
                title: title,
                description: description,
                completed: false,
                deleted: false
            });
            Swal.close()
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Task creada correctamente, volviendo a Home...',
            })
            navigate('/')
            } catch (error){
                console.error(error)
            }
        }
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-dark">Crear una Task</h1>
            <button
              className="button-danger"
              onClick={() => navigate('/')}
            >
              Atrás
            </button>
          </div>
        
          <form onSubmit={store} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                required
                minLength={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field h-24"
              />
            </div>

            <button
              type="submit"
              className="button-primary w-full"
              disabled={title === ''}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
}


export default CreateTask