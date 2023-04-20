import { Grid, Paper as MuiPaper } from '@mui/material';

export default function Paper(props: any) {
    const { ...other } = props;
    return (
        <MuiPaper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }} {...other}>
            {props.children}
        </MuiPaper>

    )
}