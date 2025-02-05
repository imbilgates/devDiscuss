import { useState } from "react";
import { TextField, Button, Box, Avatar, Typography, IconButton, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfile } from "../../service/Service";
import { showToast } from "../../utils/toastUtils";

const EditProfile = ({ user, setIsEditing }) => {
    const [name, setName] = useState(user?.name || "");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [dragOver, setDragOver] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        await processImage(file);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        await processImage(file);
    };

    const processImage = async (file) => {
        if (!file) return;
        if (file && file.type.startsWith("image/")) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "devDiscuss-profile"); // Unsigned preset
            formData.append("cloud_name", "dxojknmwl");

            try {
                const response = await fetch(import.meta.env.VITE_CLOUDINARY_ID, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Error uploading image");
                }

                const data = await response.json();
                setImage(data.secure_url); // Store the image URL in state
            } catch (error) {
                setError("Error uploading image. Please try again." + error);
            }
        } else {
            setError("Please select a valid image.");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const updatedData = {
            name,
            image: image || user?.image,
        };

        try {
            await updateProfile(updatedData);
            setMessage("Profile updated successfully!");
            setIsEditing(false); // Close the dialog after successful update
            showToast("Profile updated successfully!", "success")
        } catch (error) {
            setError("Error updating profile. Please try again." + error);
            showToast("Error updating profile. Please try again.", "error")
        }
    };

    return (
        <Dialog open={true} onClose={() => setIsEditing(false)} fullWidth maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={styles.formContainer}>
                <Box sx={styles.header}>
                    <Typography variant="h5" fontWeight="bold">
                        Edit Profile
                    </Typography>
                    <IconButton onClick={() => setIsEditing(false)} sx={styles.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Show image preview if an image is selected */}
                {image ? (
                    <Box sx={styles.imagePreviewContainer}>
                        <Avatar sx={styles.previewImage} src={image} />
                        <IconButton sx={styles.closeImageButton} onClick={() => setImage(null)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Box
                        sx={styles.dropArea(dragOver)}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        component="label" // Make the drop area clickable
                    >
                        <Typography color="text.secondary">
                            Drag and drop an image here, or click to upload.
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Box>
                )}

                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={styles.textField}
                />

                {error && <Typography sx={styles.errorText}>{error}</Typography>}
                {message && <Typography sx={styles.successText}>{message}</Typography>}

                <Button type="submit" fullWidth variant="contained" sx={styles.submitButton}>
                    Update Profile
                </Button>
            </Box>
        </Dialog>
    );
};

export default EditProfile;


const styles = {
    formContainer: {
        mt: 3,
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
    },
    closeButton: {
        backgroundColor: "#f5f5f5",
        "&:hover": { backgroundColor: "#e0e0e0" },
    },
    dropArea: (dragOver) => ({
        textAlign: "center",
        p: 3,
        border: "2px dashed #ddd",
        borderRadius: 2,
        cursor: "pointer",
        backgroundColor: dragOver ? "#f9f9ff" : "transparent",
        transition: "background-color 0.3s",
    }),
    imagePreviewContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        mb: 2,
    },
    previewImage: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        border: "2px solid #3f51b5",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    closeImageButton: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        "&:hover": { backgroundColor: "rgba(0, 255, 85, 0.9)" },
        marginRight: "210px"
    },
    textField: {
        "& .MuiInputLabel-root": { fontWeight: 500 },
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": { borderColor: "#ccc" },
            "&:hover fieldset": { borderColor: "#3f51b5" },
            "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
        },
    },
    errorText: {
        color: "error.main",
        fontSize: "0.875rem",
        mt: 1,
    },
    successText: {
        color: "success.main",
        fontSize: "0.875rem",
        mt: 1,
    },
    submitButton: {
        mt: 3,
        py: 1.5,
        fontWeight: "bold",
        backgroundColor: "#3f51b5",
        "&:hover": {
            backgroundColor: "#32408f",
        },
    },
};
