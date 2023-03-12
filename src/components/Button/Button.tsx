import { Button as MuiButton, Theme, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContent = styled('div')(({ theme }) => ({
    margin: theme.spacing(0.5),
    textTransform: 'none'
}));

// const UseStyles = makeStyles(() => ({
//     root: {
//         //margin: useTheme().spacing(0.5)
//         margin: 0.5
//     },
//     label: {
//         textTransform: 'none'
//     }
// }));

export default function Button(props: any) {
    const { text, size, color, variant, onClick, ...other } = props
    //const classes = UseStyles();

    return (
        <StyledContent>
            <MuiButton
                variant={variant || "contained"}
                size={size || "large"}
                color={color || "primary"}
                onClick={onClick}
                {...other}
            >
                {text}
            </MuiButton>
        </StyledContent>
        // classes={{ root: classes.root, label: classes.label }}>
    )
}