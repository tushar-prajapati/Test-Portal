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
import ForgotPassword from './pages/Admin/ForgotPassword.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Tests from './pages/Admin/Tests.jsx'
import Results from './pages/Admin/Results.jsx'
import Students from './pages/Admin/Students.jsx'
import UpdateProfile from './pages/Admin/UpdateProfile.jsx'
import UserLayout from './components/UserLayout.jsx'
import UserDashboard from './pages/User/UserDashboard.jsx'
import UserTests from './pages/User/UserTests.jsx'
import UserResults from './pages/User/UserResults.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='/' element={<Landing/>}/>
    <Route path='studentlogin' element={<StudentLogin/>}/>
    <Route path='teacherlogin' element={<TeacherLogin/>}/>
    <Route path='/register' element={<TeacherRegister/>}/>
    <Route path='/forgotpassword' element={<ForgotPassword/>}/>

    <Route path='' element={<ProtectedRoute/>}>
      <Route path='/admin' element={<AdminLayout/>}>
      <Route path='dashboard' element={<AdminDashboard/>}/>
      <Route path='tests' element={<Tests/>}/>
      <Route path='students' element={<Students/>}/>
      <Route path='results' element={<Results/>}/>
        
      </Route>

      <Route path='/student' element={<UserLayout/>}>
      <Route path='dashboard' element={<UserDashboard/>}/>
      <Route path='tests' element={<UserTests/>}/>
      <Route path='results' element={<UserResults/>}/>
      
        
      </Route>

    </Route>
  

    
      
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<RouterProvider router={router} />

</Provider>
)
