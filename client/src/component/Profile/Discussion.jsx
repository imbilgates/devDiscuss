import React, { useEffect, useState } from 'react';
import { getDiscussionByUser } from '../../service/Service'; 
import { useAuth } from '../../contex/AuthContex';

const Discussion = () => {
  const { user, isLoading } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await getDiscussionByUser();
        setDiscussions(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching discussions');
      }
    };

    fetchDiscussions();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (discussions.length === 0) return <div>No discussions found for this user.</div>;

  return (
    <div>
      <h1>Your Discussions</h1>
      {discussions.map((discussion) => (
        <div key={discussion._id} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
          <h2>{discussion.title}</h2>
          <p>{discussion.description}</p>
          <p>
            <strong>Posted by:</strong> {user?.name || 'Unknown'} ({user?.email || 'Unknown'})
          </p>

          <div>
            <strong>Tags:</strong>
            {discussion.tags.map((tag, index) => (
              <span key={index} style={{ marginRight: '8px' }}>#{tag}</span>
            ))}
          </div>

          <div>
            <strong>Votes:</strong>
            <p>Upvotes: {discussion.votes.upvotes.length}</p>
            <p>Downvotes: {discussion.votes.downvotes.length}</p>
          </div>

          <div>
            <strong>Comments:</strong>
            {discussion.comments.length > 0 ? (
              <ul>
                {discussion.comments.map((comment) => (
                  <li key={comment._id}>
                    <p>{comment.commentText}</p>
                    <small>By User ID: {comment.user}</small>
                    <br />
                    <small>At: {new Date(comment.createdAt).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Discussion;
