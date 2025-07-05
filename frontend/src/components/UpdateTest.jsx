import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFetchTestByIdQuery, useUpdateTestMutation } from '../redux/api/testApiSlice.js'
import Loader from './Loader.jsx';
import { useSelector } from 'react-redux';
import { useGetQuestionByIdQuery,
  useUpdateQuestionByIdMutation,
  useGetQuestionsByTestIdQuery,
  useDeleteQuestionByIdMutation} from '../redux/api/questionApiSlice.js';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import {toast} from 'react-toastify'
import OverlayModal from '../components/OverlayModal.jsx'
import EditQues from './EditQues.jsx';


const UpdateTest = ({testId, onClose}) => {
    const {data: testData, isLoading, refetch, isError} = useFetchTestByIdQuery(testId);
    const {userInfo} = useSelector((state)=>state.auth);
    const {data: questionData,refetch: refetchQuestions, isLoading: questionLoading, isError: questionError} = useGetQuestionsByTestIdQuery(testId);
    const [deleteQuestionById] = useDeleteQuestionByIdMutation();
    const [updateTest, {isLoading: updating}] = useUpdateTestMutation();
    const [test, setTest] = useState({
        title: '',
        description: '',
        durationHours: null,
        durationMinutes: null,
        questions: [],
        testDateTime: null,
      });
    const [date, setDate]= useState(null);
    const [time, setTime]= useState(null);
    const [qId, setQId] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const handleTestChange = (e) => {
        const { name, value } = e.target;
        setTest((prev) => ({ ...prev, [name]: value }));
    };

    
    

    useEffect(()=>{
        if(!isLoading && !isError){
            const dateNew = new Date(testData.test.testDateTime)
            const dateValue = dateNew.toISOString().split("T")[0];
            const timeValue = dateNew.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });
            setDate(dateValue)
            setTime(timeValue)


            setTest({
                title: testData.test.title,
                description: testData.test.description,
                durationHours: testData.test.durationMinutes/60,
                durationMinutes: testData.test.durationMinutes%60,
                questions: questionData.questions,
                testDateTime: testData.test.testDateTime,
              });
        }
    }, [testData])


    if(isLoading){
        return <div className='h-full w-full flex items-center justify-center'><Loader/></div>
    }


    if(isError){
        return  <div className="text-red-500">Error fetching test. Please try again later.</div>;
    }

    const handleQuestionDelete=async({quesId, e})=>{
      e.preventDefault();
      try {
        if(window.confirm('Are you sure?')){
          const res = await deleteQuestionById(quesId).unwrap();
        if(res?.success){
          toast.success("Question Deleted")
          refetchQuestions();
        }
        else{
          toast.error("Failed to delete question")
        }
        }
        else{
          return
        }
        
      } catch (error) {
        toast.error(error?.data?.message ||  error.message || 'Something went wrong');
      }
    }
    const handleEditQuestion=({quesId, e})=>{
      e.preventDefault();
      setQId(quesId)
      setModalOpen(true)
    }
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        setTest({ ...test, testDateTime: new Date(`${date}T${time}`) });
        if(!test.title|| !test.description || !test.testDateTime){
          toast.error('Please fill all fields')
        }
        
          try {
            const res = await updateTest({testId, test}).unwrap();
            if(res?.success){
              toast.success("Test Updated")
              refetch();
              onClose();
            }
            else{
              toast.error("Failed to update test")
            }
            
          } catch (error) {
            toast.error(error?.data?.message || error.message || 'Something went wrong');
          }
        

    }

  return (
    <div className="py-2 px-12 w-full  space-y-2">
      <div className="w-full flex justify-center ">
        <h2 className="text-xl navText">Update Test Details</h2>
      </div>

      <input
        type="text"
        name="title"
        placeholder="Test Title"
        className="w-full bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        value={test.title}
        onChange={handleTestChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        value={test.description}
        onChange={handleTestChange}
      />
      <label htmlFor="duration" className="flex text-sm navText">
        Duration:
      </label>
      
      <div className='flex gap-2' >
        <input 
        type="number"
        name="durationHours"
        placeholder="Hours"
        className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        value={Math.floor(test.durationHours)}
        onChange={handleTestChange}
        />

        <input
          type="number"
          name="durationMinutes"
          placeholder="Minutes"
          className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
          value={test.durationMinutes}
          onChange={handleTestChange}
        />
      </div>

      <label htmlFor="dateTime" className="flex text-sm navText">
        Test Date and Time:
      </label>
      <div className="flex gap-2">
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        />
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>

      <div className="max-h-[350px] overflow-scroll space-y-2">
        {test.questions.length > 0 && (
          <div className="mt-4 w-full space-y-2">
            <h4 className="font-semibold text-md">Saved Questions:</h4>
            <ul className="text-sm flex flex-col items-start w-full list-decimal ">
              {questionLoading? <Loader/> : 
              (test.questions.map((q, i) => (
                <div key={i} className="flex items-center gap-2">
                  <MdDelete
                  onClick={e=>handleQuestionDelete({quesId: q._id, e})}
                  className='text-md text-red-600 cursor-pointer hover:text-red-700'/> {" "}
                  <div className='gap-4 group flex mx-0 my-0 hover:border hover:border-dashed'
                  onClick={e=>handleEditQuestion({quesId: q._id, e})}
                  >
                  <FaEdit className='text-gray-500 group-hover:text-black'/>
                  <li key={i} className='text-gray-500 group-hover:text-black'> {" "} {q.questionText}</li>
                  </div>
                </div>
              )))}
            </ul>
          </div>
        )}

        <OverlayModal isOpen={modalOpen} onClose={()=>setModalOpen(false)}>
            <EditQues refetchQuestions={refetchQuestions} quesId={qId} onClose={()=>setModalOpen(false)}/>
        </OverlayModal>

        {/* <div className="flex w-full justify-between">
          <h3 className="font-semibold text-sm underline">
            Question {testData.questions.length + 1}
          </h3>
          <button
            onClick={handleAddQuestion}
            className="bg-green-600 cursor-pointer  text-lg text-white px-1 py-1 rounded hover:bg-green-700"
          >
            <FaSave />{" "}
          </button>
        </div>
        <textarea
          name="questionText"
          placeholder="Question"
          className="w-full bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
          value={question.questionText}
          onChange={handleQuestionChange}
        />

        {question.options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            className="w-5/12 mr-2  bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}

        <input
          type="number"
          name="correctIndex"
          placeholder="Correct Option Index (0-3)"
          className="w-full bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
          value={question.correctIndex}
          onChange={handleQuestionChange}
        />

        <div className="flex">
          <div className=" flex justify-end px-4 items-center">
            <label htmlFor="marks" className="text-sm">
              Marks:
            </label>
          </div>
          <input
            type="number"
            name="marks"
            placeholder="Marks"
            className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
            value={question.marks}
            onChange={handleQuestionChange}
          />
        </div>*/}
      </div> 

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="mt-2 text-sm cursor-pointer bg-black text-white px-3 py-2 rounded hover:bg-[#212121] transition duration-300 ease-in-out"
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default UpdateTest