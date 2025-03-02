import { Box, CircularProgress, Typography } from '@mui/material';

function Loading({ isLoading, text = 'Loading...' }) {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional semi-transparent background
      }}
    >
      <CircularProgress
        sx={{
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
        color="primary"
      />
      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
          color: '#fff',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default Loading;
