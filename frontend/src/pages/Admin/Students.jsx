import React, { useEffect } from 'react'
import { useState } from 'react'
import OverlayModal from '../../components/OverlayModal.jsx'
import BlackModal from '../../components/BlackModal.jsx';
import plus from '../../assets/vectors/Plus.png'
import { toast } from 'react-toastify';
import { useCreateUserMutation, useGetAllUsersQuery, useToggleUserMutation } from '../../redux/api/userApiSlice.js';
import Loader from '../../components/Loader.jsx';
import WhiteModal from '../../components/WhiteModal.jsx';



const Students = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState('');
    const [section, setSection] = useState('');
    const [semester, setSemester] = useState('');
    const [dob, setDob] = useState(null);
    const [createUser, { isLoading }] = useCreateUserMutation();
    const {data: users, refetch, isLoading: isUsersLoading, error: isUsersError} = useGetAllUsersQuery();
    const [toggleUser] = useToggleUserMutation();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !roll || !section || !semester || !dob) {
            toast.error("All fields are required");
            return;
        }
        if(!email.includes('@akgec.ac.in')) {
            toast.error("Please enter valid college email");
            return;
        }
        if(semester < 1 || semester > 8) {
            toast.error("Please enter a valid semester (1-8)");
            return;
        }
        try {
            const studentData = {
                name,
                email,
                universityRoll: roll,
                section,
                semester,
                dob
            };
            const student = await createUser(studentData).unwrap();
            if(student?.success) {
                setModalOpen(false);
                setName('');
                setEmail('');
                setRoll('');
                setSection('');
                setSemester('');
                setDob(null);
                toast.success("Student added successfully");
            }
            else{
                toast.error(student?.error?.data?.message || student?.error.error || "Something went wrong");
            }
            
        } catch (error) {
            toast.error(error?.data?.message || error.error || "Failed to add student. Please try again.");
        }
        
    }

    const handleChange =async (index) => {
      try {
        const user = users[index];
        const id = user._id;
        const res = await toggleUser(id).unwrap();
        if (res?.success) {
          toast.success(`Student status updated successfully`);
          refetch();
        }
        else {
          toast.error(res?.error?.data?.message || res?.error.error || "Failed to update student status. Please try again.");
        }

        
      } catch (error) {
        console.error(error?.error || error?.data?.message || "Failed to update student status. Please try again.");
        
      }
    }
    


    
    
  return (
    <div>
        <BlackModal onClick={()=>setModalOpen(true)}>
            <div className='w-full px-8 flex items-center justify-between'>
                <h1 className='text-lg'>Student Registration</h1>
                <img src={plus} className='h-8 w-8' alt="" />
            </div>
        </BlackModal>

        <WhiteModal height='h-[32rem]'>
        { isUsersLoading ? <div className='w-full h-full flex items-center justify-center'> <Loader/></div> : isUsersError ? <div className='w-full h-full flex items-center justify-center'><p className='text-red-500'>!Failed to load students</p> </div> :(
      <div className="max-w-full">
      <div className="max-h-[400px] overflow-y-scroll">
        
        <table className="min-w-full text-center">

        <thead className=" text-black text-sm font-semibold sticky top-0 z-10 bg-white/50">
          <tr>
            <th className="px-2 py-1 ">S.no</th>
            <th className="px-2 py-1 ">Name</th>
            <th className="px-2 py-1 ">Email</th>
            <th className="px-2 py-1 ">Roll No.</th>
            <th className="px-2 py-1 ">Section</th>
            <th className="px-2 py-1 text-center">Enable/disable </th>
            
          </tr>
        </thead>
          <tbody className="text-black text-sm">
            {users.map((student, index) => (
              <tr key={index} className="border-t">
                <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">{index + 1}</td>
                <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">{student.name}</td>
                <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">{student.email}</td>
                <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">{student.universityRoll}</td>
                <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">{student.section}</td>
                <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">
                  <div className='w-full flex justify-center'>
                    <button onClick={
                      () => handleChange(index)
                    } className={`${student.isActive? "bg-green-500 hover:bg-green-600" :"bg-red-500 hover:bg-red-600"} cursor-pointer rounded text-white py-1 px-2`}>
                      {student.isActive ? "Enabled" : "Disabled"}
                    </button>
                 </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>



          )}
        </WhiteModal>





        <OverlayModal isOpen={modalOpen} onClose={() => setModalOpen(false)} >

        <div className="px-24 pt-2 pb-16">
        <h2 className="text-2xl font-bold text-center mb-2 navText">STUDENT REGISTRATION FORM</h2>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        <p className="text-center text-gray-700 mb-6 mt-4">Registering New Student</p>

        <div className="space-y-4">
            <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-full mt-2 px-4 text-sm bg-gray-100 py-2 border rounded-lg border-gray-300"
          />
          <label htmlFor="email">College Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Studentstudentno@akgec.ac.in"
            className="w-full mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
          />
            <label htmlFor="roll">University Roll number</label>
          <input
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            type="number"
            placeholder="2200270xxxxxx"
            className="w-full mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
          />
            <div className='flex'>
            <div>
            <label htmlFor="section">Section:</label>
          <input
            value={section}
            onChange={(e) => setSection(e.target.value)}
            type="text"
            placeholder="eg. CS-2"
            className="w-1/2 mx-3 mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
          />
            </div>
           <div >
             <label htmlFor="semester">Semester:</label>
          <input
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            type="number"
            placeholder="eg. 6"
            className="w-1/2 mt-2 mx-3 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
          />
           </div>
            </div>
            
            <label htmlFor="dob">Date Of Birth</label>

            <input
            value={dob}
            onChange={(e) => setDob(e.target.value)}
              type="Date"
              placeholder="date of birth"
              className="w-full cursor-pointer mt-2 px-4 text-sm bg-gray-100 py-2 border rounded-lg border-gray-300"
            />
            <span className="absolute left-2 top-2.5 text-xl">➕</span>
        </div>

        <div className="flex justify-end mt-6">
        { isLoading? <Loader/>: <button
            onClick={handleSubmit}
            className="px-6 py-2 border mb-10 text-white bg-black cursor-pointer rounded-lg hover:bg-[#212121] flex items-center"
          >
            Add +
          </button>

        }
          
        </div> 
        </div>
        </OverlayModal>

        

    </div>
  )
}

export default Students