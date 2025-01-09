import express from 'express';
import {
    createDiscussion,
    getDiscussion,
    updateDiscussion,
    deleteDiscussion,
    getDiscussionById,
    getDiscussionByUser,
    VoteDiscussion,
    addComments,
    getComments,
    deleteComments,
    editComments
} from '../controllers/discussController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const route = express.Router();
route.use(verifyToken);

route.get("/", getDiscussion);
route.get("/user", getDiscussionByUser);
route.get("/:id", getDiscussionById);
route.post("/create", createDiscussion);
route.put("/update/:id", updateDiscussion);
route.delete("/delete/:id", deleteDiscussion);

// VOTE & COMMENTS
route.post("/:id/vote", VoteDiscussion);

route.post("/:id/comments", addComments);
route.get("/:id/comments", getComments);
route.delete("/:discussionId/comments/:commentId", deleteComments);
route.put("/:discussionId/comments/:commentId", editComments);

export default route;