## DEPLOYED LINK
Render: https://devdiscuss.onrender.com


## Abstract

### Title
DevDiscuss: A Collaborative Problem-Solving Platform

### Objective
To create a web-based platform for developers, students, and tech enthusiasts to post technical questions and receive solutions collaboratively.

### Features
- **User Authentication:** Secure registration and login.
- **Post Questions:** Create discussions with tags.
- **Commenting:** Add, edit, and delete comments on discussions.
- **Voting System:** Upvote or downvote questions and comments.
- **Search and Filter:** Search discussions by tags or keywords.
- **Reputation System:** Reward active participants.

---

## Tech Stack
- **Frontend:** React, Material-UI
- **Backend:** Node.js with Express.js or Spring Boot
- **Database:** SQLite
- **Hosting:** Netlify/Vercel (Frontend) and Heroku/Render (Backend)

---

This document provides an overview of the available API endpoints and features of the DevDiscuss platform.

---

# API Documentation for DevDiscuss

This document outlines the API endpoints for the DevDiscuss platform, designed for collaborative problem-solving and knowledge sharing. Each section is categorized based on functionality.

---

## DISCUSSIONS

### 1. List All Discussions
**Endpoint:** `GET /discussion`

**Description:**
Fetches all discussions available on the platform.

**Response:**
- `200 OK`: List of discussions.

### 2. Get Discussion by ID
**Endpoint:** `GET /discussion/:id`

**Description:**
Fetches details of a specific discussion by its ID.

**Parameters:**
- `id` (Path): ID of the discussion.

**Response:**
- `200 OK`: Discussion details.

### 3. Create Discussion
**Endpoint:** `POST /discussion/create`

**Description:**
Creates a new discussion.

**Body:**
```json
{
  "title": "Discussion Title",
  "content": "Discussion content",
  "tags": ["tag1", "tag2"]
}
```

**Response:**
- `201 Created`: Newly created discussion.

### 4. Update Discussion
**Endpoint:** `PUT /discussion/update/:id`

**Description:**
Updates an existing discussion.

**Parameters:**
- `id` (Path): ID of the discussion to update.

**Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["newtag"]
}
```

**Response:**
- `200 OK`: Updated discussion.

### 5. Delete Discussion
**Endpoint:** `DELETE /discussion/delete/:id`

**Description:**
Deletes a discussion by its ID.

**Parameters:**
- `id` (Path): ID of the discussion to delete.

**Response:**
- `200 OK`: Confirmation of deletion.

---

## VOTING

### 1. Vote on Discussion
**Endpoint:** `POST /discussion/:id/vote`

**Description:**
Submits a vote (upvote/downvote) for a discussion.

**Parameters:**
- `id` (Path): ID of the discussion.

**Body:**
```json
{
  "voteType": "upvote" // or "downvote"
}
```

**Response:**
- `200 OK`: Updated vote count.

---

## COMMENTS

### 1. Add Comment
**Endpoint:** `POST /discussion/:id/comments`

**Description:**
Adds a comment to a discussion.

**Parameters:**
- `id` (Path): ID of the discussion.

**Body:**
```json
{
  "commentText": "This is a comment."
}
```

**Response:**
- `201 Created`: Newly added comment.

### 2. Get Comments
**Endpoint:** `GET /discussion/:id/comments`

**Description:**
Fetches all comments for a specific discussion.

**Parameters:**
- `id` (Path): ID of the discussion.

**Response:**
- `200 OK`: List of comments.

### 3. Delete Comment
**Endpoint:** `DELETE /discussion/:discussionId/comments/:commentId`

**Description:**
Deletes a specific comment.

**Parameters:**
- `discussionId` (Path): ID of the discussion.
- `commentId` (Path): ID of the comment.

**Response:**
- `200 OK`: Confirmation of deletion.

### 4. Edit Comment
**Endpoint:** `PUT /discussion/:discussionId/comments/:commentId`

**Description:**
Edits an existing comment.

**Parameters:**
- `discussionId` (Path): ID of the discussion.
- `commentId` (Path): ID of the comment.

**Body:**
```json
{
  "commentText": "Updated comment text."
}
```

**Response:**
- `200 OK`: Updated comment.

---

## AUTHENTICATION

### 1. Register User
**Endpoint:** `POST /auth/register`

**Description:**
Registers a new user.

**Body:**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
- `201 Created`: User registration successful.

### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:**
Logs in a user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
- `200 OK`: Authentication token and user data.

### 3. Get Authenticated User
**Endpoint:** `GET /auth/`

**Description:**
Fetches details of the currently authenticated user.

**Response:**
- `200 OK`: Authenticated user details.

### 4. List All Users
**Endpoint:** `GET /auth/users`

**Description:**
Fetches a list of all registered users. Requires authentication.

**Response:**
- `200 OK`: List of users.

---
