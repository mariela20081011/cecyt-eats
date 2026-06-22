# CECyT-Eats 🍽️ 
  
Sistema de pedidos para la cafetería escolar. 
  
## Tecnologías - Frontend: React + Vite - Backend: Node.js + Express - Base de datos: MySQL 
  
## Instalación local 
  
### 1. Base de datos 
1. Inicia XAMPP y enciende Apache y MySQL 
2. Abre phpMyAdmin (http://localhost/phpmyadmin) 
3. Ejecuta el script: `servidor/database/cecyt_eats.sql` 
  
### 2. Backend 
```bash 
cd servidor 
npm install 
# Crea el archivo .env con tus credenciales (ver .env.example) 
node index.js 
``` 
  
### 3. Frontend 
```bash 
cd cecyt-eats 
npm install 
npm run dev 
``` 
  
## Variables de entorno 
Copia `.env.example` como `.env` y completa tus datos. 