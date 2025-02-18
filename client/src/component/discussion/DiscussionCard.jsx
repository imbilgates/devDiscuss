import { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Chip, Box, Avatar, Divider, IconButton, Stack } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { PlayArrow, RestartAlt } from '@mui/icons-material';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';

import DynamicAvatar from '../../utils/DynamicAvatar';
import { timeAgo } from '../../utils/timeAgo';
import useAddComment from '../../hooks/useAddComment';
import Comment from '../Comment/Comment';
import { showToast } from '../../utils/toastUtils';
import { runCode as apiRunCode } from '../../utils/Api';
import { languageExtensions } from '../../utils/Language'


const DiscussionCard = ({ discussion, handleVote, errorMessages, currentUserId }) => {
  const [output, setOutput] = useState([]);
  const [showPostButton, setShowPostButton] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const { handleCommentSubmit, loading, setCommentText, commentText } = useAddComment();

  useEffect(() => {
    setShowPostButton(output.length > 0);
    setSelectedLanguage(discussion.language)
  }, [discussion.code, output, discussion.language]);

  const runCode = async () => {
    const response = await apiRunCode(selectedLanguage, commentText || discussion.code);
    setOutput(response.stdout ? response.stdout.split("\n") : [response.stderr || "Error executing code"]);
  };

  const resetCode = () => {
    setCommentText("");
    setOutput([]);
  };

  const handlePost = async () => {
    if (commentText) {
      await handleCommentSubmit(discussion._id, discussion.code);
      setShowPostButton(false);
      showToast("Answer Posted Successfully!", "success");
    } else {
      showToast("You Must Change Something!", "error");
    }
  };

  return (
    <Card key={discussion._id} sx={styles.card}>
      <CardContent>
        <Box sx={styles.header}>
          <Box sx={styles.avatarSection}>
            {discussion.user?.image ? (
              <Avatar src={discussion.user.image} sx={styles.avatar} />
            ) : (
              <DynamicAvatar firstLetter={discussion.user?.name?.charAt(0).toUpperCase() || 'U'} />
            )}
            <Box>
              <Typography variant="h6">{discussion.user?.name.toUpperCase() || 'Anonymous User'}</Typography>
              <Typography variant="body2" color="textSecondary">
                {timeAgo(discussion.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Box>
            {discussion.tags.length === 0 ? (
              <Typography variant="body2" color="textSecondary">Not Available</Typography>
            ) : (
              discussion.tags.map((tag, index) => (
                <Chip key={index} label={`#${tag}`} color="primary" sx={styles.tags} />
              ))
            )}
          </Box>
        </Box>

        <Typography variant="h5" sx={styles.title}>{discussion.title}</Typography>
        <Typography variant="body1" sx={styles.description}>{discussion.description}</Typography>

        <CardActions sx={{ marginRight: "20px" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              ...styles.button,
              ...(discussion.votes.upvotes.includes(currentUserId) ? styles.activeButton : {}),
            }}
            onClick={() => handleVote(discussion._id, 'like')}
          >
            <ThumbUpAltTwoToneIcon /> {discussion.votes.upvotes.length || 0}
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="error"
            sx={{
              ...styles.button,
              ...(discussion.votes.downvotes.includes(currentUserId) ? styles.activeButton : {}),
              backgroundColor: discussion.votes.downvotes.includes(currentUserId)
                ? 'rgba(255, 0, 0, 0.36)'
                : 'inherit',
            }}
            onClick={() => handleVote(discussion._id, 'dislike')}
          >
            <ThumbDownOffAltTwoToneIcon /> {discussion.votes.downvotes.length || 0}
          </Button>


          <Stack direction="row" spacing={1}>
            {Object.keys(languageExtensions).map((lang) => (
              <Chip
                key={lang}
                label={lang.toUpperCase()}
                onClick={() => setSelectedLanguage(lang)}
                color={(discussion.language) === lang ? 'primary' : ''}
                style={{
                  backgroundColor: (selectedLanguage || discussion.language) === lang && (selectedLanguage === lang || !selectedLanguage) ? '#4caf50' : '', // Green color for discussion.language or selected language
                  color: (selectedLanguage || discussion.language) === lang && (selectedLanguage === lang || !selectedLanguage) ? '#fff' : '', // White text color
                }}
                clickable
              />
            ))}
          </Stack>


        </CardActions>

        <Box sx={styles.splitScreen}>
          <Box sx={styles.codeEditor}>

            <Box sx={styles.runButtonContainer}>
              <IconButton onClick={runCode} sx={styles.runButton}>
                <PlayArrow />
              </IconButton>
              <IconButton onClick={resetCode} sx={styles.resetButton}>
                <RestartAlt />
              </IconButton>
            </Box>

            <CodeMirror
              value={commentText || discussion.code}
              onChange={(value) => setCommentText(value)}
              extensions={[languageExtensions[selectedLanguage] || languageExtensions['javascript']]}  // Corrected code here
              theme="dark"
              height="150px"
              style={{ borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px' }}
            />

          </Box>
          <Box sx={styles.outputPanel}>
            <strong style={{ color: '#fff' }}>Output:</strong>
            <pre style={{ color: '#fff' }}>{output.length > 0 ? output.join('\n') : 'No output'}</pre>
          </Box>
        </Box>
        <Divider />


      </CardContent>
      <CardActions sx={styles.actions}>
        <Comment id={discussion._id} flag={loading} />
        {showPostButton && (
          <Button variant="outlined" color="success" onClick={handlePost} disabled={loading}>
            {loading ? 'Posting...' : 'Post'}
          </Button>
        )}
      </CardActions>
      {errorMessages[discussion._id] && (
        <Typography variant="body2" color="error" sx={styles.errorText}>
          {errorMessages[discussion._id]}
        </Typography>
      )}
    </Card>
  );
};

export default DiscussionCard;


const styles = {
  card: {
    margin: '16px 0',
    padding: '16px',
    borderRadius: 8,
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '12px',
    width: 40,
    height: 40,
  },
  tags: {
    margin: '2px',
    fontSize: '0.85rem',
  },
  title: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  description: {
    marginBottom: '16px',
    color: 'text.primary',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    padding: '16px 0',
    marginLeft: '20px'
  },
  button: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textTransform: 'none',
  },
  activeButton: {
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
    borderColor: 'green',
  },
  answerButton: {
    border: '1px solid',
    textTransform: 'none',
    padding: '5px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  errorText: {
    marginTop: '8px',
    textAlign: 'center',
  },
  commentSection: {
    paddingTop: '8px',
  },
  container: { marginTop: 2 },
  error: { color: 'red', marginBottom: 1 },
  splitScreen: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    flexWrap: "nowrap",  // Prevent wrapping
  },
  codeEditor: {
    position: "relative",
    flex: "3", // Larger width for editor
  },
  runButtonContainer: {
    position: "absolute",
    top: "8px",
    right: "3px",
    zIndex: 10,
  },
  runButton: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": { backgroundColor: "#125ea3" },
  },
  resetButtonContainer: {
    position: "absolute",
    top: "8px",
    right: "50px",
    zIndex: 10,
  },
  resetButton: {
    color: "#fff"
  },
  outputPanel: {
    flex: "1", // Smaller width for output
    background: "#282C34",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    height: "150px",
    overflowY: "auto",
    minWidth: "200px", // Adjust for a compact view
  },
  buttonContainer: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    marginTop: "16px",
  },
};


