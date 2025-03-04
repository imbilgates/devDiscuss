import { toast } from "react-toastify";
import { Box, LinearProgress, Typography } from "@mui/material";

export const showUploadProgress = (onComplete) => {
  let progress = 0;

  const toastId = toast.info(
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="body2" fontWeight={600} color="primary">
        Uploading...
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 6, borderRadius: 3, mt: 1, bgcolor: "#e0e0e0" }}
      />
    </Box>,
    {
      autoClose: false,
      closeButton: false,
      position: "top-right",
    }
  );

  const updateProgress = () => {
    if (progress >= 100) {
      toast.dismiss(toastId); // Just close the toast, no "Completed" message

      if (onComplete) {
        setTimeout(onComplete, 500); // Ensure UI updates smoothly
      }
      return;
    }

    progress += Math.random() * 25 + 10; // Faster at start, slows down near the end
    if (progress > 100) progress = 100;

    toast.update(toastId, {
      render: (
        <Box sx={{ width: "100%", p: 2 }}>
          <Typography variant="body2" fontWeight={600} color="primary">
            Uploading... {progress.toFixed(0)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              mt: 1,
              transition: "width 0.2s ease-in-out",
              bgcolor: "#e0e0e0",
            }}
          />
        </Box>
      ),
    });

    setTimeout(updateProgress, Math.random() * 300 + 200); // Dynamic speed for realism
  };

  updateProgress(); // Start progress
};
