import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from './loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdSense from './AdSense';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    TextField,
    Typography,
    ThemeProvider,
    createTheme
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const petTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff4081',
        },
        secondary: {
            main: '#c6ff00',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
            secondary: '#c6ff00',
        },
    },
    typography: {
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
        h5: {
            fontFamily: 'Papyrus, fantasy, serif',
        },
    },
});

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleRegister = async () => {
        if (!username || !email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        setIsLoading(true);

        try {
            const resultAction = await dispatch(registerAsync({ username, email, password }));

            if (registerAsync.fulfilled.match(resultAction)) {
                setUsername("");
                setEmail("");
                setPassword("");
                toast.success('Registration successful! Please log in.');
            } else {
                toast.error(resultAction.payload || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={petTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 8,
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <PetsIcon fontSize="large" sx={{ mb: 2, color: 'secondary.main' }} />
                    <Typography component="h1" variant="h5">
                        Sign up for free
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Sign up'}
                        </Button>
                        <Typography variant="body2" color="textSecondary" align="center">
                            By clicking Sign up, you agree to the terms of use.
                        </Typography>
                    </Box>
                </Box>
                {/* AdSense Advertisement */}
                <Box sx={{ mt: 4 }}>
                    <AdSense
                        client='ca-pub-4481504048762478'
                        slot='3937695569'
                    />
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    );
};

export default Register;
