import axios from "axios";

// DISCUSSIONS
export const listDiscussions = (tag, page = 1, limit = 10) => {
    let url = `api/discussion?page=${page}&limit=${limit}`;
    if (tag) {
        url += `&tag=${encodeURIComponent(tag)}`;
    }
    return axios.get(url);
};


export const getDiscussionByUser = () => axios.get("api/discussion/user", { withCredentials: true });

export const getDiscussionById = (id) => axios.get(`api/discussion/${id}`);

export const createDiscussion = (discussion) =>
    axios.post("api/discussion/create", discussion, { withCredentials: true });

export const updateDiscussion = (id, updatedData) =>
    axios.put(`api/discussion/update/${id}`, updatedData, { withCredentials: true });

export const deleteDiscussion = (id) =>
    axios.delete(`api/discussion/delete/${id}`, { withCredentials: true });

// VOTING
export const voteDiscussion = (id, voteData) =>
    axios.post(`api/discussion/${id}/vote`, voteData, { withCredentials: true });

// COMMENTS
export const addComment = (id, commentData) =>
    axios.post(`api/discussion/${id}/comments`, commentData, { withCredentials: true });

export const getComments = (id) =>
    axios.get(`api/discussion/${id}/comments`);

export const deleteComment = (discussionId, commentId) =>
    axios.delete(`api/discussion/${discussionId}/comments/${commentId}`, { withCredentials: true });

export const editComment = (discussionId, commentId, updatedComment) =>
    axios.put(`api/discussion/${discussionId}/comments/${commentId}`, updatedComment, { withCredentials: true });

// AUTH
export const registerUser = (userData) =>
    axios.post("api/auth/register", userData);

export const loginUser = (credentials) =>
    axios.post("api/auth/login", credentials);

export const getAuthenticatedUser = () =>
    axios.get("api/auth/", { withCredentials: true });

export const listAllUsers = () =>
    axios.get("api/auth/users", { withCredentials: true });

// GOOGlE AUTH
export const googleAuth = (code) => axios.get(`api/auth/google?code=${code}`);

// EDIT PROFILE
export const updateProfile = (updatedData) =>
    axios.put("api/auth/profile-edit", updatedData, { withCredentials: true });
