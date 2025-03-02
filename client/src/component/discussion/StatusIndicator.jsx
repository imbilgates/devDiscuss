import { Box, Typography } from "@mui/material";

const StatusIndicator = ({ status }) => {
  const colors = {
    answered: "#14FF08",
    notAnswered: "red",
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: colors[status],
        }}
      />
      <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary" }}>
        {status === "answered" ? "Answered" : "Not Answered"}
      </Typography>
    </Box>
  );
};

export default StatusIndicator;
