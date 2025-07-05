import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {useAddTestMutation} from '../redux/api/userApiSlice.js'
import Loader from './Loader.jsx'
import { toast } from 'react-toastify'

const AddTest = ({onClose}) => {
    const [testCode, setTestCode] = useState('')
    const {userInfo} = useSelector(state=>state.auth)
    const userId = userInfo._id;
    const [addTest, {isSuccess, isLoading, error}] = useAddTestMutation()


    const submitHandler = async(e) =>{
        e.preventDefault();
        try {
            const res = await addTest({testCode, userId}).unwrap();
            console.log(res)
            if(res?.success){
                toast.success(res.message);
                onClose();
            }
            else{
                toast.error("Failed to add test");
            }
            
        } catch (error) {
            toast.error(error?.data?.message || error.error || "Something went wrong")
        }

    }
    

  return (
    <div>
        <div className="px-24 text-lg navText text-black mt-4">
              <h2>Enter Test-ID</h2>
              <input
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                placeholder="Valid Test-ID provided by the teacher"
                type="text"
                className=" w-full mt-4 px-4 text-sm bg-gray-100 py-2 border rounded-lg border-gray-300"
              />
              <div className="pt-6 mb-10 flex justify-center">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    onClick={submitHandler}           
                    className=" w-1/2 hover:w-6/10 transition-all duration-300 ease-in-out cursor-pointer bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 "
                  >
                    Add +
                  </button>
                )}
              </div>
            </div>
    </div>
  )
}

export default AddTest