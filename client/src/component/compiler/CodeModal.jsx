import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import TagSelector from "../common/TagSelector";
import useCreateDiscussion from "../../hooks/useCreateDiscussion"; // Import the hook
import { useAuth } from "../../contex/AuthContex"; // Import Auth Context

const CodeModal = ({ language, error, open, onClose, code }) => {
  const { handleSubmit, loading } = useCreateDiscussion();
  const { isAuth } = useAuth(); // Get auth state
  const navigate = useNavigate(); // For redirection

  const getDefaultTitle = (error) => {
    if (error.toLowerCase().includes("syntax")) return "Syntax Error in Code";
    if (error.toLowerCase().includes("reference")) return "Reference Error Issue";
    if (error.toLowerCase().includes("type")) return "Type Error Problem";
    return "Unknown Error in Code";
  };

  const getDefaultDescription = (error) => {
    return `I'm facing this issue: "${error}". Please help me resolve this.`;
  };

  const [showInputs, setShowInputs] = useState(false);
  const [title, setTitle] = useState(getDefaultTitle(error));
  const [description, setDescription] = useState(getDefaultDescription(error));
  const [tags, setTags] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleConfirm = () => {
    if (!isAuth) {
      toast.warning("You must be logged in to raise an issue!");
      navigate("/auth"); // Redirect to auth page
      return;
    }
    setShowInputs(true);
  };

  const handleUpload = async () => {
    setUploading(true);

    const formData = {
      title,
      description,
      tags,
      code,
      language,
    };

    await handleSubmit(formData, () => {
      setUploading(false);
      setShowInputs(false); // Reset UI
      onClose(); // Close Modal
      toast.success("Issue raised successfully!");
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalBox}>
        <Typography variant="h6" gutterBottom color="error">
          Compilation Error in {language}
        </Typography>

        <Box sx={styles.errorBox}>
          <Typography color="error">{error}</Typography>
        </Box>

        {!showInputs ? (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Have you faced this error in {language} before?
              Would you like to upload this issue to DevDiscuss for help?
            </Typography>
            <Box sx={styles.buttonContainer}>
              <Button variant="outlined" onClick={onClose}>
                No, Close
              </Button>
              <Button variant="contained" color="primary" onClick={handleConfirm}>
                Yes, Upload
              </Button>
            </Box>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              margin="dense"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="dense"
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TagSelector tags={tags} setTags={setTags} />

            <Box sx={styles.buttonContainer}>
              <Button variant="outlined" onClick={onClose} disabled={uploading}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Upload"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CodeModal;

const styles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  errorBox: {
    bgcolor: "#ffebee",
    p: 2,
    borderRadius: 1,
    mb: 2,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
  },
};
