import { Box } from '@mui/material';
import CompilerInfo from './CompilerInfo';
import Auth from './Auth';
import FloatingIcons from '../../theme/FloatingIcons'

const AuthPage = () => {
    return (
        <FloatingIcons>
            <Box sx={styles.pageContainer}>
                <Auth />
                <CompilerInfo />
            </Box>
        </FloatingIcons>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: '20px', md: '5%' }, // Responsive spacing
        minHeight: '100vh',
        padding: { xs: '20px', md: '5%' },
        flexWrap: 'wrap', // Stacks on mobile
    },
};

export default AuthPage;

