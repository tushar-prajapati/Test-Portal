import React, { useEffect } from 'react'
import { useState } from 'react'
import { useFetchTestByIdQuery } from '../redux/api/testApiSlice.js'
import Loader from './Loader.jsx';
import { useSelector } from 'react-redux';


const UpdateTest = ({testId, onClose}) => {
    const {data: testData, isLoading, isError} = useFetchTestByIdQuery(testId);
    const {userInfo} = useSelector((state)=>state.auth)

    const [test, setTest] = useState({
        title: '',
        description: '',
        durationHours: null,
        durationMinutes: null,
        questions: [],
        date: null,
        time: null,
      });
    const handleTestChange = (e) => {
        const { name, value } = e.target;
        setTest((prev) => ({ ...prev, [name]: value }));
    };
    

    useEffect(()=>{
        if(!isLoading && !isError){
            const date = new Date(testData.test.testDateTime)
            const dateValue = date.toISOString().split("T")[0];
            const timeValue = date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });

            setTest({
                title: testData.test.title,
                description: testData.test.description,
                durationHours: testData.test.durationMinutes/60,
                durationMinutes: testData.test.durationMinutes%60,
                questions: testData.test.questions,
                date: dateValue,
                time: timeValue
              });
        }
    }, [testData])
    console.log(test.dateTime)
    if(isLoading){
        return <div className='h-full w-full flex items-center justify-center'><Loader/></div>
    }
    if(isError){
        return  <div className="text-red-500">Error fetching test. Please try again later.</div>;
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        onClose();

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
          value={test.date}
          onChange={handleTestChange}
          className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        />
        <input
          type="time"
          id="time"
          name="time"
          value={test.time}
          onChange={handleTestChange}
          className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>

      <div className="max-h-[350px] overflow-scroll space-y-2">
        {/* {testData.questions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-md">Saved Questions:</h4>
            <ul className="text-sm list-decimal ">
              {testData.questions.map((q, i) => (
                  <li key={i}>{i+1} {". "} {q.questionText}</li>
              ))}
            </ul>
          </div>
        )} */}

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