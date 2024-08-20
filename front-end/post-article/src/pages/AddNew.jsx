import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (status) => {
    try {
      await axios.post("http://localhost:3000/article", {
        title,
        content,
        category,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div>
          <button
            onClick={() => handleAdd("publish")}
            className="bg-blue-500 text-white px-4 py-2 mr-4"
          >
            Publish
          </button>
          <button
            onClick={() => handleAdd("draft")}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
