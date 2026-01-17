
  # Project Management Application

  This is a code bundle for Project Management Application. The original project is available at https://www.figma.com/design/17jLU5VjhwMXljpVidXbYk/Project-Management-Application.

  ## Running the code

  Run `npm i` to install the dependencies.

  
  Run `npm run dev` to start the development server.

  ## 🐳 Docker Support

  The Popilot project has been successfully dockerized. A new backend service has been initialized, and the entire stack (Frontend, Backend, Database, PHPMyAdmin) is running via Docker Compose.

  ### Environment Access

  | Service | Local URL | Internal Port | External Port |
  | :--- | :--- | :--- | :--- |
  | **Frontend** | [http://localhost:3001](http://localhost:3001) | 3000 | 3001 |
  | **Backend** | [http://localhost:5001](http://localhost:5001) | 5000 | 5001 |
  | **PhpMyAdmin** | [http://localhost:8081](http://localhost:8081) | 80 | 8081 |
  | **MySQL Database** | `localhost:3307` | 3306 | 3307 |

  ### Architecture Changes

  #### Frontend (`/`)
  - Added `Dockerfile` (Node.js 20).
  - Configured to run `npm run dev -- --host` to expose Vite.
  - Port mapped to **3001** (due to 3000 being in use).

  #### Backend (`/backend`)
  - **New Directory**: Created basic Express server structure.
  - **Entry Point**: `src/index.js` (Includes DB connection test).
  - **Docker**: Included `Dockerfile`.
  - **API**: Exposed on port **5001** (due to 5000 being in use).

  #### Database
  - **Service**: `db` (MySQL 8.0).
  - **Credentials**:
    - User: `user`
    - Password: `password`
    - Root Password: `rootpassword`
    - Database: `popilot_db`
  - **Persistence**: Data stored in `db_data` volume.

  ### 🛠️ Commands
  - **Start**: `docker-compose up -d`
  - **Stop**: `docker-compose down`
  - **Rebuild**: `docker-compose up --build -d`
  - **Check Logs**: `docker-compose logs -f`

  ### ✅ Verification
  - Frontend is serving index.html.
  - Backend is responding at `/` and `/test-db`.
  - Containers are healthy.
  