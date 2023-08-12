import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material';

const DivStyle = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: '10px',
}));

export function Copyright(props: any) {
    return (
        <DivStyle>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </DivStyle>
    );
}
