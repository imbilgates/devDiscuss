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
} from "@mui/material";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";

const EditDiscussionModal = ({ open, onClose, discussion, onSave, tags, setDiscussion }) => {
    if (!discussion) return null;

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
                <CodeMirror
                    value={discussion.code}
                    onChange={(value) => setDiscussion({ ...discussion, code: value })}
                    extensions={[javascript()]}
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
