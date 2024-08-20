import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllPosts = () => {
  const [article, setArticle] = useState([]);
  const [activeTab, setActiveTab] = useState("publish");

  const fetchData = async () => {
    try {
      let { data } = await axios.get("http://localhost:3000/article");
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPosts = article.filter((post) => post.status === activeTab);

  const handleTrashPost = async (id) => {
    try {
      await axios.put(`http://localhost:3000/article/${id}`, {
        status: "thrash",
      });
      fetchData();
      setActiveTab("thrash");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("publish")}
          className={`mr-4 ${
            activeTab === "publish" ? "text-blue-600 font-bold" : ""
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setActiveTab("draft")}
          className={`mr-4 ${
            activeTab === "draft" ? "text-blue-600 font-bold" : ""
          }`}
        >
          Drafts
        </button>
        <button
          onClick={() => setActiveTab("thrash")}
          className={`${
            activeTab === "thrash" ? "text-blue-600 font-bold" : ""
          }`}
        >
          Trashed
        </button>
      </div>

      <table className="table-auto w-full bg-white shadow-md rounded-lg table-zebra">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">{post.category}</td>
              <td className="border px-4 py-2 flex">
                <Link to={`/article/${post.id}`} className="mr-4 text-blue-500">
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleTrashPost(post.id)}
                  className="text-red-500"
                >
                  🗑️ Trash
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPosts;
