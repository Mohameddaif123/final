import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileAsync, logout } from './loginSlice'; // Import logout action
import { TextField, Button, Container, Typography, IconButton, InputAdornment, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Visibility, VisibilityOff, Pets } from '@mui/icons-material';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';

const petTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2979ff', // Bright blue
        },
        secondary: {
            main: '#00e676', // Vibrant green
        },
        background: {
            default: '#303030', // Dark gray
            paper: '#424242', // Medium gray
        },
        text: {
            primary: '#ffffff', // White
            secondary: '#ffcc80', // Light orange
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            color: '#ff8f00', // Orange
        },
        h5: {
            fontFamily: 'Roboto, Arial, sans-serif',
            color: '#ff8f00', // Orange
        },
        body2: {
            color: '#b0bec5', // Light gray
        },
    },
});

const UpdateProfile = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const dispatch = useDispatch();

    const handleUpdateUsername = async (e) => {
        e.preventDefault();
        try {
            if (newUsername) {
                await dispatch(updateProfileAsync({ username: newUsername }));
                toast.success('Username updated successfully');
                setTimeout(() => {
                    dispatch(logout());
                    window.location.href = '/login';
                }, 2000); // Redirect after 2 seconds
            } else {
                toast.info('No changes detected');
            }
        } catch (error) {
            toast.error('Failed to update username');
        } finally {
            setNewUsername('');
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword) {
                await dispatch(updateProfileAsync({ password: newPassword }));
                toast.success('Password updated successfully');
                setTimeout(() => {
                    dispatch(logout());
                    window.location.href = '/login';
                }, 2000); // Redirect after 2 seconds
            } else {
                toast.info('No changes detected');
            }
        } catch (error) {
            toast.error('Failed to update password');
        } finally {
            setNewPassword('');
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={petTheme}>
            <CssBaseline />
            <Container maxWidth="sm" style={{ textAlign: 'center', paddingTop: '50px' }}>
                <Pets style={{ fontSize: 80, color: '#ff8f00' }} /> {/* Pet icon */}
                <Typography variant="h2" gutterBottom>
                    Update Profile
                </Typography>
                <form onSubmit={handleUpdateUsername}>
                    <TextField
                        id="newUsername"
                        label="New Username"
                        variant="outlined"
                        fullWidth
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Pets style={{ color: '#ffcc80' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update Username
                    </Button>
                </form>
                <form onSubmit={handleUpdatePassword}>
                    <TextField
                        id="newPassword"
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Pets style={{ color: '#ffcc80' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update Password
                    </Button>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default UpdateProfile;
