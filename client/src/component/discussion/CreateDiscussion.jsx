import { TextField, Button, CircularProgress, Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { languageExtensions } from "../../utils/Language";
import CodeMirror from "@uiw/react-codemirror";
import TagSelector from "../common/TagSelector";
import useCreateDiscussion from "../../hooks/useCreateDiscussion"; // Import the hook

const CreateDiscussion = () => {
  const { 
    loading, 
    tags, setTags, 
    code, setCode, 
    selectedLanguage, setSelectedLanguage, 
    handleSubmit 
  } = useCreateDiscussion();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      code,
      tags,
      language: selectedLanguage,
    };

    handleSubmit(formData, () => {
      e.target.title.value = "";
      e.target.description.value = "";
      setTags([]);
      setCode("");
      setSelectedLanguage("");
    });
  };

  return (
    <Box sx={styles.container}>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        {/* Left Panel */}
        <Box sx={styles.leftPanel}>
          <Typography variant="h5" sx={styles.heading}>Create Discussion</Typography>
          <TextField label="Title" name="title" fullWidth required sx={styles.input} />
          <TextField label="Description" name="description" fullWidth required multiline rows={3} sx={styles.input} />
          
          {/* Tag Selector Component */}
          <TagSelector tags={tags} setTags={setTags} />

          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={styles.submitButton}>
            {loading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
        </Box>

        {/* Right Panel */}
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
                  {lang?.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Show Code Editor Only If a Language Is Selected */}
          {selectedLanguage && (
            <CodeMirror
              value={code}
              onChange={(value) => setCode(value)}
              extensions={[languageExtensions[selectedLanguage]]}
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

export default CreateDiscussion;

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
