import { Box, Button, Typography } from "@mui/material";

const PaginationControls = ({ page, totalPages, onPageChange }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      sx={{ mt: 4, gap: 2 }}
    >
      <Button 
        variant="contained" 
        sx={{ 
          px: 3, 
          py: 1, 
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
          borderRadius: "10px"
        }} 
        disabled={page === 1} 
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>

      <Typography 
        variant="h6" 
        sx={{ fontWeight: "bold", color: "text.primary" }}
      >
        PAGE {page} OF {totalPages}
      </Typography>

      <Button 
        variant="contained" 
        sx={{ 
          px: 3, 
          py: 1, 
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
          borderRadius: "10px"
        }} 
        disabled={page >= totalPages} 
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
