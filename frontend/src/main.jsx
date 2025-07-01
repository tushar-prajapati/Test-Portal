import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider  } from 'react-redux'
import store from './redux/store.js'
import Landing from './pages/Auth/Landing.jsx'
import StudentLogin from './pages/Auth/StudentLogin.jsx'
import TeacherLogin from './pages/Auth/TeacherLogin.jsx'
import TeacherRegister from './pages/Auth/TeacherRegister.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='/' element={<Landing/>}/>
    <Route path='studentlogin' element={<StudentLogin/>}/>
    <Route path='teacherlogin' element={<TeacherLogin/>}/>
    <Route path='/register' element={<TeacherRegister/>}/>
    <Route path='teacherdashboard' element={<AdminDashboard/>}/>
      
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<RouterProvider router={router} />

</Provider>
)
