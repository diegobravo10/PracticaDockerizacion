
# Práctica: Arquitectura de Microservicios con Docker Compose

Esta práctica implementa una arquitectura basada en microservicios utilizando **Docker** y **Docker Compose**, donde dos servicios independientes (User Service y Product Service) se despliegan junto con sus propias bases de datos PostgreSQL. Cada microservicio corre en un contenedor separado, garantizando independencia, modularidad y facilidad de escalado.

---

## Arquitectura del Proyecto

```
Microservicios/
├── user-service/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── product-service/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

* **User Service (Python + Flask)**
  Gestiona usuarios y se conecta a su propia base PostgreSQL.

* **Product Service (Node.js + Express)**
  Gestiona productos, también con una base PostgreSQL independiente.

* **Bases de datos aisladas**
  Cada microservicio administra su propia DB sin compartir tablas.

---

## Tecnologías Utilizadas

* Docker & Docker Compose
* Python 3 / Flask
* Node.js / Express
* PostgreSQL


---

##  ¿Cómo levantar los microservicios?

### Clonar el repositorio

```bash
git clone https://github.com/tu-repo/microservicios.git
cd microservicios
```

### Construir e iniciar los contenedores

```bash
docker-compose up --build
```

### Ver los contenedores activos

```bash
docker ps
```

### Detener los servicios

```bash
docker-compose down
```

---

### ¿Cómo usar luego de haber ejecutado?

###  **User Service (puerto 5000)**

| Método | Endpoint             | Descripción               |
| ------ | -------------------- | ------------------------- |
| GET    | `/api/v1/users`      | Lista todos los usuarios  |
| GET    | `/api/v1/users/<id>` | Obtiene un usuario por ID |

Para visualizar todos los datos de los usuarios, ingresa al siguiente link:
`http://localhost:5000//api/v1/users`

### **Product Service (puerto 8080)**

| Método | Endpoint                | Descripción                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/v1/products`      | Lista todos los productos  |
| GET    | `/api/v1/products/<id>` | Obtiene un producto por ID |
| POST   | `/api/v1/products`      | Crea un nuevo producto     |

Para visualizar todos los datos de los productos, ingresa al siguiente link:
`http://localhost:8080/api/v1/products`

En el caso de necesitar registrar nuevos productos puedes usar herramientas como **Hoppscotch**, se debe realizar de la siguiente manera.

<img width="1323" height="506" alt="Image" src="https://github.com/user-attachments/assets/f0f49ddd-00ca-4a7f-94d2-09cefabd321d" />


---

## Conclusión y Demostración 

Esta práctica demuestra la implementación correcta de una arquitectura basada en microservicios totalmente independiente, cada uno con su propia base de datos y contenedor dedicado. El uso de Docker Compose simplifica el despliegue, prueba y mantenimiento del sistema, permitiendo entornos aislados y fácilmente reproducibles, una vez cargado los contenedores se nos presentará de la siguiente manera. 


