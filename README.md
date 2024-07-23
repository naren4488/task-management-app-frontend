Title : Full-Stack Developer Challenge - Task Manager Application

Task : You are tasked with building a task management application similar to Trello. The application will allow users to create, update, and manage tasks within different columns. Users should be able to move tasks between columns using drag-and-drop functionality. Additionally, users should be able to sign up and log in, including the option to log in via Google.

- Website live link - https://task-management-app-frontend.onrender.com/
- Backend link (to check backend health) - https://task-management-app-backend-mory.onrender.com/health

# please note that backend is hosted on render (as it is free) so it may take upto 90 seconds to start, so please use this health checkup link to test the backend running status.

- Frontend Github - https://github.com/naren4488/task-management-app-frontend
- Backend Github - https://github.com/naren4488/task-management-app-backend

# Technologies & Data

React + Vite + TS - for frontend
Node + Express + MongoDB - for backend
Tailwind + Shadcn/UI - for styling the application

# Setup Guide - Frontend

To setup & run the frontend in local, clone the git repository : https://github.com/naren4488/task-management-app-frontend

- This app is create using vite-react, you can start the installation of project packages by command :
  $ npm install

- then run the project using command :
  $ npm run dev

- to build :
  $ npm run build

- to preview after build :
  $ npm run preview

# Folder strucutre - Frontend

- package.json - contains all the details about scripts, dependencies & devDependencies
- public - contains assets of application (brandLogo & landing page images)
- src/components - contains all the components of project also it further contains /ui folder to carry the UI related components from shadCN UI library which are used in this project
- src/pages - contains the pages of project
- src/layout - contains layout for pages
- src/AppRoutes.tsx - contains routes setup for the application
- src/main.tsx - starting file of project
- src.app.tsx - starting component of project

# Working of project

1. On app load, landing page will load where user can to to Tasks or signup.
2. On signup page user can do the registration.
3. On login page user can login.
4. On Task page use can create, read, update and delete tasks, drag and drop columns as well as tasks. All the changes are stored in DB, so data is persistent across login & logouts across all devices.

# Please note that the accessToken is valid for only 6 hours, so user need to login again after 6 hours once logged in.

#

#

#

# Setup Guide - Backend

To setup & run the backend in local, clone the git repository : https://github.com/naren4488/task-management-app-backend

- This app is create using vite-react, you can start the installation of project packages by command :
  $ npm install

- then run the project using command :
  $ npm run dev

# Folder strucutre - Frontend

- package.json - contains all the details about scripts, dependencies & devDependencies
- src/routes - contains all the routes for backend(user & tasks)
- src/models - contains database schema for tasks & users
- src/middlewares - to verify auth of users
- src/controllers - contains all the logic for handling api requirements
