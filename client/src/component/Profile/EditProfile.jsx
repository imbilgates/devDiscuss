import React, { useState } from "react";
import { TextField, Button, Box, Avatar, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfile } from "../../service/Service";

const EditProfile = ({ user, setIsEditing }) => {
    const [name, setName] = useState(user?.name || "");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file && file.type.startsWith("image/")) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "devDiscuss-profile");  // Unsigned preset
            formData.append("cloud_name", "dxojknmwl");
    
            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dxojknmwl/image/upload", {
                    method: "POST",
                    body: formData,
                });
                
                if (!response.ok) {
                    throw new Error("Error uploading image");
                }
                
                const data = await response.json();
                setImage(data.secure_url);  // Store the image URL in state
            } catch (error) {
                setError("Error uploading image. Please try again.");
            }
        } else {
            setError("Please select a valid image.");
        }
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
            const response = await updateProfile(updatedData);
            setMessage("Profile updated successfully!");
        } catch (error) {
            setError("Error updating profile. Please try again.");
        }
    };
    

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" gutterBottom>
                    Edit Profile
                </Typography>
                <IconButton onClick={() => setIsEditing(false)} color="default">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Button
                    variant="outlined"
                    component="label"
                    sx={{
                        backgroundColor: "#f0f0f0",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#ddd" },
                    }}
                >
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>

                {image && (
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "8px",  // Square shape with rounded corners
                            objectFit: "cover",
                            border: "2px solid #fff",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            marginLeft: 2,
                        }}
                        src={image}
                    />
                )}
            </Box>

            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            {error && <Typography color="error">{error}</Typography>}
            {message && <Typography color="success.main">{message}</Typography>}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Update Profile
            </Button>
        </Box>
    );
};

export default EditProfile;
