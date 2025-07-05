import React, {useState} from 'react'
import BlackModal from '../../components/BlackModal.jsx'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import WhiteModal from '../../components/WhiteModal.jsx';
import WhiteModal2 from '../../components/WhiteModal2.jsx';
import OverlayModal from '../../components/OverlayModal.jsx';
import AddTest from '../../components/AddTest.jsx';
import { useSelector } from 'react-redux';
import {useGetAllowedLiveTestsForUserQuery, useGetAllowedUpcomingTestsForUserQuery, useFetchTestByIdQuery} from '../../redux/api/testApiSlice.js';
import { FaArrowRight } from "react-icons/fa";
import Legend from '../../components/Legend.jsx';
import woman from '../../assets/images/woman.png'
import { FaClock } from "react-icons/fa";
import { toast } from 'react-toastify';
import { FaQuestionCircle } from "react-icons/fa";
import { Loader } from 'lucide-react';





const UserTests = () => {
  const [showModal, setShowModal] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const {userInfo} = useSelector((state) => state.auth);
  const {data: allowedLiveTests, isLoading} = useGetAllowedLiveTestsForUserQuery(userInfo._id);
  const {data: allowedUpcomingTests, isLoading: upcoming} = useGetAllowedUpcomingTestsForUserQuery(userInfo._id);
  const [testId, setTestId] = useState('');
  const {data: testDetails, refetch, isLoading:fetchingTest} = useFetchTestByIdQuery(testId)
  const [time, setTime] = useState('');

  const openInstructionsHandler =async (e, testId) => {
    e.preventDefault();
    setTestId(testId);
    await refetch();
    const isoString = testDetails?.test?.testDateTime;
    const time12hr = new Date(isoString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setTime(time12hr);
    
    setOpenInstructions(true);
  }






  return (
    <div className=''>
      <BlackModal onClick={()=>setShowModal(true)}>
        <div className='w-full px-10 flex justify-between'>
        <h1 className='text-xl'>
          ADD TEST
        </h1>
        <FaRegArrowAltCircleRight className='text-2xl'/>
        </div>
        
      </BlackModal>
      <OverlayModal isOpen={showModal} onClose={()=>setShowModal(false)}>
        <AddTest onClose={()=>setShowModal(false)}/>
      </OverlayModal>

      <WhiteModal height="max-h-[33rem] overflow-y-scroll">
        <div className='mt-4 px-4'>
        
        
        {allowedLiveTests  ? (
  <>
    <h1 className='text-xl navText'>Current Tests</h1>
    {allowedLiveTests.allowedTests.map((test, index) => (
          <WhiteModal2>

      <div key={index} className='flex justify-between items-center py-4 mt-3'>
        <div className='px-6'>
          <h2 className='text-lg navtext font-semibold'>{test.title.toUpperCase()}</h2>
          <span className='text-sm text-gray-500'>
          {new Date(test.testDateTime).toLocaleString()}{` - Duration: ${test.durationMinutes} minutes`}
        </span>

        </div>
        <div>
          <button
          onClick={(e)=>openInstructionsHandler(e, test._id)}
          className='flex gap-2 hover:bg-[#212121] cursor-pointer items-center justify-center bg-black text-white px-8 text-lg py-3 rounded-lg mx-10'>
            JOIN   {"   "}<FaArrowRight className='text-sm'/>
          </button>

        </div>
      </div>
      </WhiteModal2>


    ))}

    <OverlayModal isOpen={openInstructions} onClose={() => setOpenInstructions(false)}>
      {fetchingTest? <div><Loader/></div>:(

    <div className="flex  text-black rounded-xl w-full max-w-3xl mx-auto">
    <div className="w-3/4 flex flex-col items-center p-2">
      <img
      src={woman} 
      alt="Illustration"
      className="h-72"
      />
      <h1 className='py-4 navText'>THE TEST BEGINS AT {time}</h1>
      <p className='py-4 mb-12 px-14 text-sm text-center text-gray-500 font-light'>Please wait patiently and use this time to revise your notes until the test begins</p>
      <p className='py-4 mb-12 px-14 text-sm text-center text-black font-light'><span className='navText underline'>NOTE:</span> Once you END test, you cannot reattempt it</p>
    </div>

  <div className="h-auto w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent mx-4"></div>


  <div className="w-1/4 p-1 flex flex-col justify-end h-auto py-4">
    <div>
    <h1 className='mt-10 text-black mb-2 navText'>INSTRUCTIONS</h1>
    <div className='mb-16'>
      <div className="space-y-2 mb-8">
        <Legend color="bg-green-400" label="Answered" />
        <Legend color="bg-red-500" label="Unanswered" />
        <Legend color="bg-yellow-300" label="Marked" />
        <Legend color="bg-gray-300" label="Unseen" />
      </div>
      <h1 className='text-black mb-2 navText'>DETAILS</h1>

      <div className="text-gray-500 space-y-2 navText text-sm font-medium ">
        <div className='w-full flex items-center space-x-2'><FaQuestionCircle className='text-black text-md'/>
        <p>{testDetails?.test?.questions?.length ?? 0}</p></div>
        <div className='w-full flex items-center space-x-2'><FaClock className='text-black text-md'/><p>
          {testDetails?.test?.durationMinutes ?? 0} Minutes</p></div>
      </div>
    </div>
    </div>

    <button className="mt-6 mr-4 self-end cursor-pointer text-white px-10 py-2 rounded-xl hover:bg-gray-700 bg-black transition-all duration-300 ease-in-out flex items-center gap-2">
      Start <span className="text-lg">→</span>
    </button>
  </div>
</div>
      )}

    </OverlayModal>
  </>
) : isLoading ? (
  <p className='text-gray-500'>Loading tests...</p>
) : (
  <p className='text-gray-500'>No live tests available</p>
)}
        </div>
        <div className='mt-4 px-4'>
        {allowedUpcomingTests  ? (
  <>
    <h1 className='text-xl navText'>Upcoming Tests</h1>
    {allowedUpcomingTests.upcomingTests.map((test, index) => (
          <WhiteModal2>

      <div key={index} className='flex justify-between items-center py-4 mt-3'>
        <div className='px-6'>
          <h2 className='text-lg navtext font-semibold'>{test.title.toUpperCase()}</h2>
          <span className='text-sm text-gray-500'>
          {new Date(test.testDateTime).toLocaleString()}{` - Duration: ${test.durationMinutes} minutes`}
        </span>

        </div>
        <div className='mr-6'>
          <p className='underline'>Description:</p> 
          <p className='text-gray-500 text-xs'>{test.description}</p>

        </div>
      </div>
      </WhiteModal2>

    ))}
  </>
) : upcoming ? (
  <p className='text-gray-500'>Loading tests...</p>
) : (
  <p className='text-gray-500'>No upcoming tests available</p>
)}

        </div>

        </WhiteModal>
    </div>
  )
}

export default UserTests