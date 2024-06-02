// EmailForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, CssBaseline, TextField, Typography, ThemeProvider, createTheme, Card, CardContent, MenuItem, FormControlLabel, Switch } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const EmailForm = () => {
    const [formData, setFormData] = useState({
        recipient: '',
        subject: '',
        message: ''
    });
    const [users, setUsers] = useState([]);
    const [sendToAllUsers, setSendToAllUsers] = useState(false); // State for checkbox

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://cats-dogs-petstore.onrender.com/api/users'); // Assuming your backend server is running on the same host
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setSendToAllUsers(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let emailData = {
                subject: formData.subject,
                message: formData.message
            };

            if (sendToAllUsers) {
                // Add a flag to indicate sending to all users
                emailData.sendToAllUsers = true;
            } else {
                // Add recipient email if not sending to all users
                emailData.recipient = formData.recipient;
            }

            // Make POST request to send email
            const response = await axios.post('http://localhost:8000/send_email/', emailData);
            console.log(response.data);
            toast.success('Email sent successfully');
            setFormData({
                recipient: '',
                subject: '',
                message: ''
            });
            setSendToAllUsers(false); // Reset checkbox state after sending email
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send email');
        }
    };

    return (
        <ThemeProvider theme={petTheme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card sx={{ backgroundColor: 'background.default', borderRadius: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <PetsIcon fontSize="large" sx={{ mb: 2, color: 'secondary.main' }} />
                            <Typography component="h1" variant="h5">
                                Send Email
                            </Typography>
                            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={sendToAllUsers}
                                            onChange={handleCheckboxChange}
                                            color="primary"
                                        />
                                    }
                                    label="Send to all users"
                                />
                                {!sendToAllUsers && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="recipient"
                                        select
                                        label="Recipient"
                                        name="recipient"
                                        autoComplete="recipient"
                                        autoFocus
                                        value={formData.recipient}
                                        onChange={handleChange}
                                    >
                                        {users.map(user => (
                                            <MenuItem key={user.email} value={user.email}>
                                                {user.email}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="subject"
                                    label="Subject"
                                    type="text"
                                    id="subject"
                                    autoComplete="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="message"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3 }}
                                >
                                    Send Email
                                </Button>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    );
};

export default EmailForm;
