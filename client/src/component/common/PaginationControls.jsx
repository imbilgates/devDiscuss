import { Box, Button, Typography } from "@mui/material";

const PaginationControls = ({ page, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = new Set();
    pages.add(1);
    if (page > 2) pages.add(page - 1);
    pages.add(page);
    if (page < totalPages - 1) pages.add(page + 1);
    pages.add(totalPages);
    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      sx={{ mt: 4, gap: 1, flexWrap: "wrap" }}
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

      {getPageNumbers().map((p, index, arr) => (
        <Box key={p} display="flex" alignItems="center">
          {index > 0 && p !== arr[index - 1] + 1 && (
            <Typography sx={{ mx: 1, fontWeight: "bold" }}>...</Typography>
          )}
          <Button
            variant={p === page ? "contained" : "outlined"}
            sx={{
              minWidth: 40,
              borderRadius: "10px",
              fontWeight: "bold",
              bgcolor: p === page ? "primary.main" : "transparent",
              color: p === page ? "#fff" : "primary.main",
              "&:hover": { bgcolor: p === page ? "primary.dark" : "action.hover" },
            }}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        </Box>
      ))}

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
