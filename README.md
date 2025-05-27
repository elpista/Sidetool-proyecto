#### SIDETOOL-PROYECTO

Aplicación Task Master que permite crear, visualizar, editar, y eliminar tareas para gestionarlas a tu gusto. Utilizando React, Laravel, MySQL, Tailwind y sweetAlert

Códigos para correr la aplicación:

#### BACKEND:


cd api  

# Instalar dependencias  
composer install  

# Configurar entorno (edita .env con tus credenciales)  
cp .env.example .env  

# Generar clave de aplicación  
php artisan key:generate  

# Crear base de datos MySQL llamada 'task_manager'  

# Ejecutar migraciones  
php artisan migrate  

# Iniciar servidor  
php artisan serve --port=8000  


#### Frontend:

cd ../client  

# Instalar dependencias  
npm install  

# Iniciar aplicación  
npm start