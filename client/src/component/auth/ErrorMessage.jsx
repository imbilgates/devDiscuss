import { Typography } from '@mui/material';

const ErrorMessage = ({ error }) => {
    return error ? (
        <Typography variant="body2" color="error" gutterBottom>
            {error}
        </Typography>
    ) : null;
};

export default ErrorMessage;
