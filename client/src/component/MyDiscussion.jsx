import React, { useEffect, useState } from "react";
import { listDiscussions } from '../service/Service';

const MyDiscussion = () => {
    const [discussions, setDiscussions] = useState([]);
  
    useEffect(() => {
      const fetchDiscussions = async () => {
        try {
          const response = await listDiscussions();
          setDiscussions(response.data);
        } catch (error) {
          console.error("Error fetching discussions:", error);
        }
      };
  
      fetchDiscussions();
    }, []);
  
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <select className="form-select w-auto">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
        <div>
          {discussions.map((discussion) => (
            <div key={discussion._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{discussion.title}</h5>
                <p className="card-text">{discussion.description}</p>
                <div className="d-flex justify-content-between">
                  <span>Upvotes: {discussion.votes.upvotes.length || 0}</span>
                  <span>Downvotes: {discussion.votes.downvotes.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
const getButtonStyles = (isVoted) => ({
    transition: "background-color 0.3s ease",
    backgroundColor: isVoted ? "#007bff" : "",
    color: isVoted ? "white" : "",
});

export default MyDiscussion;
