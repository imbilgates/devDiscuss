import React from "react";
import { Skeleton, Typography, Box, Grid, Paper } from "@mui/material";

import { useAuth } from "../../contex/AuthContex";
import Discussion from "./Discussion";
import DynamicAvatar from '../../utils/DynamicAvatar'

const Profile = () => {
  const { user, isLoading } = useAuth();

  const getInitials = (user) => user?.name?.charAt(0).toUpperCase();

  return (
    <Box sx={{ mt: 3, px: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: "8px" }}>
            <Grid container spacing={2} alignItems="center">
              {/* Profile Picture */}
              <Grid item xs={12} sm={3} display="flex" justifyContent="center">
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={80}
                    sx={{ borderRadius: "4px" }}
                  />
                ) : (
                  <DynamicAvatar firstLetter={getInitials(user) || "U"} variant="rounded" />
                )}
              </Grid>

              {/* User Info */}
              <Grid item xs={12} sm={6}>
                {isLoading ? (
                  <>
                    <Skeleton width="70%" height={30} />
                    <Skeleton width="90%" height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h5" gutterBottom>
                      {user?.name.toUpperCase()}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
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

        {/* Discussions Section */}
        <Grid item xs={12} md={8}>
          <Discussion />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
