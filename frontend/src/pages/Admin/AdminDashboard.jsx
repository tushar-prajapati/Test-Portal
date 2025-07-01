import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutAdminMutation } from '../../redux/api/adminApiSlice.js'
import { logout } from '../../redux/features/auth/authSlice.js'

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutAdmin] = useLogoutAdminMutation(); 

  const logoutHandler = async ()=>{
    try {
      await logoutAdmin().unwrap();
      dispatch(logout());
      navigate('/teacherlogin')
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='flex flex-row items-center justify-center'>
      <h1>Admin Dashboard</h1><br />
      <button className='bg-black cursor-pointer text-white p-4' onClick={logoutHandler}>Logout</button>
      </div>
  )
}

export default AdminDashboard