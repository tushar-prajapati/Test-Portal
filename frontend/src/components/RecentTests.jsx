import React from 'react'
import { useSelector } from 'react-redux'
import { useGetRecentTestsQuery, useDeleteTestByIdMutation } from '../redux/api/testApiSlice'
import Loader from './Loader.jsx';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { MdDownload } from "react-icons/md";



const RecentTests = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const id=userInfo?._id;
    const [deleteTestById] = useDeleteTestByIdMutation();


    const {data: tests, refetch, isLoading, isError} = useGetRecentTestsQuery(id);

    if (isLoading) {
        return(<div className='w-full h-full flex items-center justify-center'> <Loader /></div>);
    }
    if (isError) {
        return <div className="text-red-500">Error fetching tests. Please try again later.</div>;
    }

    const deleteTest = async (e, testId) => {
        e.preventDefault();
        try {
            if(window.confirm("Are you sure you want to delete this test?")) {
                const res = await deleteTestById(testId).unwrap();
            if (res?.success) {
                toast.success("Test deleted successfully");
                refetch();
            }
            else {
                toast.error("Failed to delete test. Please try again.");
            }
            }  
            else return ;     
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete test. Please try again.");
        }
    }

    const copyToClipboard =async (e) => {
        e.preventDefault();
        const testCode = e.target.innerText;
        try{
            await navigator.clipboard.writeText(testCode)
      
        toast.success("Test code copied to clipboard");
        }
        catch (error) {
            toast.error("Failed to copy test code. Please try again.");
        }    
    }

    const downloadHandler = async(e, testId) => {
        e.preventDefault();

        
    }

  return (
    
        <div className="max-w-full mt-4">
          <div className="max-h-[400px] overflow-y-scroll overflow-x-scroll">
            <table className="min-w-full text-center">
              <thead className="text-black text-sm font-semibold sticky top-0 z-10 bg-white/50">
                <tr>
                  <th className="px-2 py-1">S.no</th>
                  <th className="px-2 py-1">Title</th>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Time</th>
                  <th className="px-2 py-1">Test-ID</th>
                  <th className="px-2 py-1">Download Result</th>
                  <th className="px-2 py-1">Delete</th>
                </tr>
              </thead>
              <tbody className="text-black text-sm">
                {tests.tests.map((test, index) => {
                  const testDate = new Date(test.testDateTime);
                  return (
                    <tr key={index} className="border-t">
                      <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">
                        {index + 1}
                      </td>
                      <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">
                        {test.title}
                      </td>
                      <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">
                        {testDate.toLocaleDateString()}
                      </td>
                      <td className="px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">
                        {testDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="cursor-pointer px-2 text-xs py-1 bg-white border-4 border-[#f4f4f4]">
                      <div onClick={copyToClipboard} className='hover:border-dashed hover:border px-0'>{test.testCode}</div>
                      </td>
                      <td className="text-lg py-1 text-center bg-white border-4 border-[#f4f4f4]">
                        <div className='w-full flex justify-center'>
                        <MdDownload 
                        onClick={(e) => {downloadHandler(e, test._id)}}
                        className='cursor-pointer hover:text-gray-500'/>
                        </div>
                      </td>
                      <td className="px-2 text-md py-1 bg-white border-4 border-[#f4f4f4]">
                        <MdDelete 
                        onClick={(e) => {deleteTest(e, test._id)}}
                        className='mx-auto cursor-pointer text-xl text-red-500 hover:text-red-700' />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default RecentTests