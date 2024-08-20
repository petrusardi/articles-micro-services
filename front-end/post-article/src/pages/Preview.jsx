import axios from "axios";
import React, { useEffect, useState } from "react";

const Preview = () => {
  const [article, setArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const fetchData = async () => {
    try {
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/article",
      });
      setArticle(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const publishedPosts = article.filter((post) => post.status === "publish");

  const totalPages = Math.ceil(publishedPosts.length / itemsPerPage);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = publishedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      {currentPosts.map((post) => (
        <div
          key={post.id}
          className="mb-4 p-4 border rounded-lg shadow-md bg-white"
        >
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <span className="text-blue-800 font-bold">{post.category}</span>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Preview;
