import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import { predefinedTags } from "../../utils/PreTags";

const TagSelector = ({ tags, setTags }) => {
  const handleTagAdd = (_, newValue) => {
    if (!newValue || newValue.trim() === "") return;

    const formattedValue = newValue.trim().toLowerCase();

    if (tags.length >= 3) {
      alert("You cannot add more than 3 tags."); // Replace with showToast if you have one
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

  return (
    <Box sx={styles.container}>
      {/* Autocomplete for predefined tags */}
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
    </Box>
  );
};

export default TagSelector;

const styles = {
  container: { width: "100%", mt: 2 },
  input: { width: "100%" },
  selectedTags: { display: "flex", flexWrap: "wrap", gap: 1, mt: 1 },
  chip: { backgroundColor: "#2196f3", color: "#fff" },
};
