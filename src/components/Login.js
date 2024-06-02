import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync, selectUsername, selectLogged, selectAdmin, logout } from '../components/loginSlice';
import DefaultProfilePic from '../images/user.jpg'; // Import your default profile picture
import BackgroundImage from '../images/bback.jpg'; // Import your background image
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    TextField,
    Typography,
    Avatar,
    ThemeProvider,
    createTheme
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets'; // Pet icon for a playful touch

const petTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff4081', // A playful pink color
        },
        secondary: {
            main: '#c6ff00', // A playful green color
        },
        background: {
            default: '#303030', // Dark background
            paper: '#424242', // Dark paper background
        },
        text: {
            primary: '#ffffff', // White text
            secondary: '#c6ff00', // Playful green text
        },
    },
    typography: {
        fontFamily: 'Comic Sans MS, cursive, sans-serif', // Playful font
        h5: {
            fontFamily: 'Papyrus, fantasy, serif', // Even more playful for headings
        },
    },
});

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const userName = useSelector(selectUsername);
    const logged = useSelector(selectLogged);
    const isAdmin = useSelector(selectAdmin);
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAsync({ username, password }))
            .then((response) => {
                if (response.payload && response.payload.error) {
                    setMsg(response.payload.error);
                    toast.error(response.payload.error);
                } else {
                    setMsg("Login successful");
                    toast.success("Login successful");
                    setUsername("");
                    setPassword("");
                }
            })
            .catch(() => {
                setMsg("An error occurred. Please try again.");
                toast.error("An error occurred. Please try again.");
            });
    };

    const handleLogout = () => {
        dispatch(logout());
        setMsg("");
        toast.info("Logged out successfully");
        setUsername("");
        setPassword("");
    };

    return (
        <ThemeProvider theme={petTheme}>
            <CssBaseline />
            <Box
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingTop: '10vh'
                }}
            >
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'background.paper',
                            padding: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <PetsIcon fontSize="large" sx={{ mb: 2, color: 'secondary.main' }} />
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        {logged ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    src={DefaultProfilePic}
                                    alt="Profile"
                                    sx={{ width: 120, height: 120, mb: 2 }}
                                />
                                <Typography variant="h6">{userName}</Typography>
                                <Typography variant="body1" color="success.main">{msg}</Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    onClick={handleLogout}
                                    sx={{ mt: 2 }}
                                >
                                    Logout
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    href="/update_profile"
                                    sx={{ mt: 2 }}
                                >
                                    Update Profile
                                </Button>
                                {isAdmin && (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    href="/reviews"
                                    sx={{ mt: 2 }}
                                >
                                    Go to Reviews
                                </Button>
                                )}
                                {isAdmin && (
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        href="/EmailForm"
                                        sx={{ mt: 2 }}
                                    >
                                        Send Emails
                                    </Button>
                                )}
                            </Box>
                        ) : (
                            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputLabelProps={{ style: { color: 'secondary.main' } }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputLabelProps={{ style: { color: 'secondary.main' } }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                    sx={{ color: 'text.secondary' }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                                </Button>
                                {msg && <Typography color="error" sx={{ mt: 2 }}>{msg}</Typography>}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" align="center">
                                        New user? <a href="/register" style={{ color: '#ff4081' }}>Register here</a>
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box>
            <ToastContainer />
        </ThemeProvider>
    );
};

export default Login;
