import { styled } from "@mui/system";
import { Paper } from "@mui/material";
import Button from "../components/Button/Button";

const DivStyle = styled('div')(({ theme }) => ({
    // position: 'fixed',
    bottom: 50,
    left: 0,
    width: '100%',
}));

const PaperStyle = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with 90% opacity
    width: '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
}));

interface IbuttonPopupProps {
    actions: {
        label: string,
        onClick?: any,
        color?: 'primary' | 'error' | 'info' | 'secondary' | 'success' | 'warning',
        type?: string,
        variant?: 'outlined' | 'contained' | 'text'
    }[]
}

const ButtonPopup = (props: IbuttonPopupProps) => {
    const { actions } = props;

    return (
        <DivStyle>
            <PaperStyle>
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        onClick={action.onClick}
                        color={action.color || 'primary'}
                        variant={action.variant || 'outlined'}
                        text={action.label}
                        type={action.type}
                    />
                ))}
            </PaperStyle>
        </DivStyle>
    );
}

export default ButtonPopup;
