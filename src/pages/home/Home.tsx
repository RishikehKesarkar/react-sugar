import * as React from 'react';
import adminLayout from '../../masterLayout/adminLayout';
import DetailTable from '../../shared/DetailTable';
import { IHeadCell } from '../../interface/tableHead/IHeadCell';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, styled } from '@mui/material';
import Link from '@mui/material/Link';
import ButtonPopup from '../../shared/buttonPopup';
import axios from 'axios';

import Draggable from 'react-draggable';
import { makeStyles } from '@mui/styles';

const headCells: IHeadCell[] = [
    {
        id: 'cityId',
        numeric: true,
        //hidden: true,
        label: 'id'
    },
    {
        id: 'cityName',
        numeric: false,
        label: 'City Name',
    },
]

const rows = [
    {
        cityId: '1',
        cityName: 'A'
    },
    {
        cityId: '2',
        cityName: 'AB'
    },
    {
        cityId: '3',
        cityName: 'AC'
    }
]

function Home() {
    const [isPopupOpen, setPopupOpen] = React.useState(false);
    const [longitude, setLongitude] = React.useState<any>('');
    const [latitude, setLatitude] = React.useState<any>('');
    const [ipAddress, setIpAddress] = React.useState('');

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    React.useEffect(() => {
        const fetchLocationInfo = async () => {
            try {
                // Get geolocation (longitude and latitude)
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log("position", position);
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);
                });

                // Get IP address
                const response = await axios.get('https://api.ipify.org?format=json');
                console.log("response", response);
                setIpAddress(response.data.ip);
            } catch (error) {
                console.log('Error retrieving location information:', error);
            }
        };

        fetchLocationInfo();
    }, []);
    return (
        <div>
            <h2>Your Location Information:</h2>
            <p>Longitude: {longitude}</p>
            <p>Latitude: {latitude}</p>
            <p>IP Address: {ipAddress}</p>
            <button onClick={openPopup}>Open Draggable Popup</button>

            <DraggablePopup isOpen={isPopupOpen} onClose={closePopup}>
                <h2>Draggable Popup Content</h2>
                <p>Drag this popup around the screen!</p>
            </DraggablePopup>
        </div>
    )
}

const DivStyle = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: 50,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with 90% opacity
    padding: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
}));

export function Testright({ actions }: any) {
    return (
        <DivStyle>
            {actions.map((action: any, index: any) => (
                <Button
                    key={index}
                    onClick={action.onClick}
                    color={action.color}
                    variant='contained'
                >
                    {action.label}
                </Button>
            ))}
        </DivStyle>
    );
}

const ButtonPopups = ({ buttonText, title, content, actions }: any) => {
    return (
        <>
            <Button variant="contained">{buttonText}</Button>
            <Dialog open={false}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    {actions.map((action: any, index: any) => (
                        <Button
                            key={index}
                            onClick={action.onClick}
                            color={action.color}
                            variant={action.variant}
                        >
                            {action.label}
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>
        </>
    );
};


const useStyles = makeStyles({
    popup: {
        position: 'absolute',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: 10,
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: 16,
    },
});

const DraggablePopup = ({ isOpen, onClose, children }: any) => {
    const classes = useStyles();
    if (!isOpen) return null;

    return (
        <Draggable>
            <div className={classes.popup}>
                <button className={classes.closeButton} onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </Draggable>
    );
};

export default adminLayout(Home);