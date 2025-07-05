import React, {useState, useMemo} from "react";
import { useGetQuestionByIdQuery,
    useUpdateQuestionByIdMutation,
    } from '../redux/api/questionApiSlice.js';
import Loader from "./Loader.jsx";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const EditQues = ({ quesId, onClose, refetchQuestions }) => {
    const {data: questionData, isLoading, error} = useGetQuestionByIdQuery(quesId);
    const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionByIdMutation();
    const initialQuestion = useMemo(() => {
        if (!questionData) return {
          questionText: "",
          options: ["", "", "", ""],
          correctIndex: "",
          marks: null,
        };
        return {
          questionText: questionData.question.questionText,
          options: questionData.question.options,
          correctIndex: questionData.question.correctIndex,
          marks: questionData.question.marks,
        };
      }, [questionData]);
    
      const [question, setQuestion] = useState(initialQuestion);
    
      const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setQuestion((prev) => ({ ...prev, [name]: value }));
      };

      const handleOptionChange = (index, value) => {
        const updatedOptions = [...question.options];
        updatedOptions[index] = value;
        setQuestion((prev) => ({ ...prev, options: updatedOptions }));
      };



      const handleSubmit = async(e)=>{
        e.preventDefault();
        const quesData = question;
        try {
            const res = await updateQuestion({quesId, quesData}).unwrap();
            if(res?.success){
                toast.success("Question updated")
                onClose()
                refetchQuestions();            }
            else{
                toast.error("Failed to update question, Please try again")
            }
        } catch (error) {
            toast.error(error?.data?.message || error?.error ||"Something went wrong")
        }
      }
      if(isLoading){
        return <div className="w-full h-full flex justify-center items-center"><Loader/></div>
      }
      if(error){
        return <div className="w-full h-full flex justify-center items-center"><h3 className="text-red-600 text-xl">Error Loading Question, Please try again</h3></div>
      }

      



  return (
    <div className="gap-y-4 flex-col flex my-6 px-8">
      <div className="flex w-full justify-between">
        <h3 className="font-semibold text-lg underline">
          Edit Question
        </h3>
        <button
          onClick={handleSubmit}
          className="bg-green-600 cursor-pointer  text-lg text-white px-1 py-1 rounded hover:bg-green-700"
        >
          <FaSave />{" "}
        </button>
      </div>
      Question: 
      <textarea
        name="questionText"
        placeholder="Question"
        className="w-full bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        value={question.questionText}
        onChange={handleQuestionChange}
      />
    <p>Options:</p>
      {question.options.map((opt, idx) => (
        <div className="flex items-center space-x-2" key={idx}>
            <p>{idx+1} .</p>
            <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          className="w-7/12 mr-2  bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
          value={opt}
          onChange={(e) => handleOptionChange(idx, e.target.value)}
        />
        </div>
      ))}

      <div className="flex items-center space-x-2">
            <p className="underline">Correct Index(0-3): </p>

      <input
        type="number"
        name="correctIndex"
        placeholder="Correct Option Index (0-3)"
        className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        value={question.correctIndex}
        onChange={handleQuestionChange}
      />
      </div>

      <div className="flex">
        <div className=" flex justify-end px-4 items-center">
          <label htmlFor="marks" className="text-sm underline">
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
      </div>
    </div>
  );
};

export default EditQues;
