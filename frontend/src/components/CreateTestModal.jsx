import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useCreateTestMutation } from "../redux/api/testApiSlice.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import OverlayModal from "./OverlayModal.jsx";

const CreateTestModal = ({ onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const [testData, setTestData] = useState({
    title: "",
    description: "",
    durationHours: "",
    durationMinutes: "",
    questions: [],
    id: userInfo._id || "",
    testDateTime: null,
  });

  const [question, setQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctIndex: "",
    marks: 1,
  });

 

  const [createTest, { isLoading }] = useCreateTestMutation();

  const handleAddQuestion = () => {
    if(question.correctIndex<0 || question.correctIndex >3){
      toast.error("Invalid correct index");
    }
    if (
      !question.questionText ||
      question.correctIndex === "" ||
      question.marks <= 0
    ) {
      toast.error("All fields are required");
      return;
    }
    setTestData((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
    setQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctIndex: "",
      marks: 1,
    });
  };

  const handleTestChange = (e) => {
    const { name, value } = e.target;
    setTestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleOptionChange = (index, value) => {
    const updated = [...question.options];
    updated[index] = value;
    setQuestion((prev) => ({ ...prev, options: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTestData({ ...testData, testDateTime: new Date(`${date}T${time}`) });

    if (!testData.title || !testData.description || !testData.testDateTime) {
      toast.error("All fields are required");
      return;
    }

    if (testData.questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }
    try {
      const res = await createTest({ testData }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Test created successfully");
        setTestData({
          title: "",
          description: "",
          durationHours: "",
          durationMinutes: "",
          questions: [],
          testDateTime: null,
        });
        setQuestion({
          questionText: "",
          options: ["", "", "", ""],
          correctIndex: "",
          marks: 1,
        });
        onClose();
      } else {
        toast.error(
          res?.error?.data?.message ||
            res?.error.error ||
            "Something went wrong"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error.error ||
          "Failed to create test. Please try again."
      );
    }
  };

  
  return (
    <div className="py-2 px-12 w-full  space-y-2">
      <div className="w-full flex justify-center ">
        <h2 className="text-xl navText">Create New Test</h2>
      </div>

      <input
        type="text"
        name="title"
        placeholder="Test Title"
        className="w-full bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        value={testData.title}
        onChange={handleTestChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
        value={testData.description}
        onChange={handleTestChange}
      />
      <label htmlFor="duration" className="text-sm navText">
        Duration:
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          name="durationHours"
          placeholder="Hours"
          className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
          value={testData.durationHours}
          onChange={handleTestChange}
        />
        <input
          type="number"
          name="durationMinutes"
          placeholder="Minutes"
          className="w-1/2 bg-gray-100 focus:outline-black border-1 border-gray-300 text-sm px-2 py-1 rounded"
          value={testData.durationMinutes}
          onChange={handleTestChange}
        />
      </div>

      <label htmlFor="dateTime" className="text-sm navText">
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
        {testData.questions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-md">Saved Questions:</h4>
            <ul className="text-sm list-decimal ">
              {testData.questions.map((q, i) => (
                  <li key={i}>{i+1} {". "} {q.questionText}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex w-full justify-between">
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
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="mt-2 text-sm cursor-pointer bg-black text-white px-3 py-2 rounded hover:bg-[#212121] transition duration-300 ease-in-out"
        >
          Add Test +
        </button>
      </div>
    </div>
  );
};

export default CreateTestModal;
