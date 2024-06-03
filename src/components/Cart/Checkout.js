import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pay from './Paypal';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    createTheme,
    ThemeProvider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Rating,
} from '@mui/material';
import { Pets as PetsIcon } from '@mui/icons-material';

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

const Checkout = ({ cartItems }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    };

    const overallTotalPrice = cartItems.reduce((acc, item) => {
        return acc + calculateTotalPrice(item);
    }, 0);

    const formattedTotalPrice = overallTotalPrice.toFixed(2);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/submit_review/', { rating, comment });
            toast.success(response.data.message);
            setRating(0);
            setComment("");
        } catch (error) {
            toast.error("Failed to submit review");
        }
    };

    return (
        <ThemeProvider theme={petTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <PetsIcon fontSize="large" sx={{ color: 'secondary.main' }} />
                    <Typography variant="h2">Checkout</Typography>
                </Box>
                <Box className="row justify-content-center">
                    <Box className="col-md-5 col-lg-4">
                        <Box className="order-md-last">
                            <Typography variant="h4" sx={{ mb: 3 }}>Your cart</Typography>
                            <List>
                                {cartItems.map(item => (
                                    <ListItem key={item.id}>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="text.secondary">
                                                        {item.description}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="text.secondary">
                                                        Individual Price: ${item.price}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <Typography>${calculateTotalPrice(item)}</Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                <ListItem>
                                    <ListItemText primary="Total (USD)" />
                                    <ListItemSecondaryAction>
                                        <Typography variant="h6">${formattedTotalPrice}</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <Pay amount={overallTotalPrice} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="row justify-content-center mt-5">
                    <Box className="col-md-5 col-lg-4">
                        <Typography variant="h4" sx={{ mb: 3 }}>Leave a Review</Typography>
                        <form onSubmit={handleSubmitReview}>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(event, newValue) => setRating(newValue)}
                                required
                            />
                            <TextField
                                label="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                multiline
                                rows={4}
                                required
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit Review
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

Checkout.propTypes = {
    cartItems: PropTypes.array.isRequired,
};

export default Checkout;

