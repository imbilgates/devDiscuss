import { Typography } from '@mui/material';

const Message = ({ message }) => {
    return message ? (
        <Typography variant="body2" sx={{ color: '#4caf50' }} gutterBottom>
            {message}
        </Typography>
    ) : null;
};

export default Message;
