import axios from "axios";

// DISCUSSIONS
export const listDiscussions = () => axios.get("/discussion");

export const getDiscussionById = (id) => axios.get(`/discussion/${id}`);

export const createDiscussion = (discussion) =>
    axios.post("/discussion/create", discussion, { withCredentials: true });

export const updateDiscussion = (id, updatedData) =>
    axios.put(`/discussion/update/${id}`, updatedData, { withCredentials: true });

export const deleteDiscussion = (id) =>
    axios.delete(`/discussion/delete/${id}`, { withCredentials: true });

// VOTING
export const voteDiscussion = (id, voteData) =>
    axios.post(`/discussion/${id}/vote`, voteData, { withCredentials: true });

// COMMENTS
export const addComment = (id, commentData) =>
    axios.post(`/discussion/${id}/comments`, commentData, { withCredentials: true });

export const getComments = (id) =>
    axios.get(`/discussion/${id}/comments`);

export const deleteComment = (discussionId, commentId) =>
    axios.delete(`/discussion/${discussionId}/comments/${commentId}`, { withCredentials: true });

export const editComment = (discussionId, commentId, updatedComment) =>
    axios.put(`/discussion/${discussionId}/comments/${commentId}`, updatedComment, { withCredentials: true });
