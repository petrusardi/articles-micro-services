import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    status: "",
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/article/${id}`);
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (status) => {
    try {
      await axios.put(`http://localhost:3000/article/${id}`, {
        ...post,
        status,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleChange(e);
          }}
          className="border p-2 w-full mb-4"
          placeholder="Title"
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            handleChange(e);
          }}
          className="border p-2 w-full mb-4"
          placeholder="Content"
        />
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleChange(e);
          }}
          className="border p-2 w-full mb-4"
          placeholder="Category"
        />
        <div>
          <button
            onClick={() => handleSave("publish")}
            className="bg-blue-500 text-white px-4 py-2 mr-4"
          >
            Publish
          </button>
          <button
            onClick={() => handleSave("draft")}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
