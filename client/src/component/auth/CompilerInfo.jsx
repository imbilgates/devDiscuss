import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';

const CompilerInfo = () => {
    const handleCompilerClick = () => {
        window.open('/compiler', '_blank');
    };

    return (
        <Box sx={styles.container}>
            <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1 }}
            >
                <Typography variant="h6" sx={styles.text}>
                    Here is the <strong>online compiler</strong>.  
                    Users can compile code, post issues,  
                    and find solutions on our <strong>DevDiscuss</strong>.
                </Typography>
            </motion.div>

            <Button 
                onClick={handleCompilerClick} 
                variant="contained" 
                color="primary" 
                startIcon={<CodeIcon />}
                sx={styles.button}
            >
                Open Compiler
            </Button>
        </Box>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', md: 'flex-start' }, // Centered on mobile, left-aligned on desktop
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: { xs: '100%', md: '40%' }, // Full width on mobile, smaller on desktop
        textAlign: { xs: 'center', md: 'left' },
    },
    text: {
        fontSize: '1.2rem',
        fontWeight: 500,
        color: '#fff',
        marginBottom: '16px',
        maxWidth: '400px',
    },
    button: {
        textTransform: 'none',
        fontSize: '1rem',
        padding: '10px 20px',
        borderRadius: '8px',
    },
};

export default CompilerInfo;
