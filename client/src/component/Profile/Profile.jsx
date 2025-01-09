import React from "react";
import { Avatar, Skeleton, Typography } from "@mui/material";
import { useAuth } from "../../contex/AuthContex";
import Discussion from "./Discussion";

const Profile = () => {
  const { user, isLoading } = useAuth();

  const getInitials = (user) => user?.name?.charAt(0).toUpperCase();

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm p-3">
            <div className="d-flex align-items-center">
              {/* Left Section: Profile Picture */}
              <div className="me-3">
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={80}
                    style={{ borderRadius: "4px" }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 80,
                      height: 80,
                      fontSize: 32,
                      borderRadius: "4px", // Makes it square
                    }}
                  >
                    {getInitials(user)}
                  </Avatar>
                )}
              </div>

              {/* Middle Section: User Info */}
              <div>
                {isLoading ? (
                  <>
                    <Skeleton width={120} height={30} />
                    <Skeleton width={150} height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="h5" className="mb-1">
                      {user.name}
                    </Typography>
                    <Typography variant="body1" className="text-muted">
                      {user.email}
                    </Typography>
                  </>
                )}
              </div>

              {/* Right Section: Timestamps */}
              <div className="ms-auto text-end">
                {isLoading ? (
                  <>
                    <Skeleton width={180} height={20} />
                    <Skeleton width={180} height={20} />
                  </>
                ) : (
                  <>
                    <Typography variant="body2" className="text-muted">
                      <strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" className="text-muted mt-1">
                      <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleDateString()}
                    </Typography>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Discussion />
      </div>
    </div>
  );
};

export default Profile;
