import { useState } from "react";
import { createDiscussion } from '../../service/Service';
import { useNavigate } from 'react-router-dom';
import { predefinedTags } from '../../utils/PreTags';
import { showToast } from "../../utils/toastUtils";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { TextField, Button, Chip, CircularProgress, Box, Typography, Autocomplete, FormControl, Select, MenuItem } from '@mui/material';
import { languageExtensions } from '../../utils/Language'

const CreateDiscussion = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const navigate = useNavigate();

  const handleTagAdd = (event, newValue) => {
    if (!newValue || newValue.trim() === "") return;

    const formattedValue = newValue.trim().toLowerCase();

    if (tags.length >= 3) {
      showToast("You cannot add more than 3 tags.", "error");
      return;
    }

    if (!tags.includes(formattedValue)) {
      setTags([...tags, formattedValue]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTagAdd(null, event.target.value);
      event.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      code,
      tags,
      language: selectedLanguage
    };

    try {
      await createDiscussion(formData);
      setLoading(false);
      e.target.title.value = "";
      e.target.description.value = "";
      setTags([]);
      setCode("");
      setSelectedLanguage("");
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
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Left Side: Input Fields */}
        <Box sx={styles.leftPanel}>
          <Typography variant="h5" sx={styles.heading}>Create Discussion</Typography>
          <TextField label="Title" name="title" fullWidth required sx={styles.input} />
          <TextField label="Description" name="description" fullWidth required multiline rows={3} sx={styles.input} />

          <Autocomplete
            freeSolo
            options={predefinedTags.filter(tag => !tags.includes(tag))}
            onChange={handleTagAdd}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Tags (Press Enter to Add Custom Tag)" 
                onKeyDown={handleKeyDown} 
                sx={styles.input} 
              />
            )}
          />

          {/* Selected Tags */}
          <Box sx={styles.selectedTags}>
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} onDelete={() => handleTagRemove(tag)} sx={styles.chip} />
            ))}
          </Box>

          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={styles.submitButton}>
            {loading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
        </Box>

        {/* Right Side: Code Editor (Shown Only If Language Is Selected) */}
        <Box sx={styles.rightPanel}>
          <FormControl fullWidth sx={styles.languageSelect}>
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              displayEmpty
              renderValue={(selected) => selected || "Select Language"}
            >
              {Object.keys(languageExtensions).map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang?.toLocaleUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Show Code Editor Only If a Language Is Selected */}
          {selectedLanguage && (
            <CodeMirror
              value={code}
              onChange={(value) => setCode(value)}
              extensions={[javascript()]}  
              theme="dark"
              height="180px"
              style={styles.codeMirror}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: "12px",
    boxShadow: "0px 6px 16px rgb(0, 0, 0)",
  },
  form: {
    display: "flex",
    width: "100%",
    gap: "20px",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    fontWeight: 600,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: "6px",
  },
  selectedTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  chip: {
    backgroundColor: "#6200ea",
    color: "#fff",
    fontWeight: "bold",
    padding: "5px",
    height: "30px",
  },
  submitButton: {
    marginTop: "10px",
    backgroundColor: "#6200ea",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  languageSelect: {
    minWidth: "120px",
    marginBottom: "10px",
  },
  codeMirror: {
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
};

export default CreateDiscussion;
