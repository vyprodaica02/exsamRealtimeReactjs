import { Login, ChatRoom } from './pages/_index';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { HubContext, UserContextProvider } from './contexts/_index';

const App = () => {

    const hubCtx = useContext(HubContext);

    const [inRoom, setInRoom] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {

        if (hubCtx?.connectionStarted) {
            hubCtx?.connection?.onclose(() => {
                setInRoom(false)
            });
        }
    }, [hubCtx?.connection]);

    return (
        <>
            <UserContextProvider>
                <Box sx={{ width: "100%", height: '100vh' }}>
                    <Container>
                        <Box sx={{
                            minWidth: "100%", minHeight: "100vh", padding: "20px",
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center',
                        }}>
                            {hubCtx?.connection !== null &&
                                <>
                                    {inRoom ? <ChatRoom /> :
                                        <Login
                                            onJoined={(success) => {

                                                if (!success) {
                                                    setAlertOpen(true)
                                                }
                                                setInRoom(success)
                                            }} />
                                    }
                                </>}
                        </Box>
                    </Container>
                </Box>
            </UserContextProvider>


            <Snackbar open={alertOpen} autoHideDuration={1500}>
                <Alert severity="error" sx={{ width: '100%' }} variant="filled">
                    Couldn't join the room!
                </Alert>
            </Snackbar>

        </>
    )
};

export default App