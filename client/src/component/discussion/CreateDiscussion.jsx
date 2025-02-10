import { useState } from "react";
import { createDiscussion } from '../../service/Service';
import { useNavigate } from 'react-router-dom';
import { predefinedTags } from '../../utils/PreTags';
import { showToast } from "../../utils/toastUtils";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { TextField, Button, Chip, CircularProgress, Box, Typography, Grid, Autocomplete } from '@mui/material';

const CreateDiscussion = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [code, setCode] = useState("");
  
  const navigate = useNavigate();

  const handleTagAdd = (event, newValue) => {
    if (!newValue || newValue === "") return;
    
    if (!predefinedTags.includes(newValue)) {
      showToast("You can only add predefined tags.", "error");
      return;
    }

    if (tags.length >= 3) {
      showToast("You cannot add more than 3 tags.", "error");
      return;
    }

    if (!tags.includes(newValue)) {
      setTags([...tags, newValue]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      code,
      tags,
    };

    try {
      await createDiscussion(formData);
      setLoading(false);
      e.target.title.value = "";
      e.target.description.value = "";
      setTags([]);
      setCode("");
      navigate("/");
      showToast("Discussion Created Successfully!", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error creating discussion:", error);
      showToast("Error creating discussion. Please try again.", "error");
    }
  };

  return (
    <Box sx={styles.container}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" sx={styles.heading}>Create Discussion</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Title" name="title" fullWidth required sx={styles.input} />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={predefinedTags.filter(tag => !tags.includes(tag))}
              onChange={handleTagAdd}
              renderInput={(params) => <TextField {...params} label="Tags" sx={styles.inputSmall} />}
            />
          </Grid>
        </Grid>
        <TextField label="Description" name="description" fullWidth required multiline rows={3} sx={styles.input} />
        <Typography sx={styles.label}>Code (optional)</Typography>
        <CodeMirror
          value={code}
          onChange={(value) => setCode(value)}
          extensions={[javascript()]}
          theme='dark'
          height="150px"
          style={styles.codeMirror}
        />
        <Box sx={styles.selectedTags}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} onDelete={() => handleTagRemove(tag)} sx={styles.chip} />
          ))}
        </Box>
        <Button type="submit" variant="contained" color="primary" disabled={loading} sx={styles.submitButton}>
          {loading ? <CircularProgress size={20} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

const styles = {
  container: { maxWidth: 600, margin: "auto", padding: 3 },
  heading: { marginBottom: 2 },
  input: { marginBottom: 2 },
  inputSmall: { marginBottom: 2, width: '100%' },
  label: { marginTop: 2, marginBottom: 1, fontWeight: 'bold' },
  codeMirror: { borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px' },
  selectedTags: { marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 1 },
  chip: { cursor: 'pointer', height: '30px' },
  submitButton: { marginTop: 2, width: '100%', height: '40px' }
};

export default CreateDiscussion;
