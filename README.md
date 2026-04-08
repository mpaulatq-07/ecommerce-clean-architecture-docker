# Ecommerce API - Clean Architecture & Docker

Este es el Backend de una plataforma de E-commerce desarrollado bajo los principios de **Arquitectura Limpia** (Clean Architecture). El proyecto está diseñado para ser altamente escalable, desacoplado y fácil de desplegar mediante contenedores.

## Tecnologías y Herramientas

<p align="left">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/mongodb-%234EA94B.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/mysql-%23005C84.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

* **Runtime:** Node.js 
* **Lenguaje:** TypeScript 
* **Framework:** Express.js 
* **ORM/ODM:** Sequelize (MySQL) y Mongoose (MongoDB)
* **Infraestructura:** Docker & Docker Compose 
* **Arquitectura:** Clean Architecture

---

## Configuración de Infraestructura con Docker

El proyecto utiliza **Docker Compose** para orquestar los servicios necesarios (MySQL y MongoDB). Esto asegura que el entorno de desarrollo sea idéntico para todos.

Para levantar los contenedores de las bases de datos, ejecuta:
```bash
docker compose up -d
```

Para verificar que los contenedores están corriendo:
```bash
docker ps
```

---

## Cómo activar y alternar entre MySQL y MongoDB

El sistema permite cambiar de base de datos dinámicamente mediante variables de entorno.

### Configuración en .env
```bash
DB_TYPE=mysql
```
o 
```bash
DB_TYPE=mongo
```

---

## 1. Usar MySQL
Asegúrate de que el contenedor mysql_db esté corriendo.
Configura en .env:
```bash
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=12345
DB_NAME=ecommerce_db
```
Configura en /presentation/purchases/purchases.routes.ts (descomentarear Mysql y comentarear Mongo)
```bash
const productDatasource = new MysqlProductDatasourceImpl();
```
✅ El sistema utilizará automáticamente Sequelize.

---

## 2. Usar MongoDB
Asegúrate de que el contenedor mongo_db esté corriendo.
Configura en .env:
```bash
DB_TYPE=mongo
MONGO_URI=mongodb://localhost:27017/ecommerce_db
```
Configura en /presentation/purchases/purchases.routes.ts (descomentarear Mongo y comentarear Mysql)
```bash
const productDatasource = new MongoProductDatasourceImpl();
```
✅ El sistema utilizará automáticamente Mongoose.

---

### ⚠️ Nota importante

El sistema selecciona dinámicamente la base de datos según DB_TYPE, evitando ejecutar ambas conexiones al mismo tiempo.

---

## Estructura de la Arquitectura

El proyecto sigue los principios de Clean Architecture, organizando el código en capas:

### 🧠 Domain (Capa Central)
Entidades de negocio (Product, Purchase, etc.)
Interfaces de repositorios
Sin dependencias externas

---

## Application (Casos de Uso)
Lógica de negocio
Casos de uso (create, update, delete, etc.)

---

## 🌐 Presentation
Controladores
Definición de rutas
Manejo de requests/responses

---

## Endpoints principales
### 🛍️ Productos
```bash
GET    /products
POST   /products
PUT    /products/:id
DELETE /products/:id
```
### 🧾 Compras
```bash
POST /purchases
GET  /purchases/history
```

---

## ⚙️ Pruebas 
Utilizar Thunder client (Visual studio) o postman.
### Ejemplo:
```bash
POST http://localhost:3000/products
```
```bash
Seecion Body 
{
  "name": "producto prueba",
  "price": 1000,
  "stock": 5
}
```
## Notas de Persistencia y Seguridad
### Persistencia local
Estas carpetas son generadas automáticamente por Docker y están excluidas del repositorio (.gitignore).
```bash
MySQL → mysql_data/
MongoDB → mongo_data/
```
### Configuración segura:

Utiliza el archivo .env.template como base para crear tu .env:
```bash
cp .env.template .env
```
Para correrlo, utilizar el comando:
```bash
docker compose up --build
```
