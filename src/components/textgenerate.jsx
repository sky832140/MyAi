import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function generatetext(promt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = promt;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
generatetext();
export const Textgenerate = () => {
  const [val, setVal] = useState("");
  const [response, setResponse] = useState("");
  function handleChange(e) {
    setVal(e.target.value);
  }
  //function to handle submission
async function handleSubmit() {
    const generateresponse=await generatetext(val);
    setResponse(generateresponse);
    console.log(generateresponse)
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-center text-4xl text-red-900">
        MY AI : Text-Generation
      </h1>
      <div className="my-10 mx-auto max-w-screen-lg">
        <label className="block my-4" htmlFor="Enter your prompt">
          Enter your prompt
        </label>
        <input
          className="border max-w-9xl rounded border-black"
          type="text"
          placeholder=""
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="block border rounded-r-lg border-black px-2 text-white bg-blue-900 my-4"
        >
          Generate
        </button>
      </div>
      <div className="my-4 max-w-screen-xl">
        <p>{response}</p>
      </div>
    </div>
  );
};
