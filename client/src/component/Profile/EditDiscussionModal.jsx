import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Chip,
    Box,
} from "@mui/material";
import { languageExtensions } from '../../utils/Language';
import CodeMirror from "@uiw/react-codemirror";

const EditDiscussionModal = ({ open, onClose, discussion, onSave, tags, setDiscussion }) => {
    if (!discussion) return null;

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setDiscussion({
            ...discussion,
            language: selectedLanguage,
            code: "", // Optionally reset the code when language changes
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Discussion</DialogTitle>
            <DialogContent>
                {/* Flexbox wrapper for Title & Tags */}
                <div style={styles.row}>
                    <TextField
                        label="Title"
                        value={discussion.title}
                        onChange={(e) => setDiscussion({ ...discussion, title: e.target.value })}
                        fullWidth
                        margin="dense"
                        style={styles.flexItem}
                    />
                    <FormControl margin="dense" style={styles.tagsContainer}>
                        <InputLabel>Tags</InputLabel>
                        <Select
                            multiple
                            value={discussion.tags || []} // Ensure it's always an array
                            onChange={(e) => setDiscussion({ ...discussion, tags: e.target.value })}
                        >
                            {[...tags].map((tag) => (
                                <MenuItem key={tag} value={tag}>
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                            {discussion.tags.length === 0 ? "Select at least one tag" : ""}
                        </FormHelperText>
                    </FormControl>
                </div>

                <TextField
                    label="Description"
                    value={discussion.description}
                    onChange={(e) => setDiscussion({ ...discussion, description: e.target.value })}
                    fullWidth
                    margin="dense"
                    multiline
                    rows={3}
                />
                
                {/* Language Selection and Chip */}
                <Box display="flex" alignItems="center" gap="8px" marginTop="16px">
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Language</InputLabel>
                        <Select
                            value={discussion.language || ''}
                            onChange={handleLanguageChange}
                            label="Language"
                        >
                            <MenuItem value="javascript">JavaScript</MenuItem>
                            <MenuItem value="python">Python</MenuItem>
                            <MenuItem value="java">Java</MenuItem>
                            {/* Add more languages here */}
                        </Select>
                    </FormControl>

                    {discussion.language && (
                        <Chip
                            label={discussion.language.charAt(0).toUpperCase() + discussion.language.slice(1)}
                            color="primary"
                        />
                    )}
                </Box>

                {/* Code Editor */}
                <CodeMirror
                    value={discussion.code}
                    onChange={(value) => setDiscussion({ ...discussion, code: value })}
                    extensions={[languageExtensions[discussion.language || 'javascript']]}
                    theme="dark"
                    height="150px"
                    style={styles.codeMirror}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => onSave(discussion._id)} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const styles = {
    row: {
        display: "flex",
        gap: "16px",
        alignItems: "center",
    },
    flexItem: {
        flex: 1,
    },
    tagsContainer: {
        width: "200px",
    },
    codeMirror: {
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
};

export default EditDiscussionModal;
