import { useState } from "react";
import { Skeleton, Typography, Box, Grid, Paper, Button } from "@mui/material";
import { useAuth } from "../../contex/AuthContex";
import Discussion from "./Discussion";
import DynamicAvatar from '../../utils/DynamicAvatar';
import EditProfile from "./EditProfile";

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box sx={styles.profileContainer}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={styles.paper}>
            <Grid container spacing={2} alignItems="center">
              {/* Profile Picture */}
              <Grid item xs={12} sm={2} display="flex" justifyContent="center">
                {isLoading ? (
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    sx={styles.skeletonAvatar}
                  />
                ) : (
                  <DynamicAvatar text={user || "U"} />
                )}
              </Grid>

              {/* User Info */}
              <Grid item xs={12} sm={7}>
                {isLoading ? (
                  <>
                    <Skeleton width="70%" height={30} />
                    <Skeleton width="90%" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" sx={styles.userName}>
                      {user?.name.toUpperCase()}
                      {/* Edit Profile Button */}
                      {!isEditing && (
                        <Button
                          color="warning"
                          sx={styles.editButton}
                          onClick={handleEditToggle}
                        >
                          ✍️
                        </Button>
                      )}
                    </Typography>

                    <Typography variant="body2" sx={styles.email} color="textSecondary">
                      {user?.email}
                    </Typography>
                  </>
                )}
              </Grid>

              {/* Timestamps */}
              <Grid item xs={12} sm={3} textAlign={{ xs: "center", sm: "right" }}>
                {isLoading ? (
                  <>
                    <Skeleton width="80%" height={20} />
                    <Skeleton width="80%" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Created At:</strong>{" "}
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                      <strong>Updated At:</strong>{" "}
                      {new Date(user?.updatedAt).toLocaleDateString()}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Edit Profile Component */}
        {isEditing && (
            <EditProfile user={user} setIsEditing={setIsEditing} />
        )}

        {/* Discussions Section */}
        {!isEditing && (
          <Grid item xs={12} md={8}>
            <Discussion />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

// Styles
const styles = {
  profileContainer: {
    mt: 3,
    px: 2,
  },
  paper: {
    p: 3,
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  skeletonAvatar: {
    borderRadius: "50%",
  },
  userName: {
    fontWeight: "bold",
    mb: 0.5,
    marginLeft: "30px"
  },
  email: {
    mb: 0.5,
    marginLeft: "30px"
  },
  editButton: {
    mt: 2,
  },
};

export default Profile;