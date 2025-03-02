import discussionModel from '../models/discussModel.js';
import userModel from "../models/userModel.js";
import mongoose from 'mongoose';
import { sendEmail } from '../utils/emailService.js';

// DISCUSSION
export const createDiscussion = async (req, res) => {
    const { title, description, tags, code, language } = req.body; 
    const userId = req.user.id;

    try {
        const discussion = new discussionModel({
            title,
            description,
            tags,
            code,
            language, 
            user: userId
        });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
export const getDiscussion = async (req, res) => {
    const { tag, page = 1, limit = 5 } = req.query; // Default page 1, limit 10
    const skip = (page - 1) * limit; // Calculate offset

    try {
        const filter = tag ? { tags: tag } : {};
        
        // Fetch discussions with pagination
        const discussions = await discussionModel
            .find(filter)
            .populate("user", "name email image")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        // Get total discussion count
        const totalDiscussions = await discussionModel.countDocuments(filter);

        const discussionsWithCount = discussions.map(discussion => ({
            ...discussion,
            commentsCount: discussion.comments.length,
        }));

        res.json({
            discussions: discussionsWithCount,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalDiscussions / limit),
            hasMore: skip + parseInt(limit) < totalDiscussions, // Check if more data is available
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

export const updateDiscussion = async (req, res) => {
    const { title, description, tags, code, language } = req.body;
    const discussionId = req.params.id;
    try {
        const discussion = await discussionModel.findById(discussionId);
        if (title) discussion.title = title;
        if (description) discussion.description = description;
        if (tags) discussion.tags = tags;
        if (code) discussion.code = code;
        if (language) discussion.language = language;
        await discussion.save();
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

export const deleteDiscussion = async (req, res) => {
    const discussionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
        return res.status(400).json({ msg: "Invalid discussion ID" });
    }
    try {
        const discussion = await discussionModel.findByIdAndDelete(discussionId);
        if (!discussion) {
            return res.status(404).json({ msg: "Discussion not found" });
        }
        res.json({ msg: "Discussion deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

export const getDiscussionById = async (req, res) => {
    const discussionId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
        return res.status(400).json({ msg: "Invalid discussion ID" });
    }
    try {
        const discussion = await discussionModel.findById(discussionId).populate("user", "name email image");
        if (!discussion) {
            return res.status(404).json({ msg: "Discussion not found" });
        }
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

export const getDiscussionByUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const discussions = await discussionModel.find({ user: mongoose.Types.ObjectId(userId) })
            .populate("votes.upvotes", "name email image")
            .populate("votes.downvotes", "name email image")
            .populate("user", "name email image");
        if (!discussions || discussions.length === 0) {
            return res.status(404).json({ msg: "No discussions found for this user" });
        }
        res.json(discussions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};



// VOTE FOR DISCUSSION
export const VoteDiscussion = async (req, res) => {
    const discussionId = req.params.id;
    const { vote } = req.body;
    const userId = req.user.id;

    if (!["like", "dislike", "unlike", "undislike"].includes(vote)) {
        return res.status(400).json({ msg: "Invalid vote type!" });
    }

    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
        return res.status(400).json({ msg: "Invalid discussion ID" });
    }

    try {
        const discussion = await discussionModel.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ msg: "Discussion not found" });
        }

        if (vote === 'like') {
            if (discussion.votes.upvotes.includes(userId)) {
                return res.status(400).json({ msg: "you've already liked this discussion.." })
            }

            if (discussion.votes.downvotes.includes(userId)) {
                // Remove the downvote if user switches to like
                discussion.votes.downvotes = discussion.votes.downvotes.filter(
                    (user) => !user.equals(userId)
                );
            }

            discussion.votes.upvotes.push(userId);
        } else if (vote === 'unlike') {
            if (!discussion.votes.upvotes.includes(userId)) {
                return res.status(400).json({ msg: "You haven't liked this discussion yet." });
            }

            // Remove the upvote
            discussion.votes.upvotes = discussion.votes.upvotes.filter(
                (user) => !user.equals(userId)
            );
        } else if (vote === 'dislike') {
            if (discussion.votes.downvotes.includes(userId)) {
                return res.status(400).json({ msg: "you've already disliked this discussion.." })
            }

            if (discussion.votes.upvotes.includes(userId)) {
                // Remove the upvote if user switches to dislike
                discussion.votes.upvotes = discussion.votes.upvotes.filter(
                    (user) => !user.equals(userId)
                );
            }

            discussion.votes.downvotes.push(userId);
        } else if (vote === 'undislike') {
            if (!discussion.votes.downvotes.includes(userId)) {
                return res.status(400).json({ msg: "You haven't disliked this discussion yet." });
            }

            // Remove the downvote
            discussion.votes.downvotes = discussion.votes.downvotes.filter(
                (user) => !user.equals(userId)
            );
        }

        await discussion.save();
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}


// COMMENTS
export const addComments = async (req, res) => {
    const discussionId = req.params.id;
    const { commentText } = req.body;
    const userId = req.user.id;

    if (!commentText) {
        return res.status(400).json({ msg: "Comment text is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
        return res.status(400).json({ msg: "Invalid discussion ID" });
    }

    try {
        const discussion = await discussionModel.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ msg: "Discussion not found" });
        }

        const newComment = { user: userId, commentText };
        discussion.comments.push(newComment);
        await discussion.save();

        // Fetch discussion owner and commenter details
        const discussionOwner = await userModel.findById(discussion.user);
        const commenter = await userModel.findById(userId);

        if (discussionOwner && discussionOwner.email) {
            await sendEmail(
                discussionOwner.email,
                "New Comment on Your Discussion",
                commenter.name,  // Pass the commenter's name
                commenter.image,  // Pass the commenter's name
                commentText      // Pass the comment text
            );
        }
        
        res.json(discussion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


export const getComments = async (req, res) => {
    const discussionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
        return res.status(400).json({ msg: "Invalid discussion ID" });
    }

    try {
        const discussion = await discussionModel.findById(discussionId).populate("comments.user", "name email image");
        if (!discussion) {
            return res.status(404).json({ msg: "Discussion not found" });
        }
        res.json(discussion.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const deleteComments = async (req, res) => {
    const { discussionId, commentId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
        return res.status(400).json({ msg: "Invalid discussion ID" });
    }

    try {
        const discussion = await discussionModel.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ msg: "Discussion not found" });
        }

        const comment = await discussion.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ msg: "comment not found" });
        }

        if (!comment.user.equals(userId)) {
            return res.status(403).json({ msg: "you can only delete your own comment!" });
        }

        comment.remove();
        await discussion.save();
        res.json({ mdg: "Comment deleted successfully.." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const editComments = async (req, res) => {
    const { discussionId, commentId } = req.params;
    const userId = req.user.id;
    const { commentText } = req.body;

    if (!commentText) {
        return res.status(400).json({ msg: "comment text is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(discussionId)) {
        return res.status(400).json({ msg: "Invalid discussion ID" });
    }

    try {
        const discussion = await discussionModel.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ msg: "Discussion not found" });
        }

        const comment = await discussion.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ msg: "comment not found" });
        }

        if (!comment.user.equals(userId)) {
            return res.status(403).json({ msg: "you can only edit your own comment!" });
        }

        comment.commentText = commentText;
        await discussion.save();
        res.json({ mdg: "Comment updated successfully.." });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

