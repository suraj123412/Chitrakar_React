import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const Comments = () => {
  const [comments, setComments] = useState([]);         // Safe init
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);         // Optional: loader

  const fetchComments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/comments/');
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customer Comments</h2>
      <CommentForm fetchComments={fetchComments} editData={editData} setEditData={setEditData} />
      <CommentList comments={comments} fetchComments={fetchComments} setEditData={setEditData} />
    </div>
  );
};

export default Comments;
