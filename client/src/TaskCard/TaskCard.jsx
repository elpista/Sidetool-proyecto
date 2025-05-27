import axiosInstance from '../axiosConfig';
import Swal from 'sweetalert2';

const endpoint = '/api/tasks'

const TaskCard = ({task, getAllTasks}) => {

    const editTask = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Editar Tarea',
    html:
      `<input id="swal-title" class="swal2-input" placeholder="Título" value="${task.title}">` +
      `<textarea id="swal-description" class="swal2-textarea" placeholder="Descripción">${task.description}</textarea>` +
      `<div class="swal2-checkbox" style="text-align: left; margin: 1em 0;">
        <input type="checkbox" id="swal-completed" ${task.completed ? 'checked' : ''}>
        <label for="swal-completed">Completada</label>
      </div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    customClass: {
      actions: 'swal2-visible-buttons',
      confirmButton: 'swal2-confirm-visible',
      cancelButton: 'swal2-cancel-visible'
    },
    preConfirm: () => {
      return {
        title: document.getElementById('swal-title').value,
        description: document.getElementById('swal-description').value,
        completed: document.getElementById('swal-completed').checked
      }
    }
  });
      if (formValues) {
        try {
          Swal.fire({
            title: 'Guardando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
          });
        
          await axiosInstance.put(`${endpoint}/${task.id}`, {
            title: formValues.title,
            description: formValues.description,
            completed: formValues.completed,
            deleted: task.deleted
          });
        
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Tarea actualizada correctamente',
          });

          getAllTasks();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la tarea',
          });
          console.error(error);
        }
      }
    };

    const completeTask = async () => {
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      })
      try{
        await axiosInstance.put(`${endpoint}/${task.id}`,{
          title: task.title,
          description: task.description,
          completed: true,
          deleted: task.deleted
        });
        getAllTasks()
      } catch(error){
        console.error(error)
      }
    }

    const deleteTask = async () => {
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      })
      try{
        await axiosInstance.delete(`${endpoint}/${task.id}`,);
        getAllTasks()
      } catch(error){
        console.error(error)
      }
    }

    return(
      <div className="task-card">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-semibold text-dark mb-2">{task.title}</h4>
            {task.description && (
              <p className="text-gray-600 mb-4">{task.description}</p>
            )}
          </div>
          
          {task.completed ? (
            <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
              Completado
            </span>
          ) : null}
        </div>
        
        <div className="flex space-x-2 mt-4">
          {!task.completed && (
            <button
              onClick={completeTask}
              className="button-secondary text-sm"
            >
              Completar
            </button>
          )}
          
          <button
            onClick={editTask}
            className="button-primary text-sm"
          >
            Editar
          </button>
          
          <button
            onClick={deleteTask}
            className="button-danger text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    );
}

export default TaskCard