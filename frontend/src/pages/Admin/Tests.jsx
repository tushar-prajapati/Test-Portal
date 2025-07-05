import React from 'react'
import { useState } from 'react'
import OverlayModal from '../../components/OverlayModal.jsx'
import BlackModal from '../../components/BlackModal.jsx';
import plus from '../../assets/vectors/Plus.png'
import { toast } from 'react-toastify';
import WhiteModal from '../../components/WhiteModal.jsx';
import CreateTestModal from '../../components/CreateTestModal.jsx';
import UpcomingTests from '../../components/UpcomingTests.jsx';
import RecentTests from '../../components/RecentTests.jsx';


const Tests = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');


  const upcomingClickHandler = (e) => {
    e.preventDefault();
    setActiveTab('upcoming');
  }
  const recentClickHandler = (e) => {
    e.preventDefault();
    setActiveTab('recent');
  }

  return (
    <div>
      <BlackModal onClick={()=>setModal1Open(true)}>
      <div className='w-full px-8 flex items-center justify-between'>
                <h1 className='text-lg'>Create Test</h1>
                <img src={plus} className='h-8 w-8' alt="" />
            </div>
      </BlackModal>
      <OverlayModal isOpen={modal1Open} onClose={() => setModal1Open(false)} >
      <CreateTestModal onClose={() => setModal1Open(false)}/>
      </OverlayModal>


      <WhiteModal height='h-[32rem]'>
        <div className='mx-2 sticky top-0 z-10'>
          <div className='flex'>
            <button onClick={upcomingClickHandler} className={` text-sm py-1 px-2 ${activeTab=='upcoming' ? "bg-[#212121] text-white": "bg-gray-300 text-black cursor-pointer hover:bg-slate-300"}`}>Upcoming</button>
            <button onClick={recentClickHandler} className={` text-sm py-1 px-4 ${activeTab=='recent' ? "bg-[#212121] text-white": "bg-gray-300 text-black cursor-pointer hover:bg-slate-300"} `}>Recent</button>
          </div>
        </div>



        { activeTab === 'upcoming' && (
          
           <UpcomingTests/>
           
         )}




        { activeTab === 'recent' && (
           <RecentTests/>
        )}


      </WhiteModal>

    </div>
  )
}

export default Tests