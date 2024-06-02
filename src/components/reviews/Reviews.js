import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from './reviewsSlice';
import {
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const petTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2979ff',
        },
        secondary: {
            main: '#00e676',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffcc80',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            color: '#ff8f00',
        },
        h5: {
            color: '#ff8f00',
        },
        body2: {
            color: '#b0bec5',
        },
    },
});

const Reviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviews);
    const reviewStatus = useSelector((state) => state.reviews.status);
    const error = useSelector((state) => state.reviews.error);

    const [chartData, setChartData] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if (reviewStatus === 'idle') {
            dispatch(fetchReviews());
        }
    }, [reviewStatus, dispatch]);

    useEffect(() => {
        if (reviews.length > 0) {
            prepareChartData(reviews);
        }
    }, [reviews]);

    const prepareChartData = (reviews) => {
        const ratings = reviews.map(review => review.rating);
        const counts = Array.from({ length: 5 }, (_, i) => ratings.filter(rating => rating === i + 1).length);
        const avgRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
        setAverageRating(avgRating);

        setChartData({
            labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
            datasets: [
                {
                    label: 'Rating Distribution',
                    backgroundColor: '#2979ff',
                    borderColor: '#2979ff',
                    borderWidth: 1,
                    hoverBackgroundColor: '#64b5f6',
                    hoverBorderColor: '#64b5f6',
                    data: counts,
                },
            ],
        });
    };

    let content;

    if (reviewStatus === 'loading') {
        content = (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    } else if (reviewStatus === 'succeeded') {
        content = (
            <>
                <Card sx={{ backgroundColor: petTheme.palette.background.paper, borderRadius: 2, boxShadow: 3, marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Reviews
                        </Typography>
                        <Typography variant="h2" component="h2" gutterBottom color="primary" align="center">
                            Average Rating: {averageRating}
                        </Typography>
                        {chartData && (
                            <Box sx={{ height: '400px' }}>
                                <Bar
                                    data={chartData}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                title: {
                                                    display: true,
                                                    text: 'Number of Reviews',
                                                    color: 'green', // Set y-axis title color to green
                                                },
                                                ticks: {
                                                    color: 'green', // Set y-axis tick color to green
                                                },
                                            },
                                            x: {
                                                title: {
                                                    display: true,
                                                    text: 'Rating',
                                                    color: 'green', // Set x-axis title color to green
                                                },
                                                ticks: {
                                                    color: 'green', // Set x-axis tick color to green
                                                },
                                            },
                                        },
                                        plugins: {
                                            legend: {
                                                labels: {
                                                    color: 'green', // Set legend label color to green
                                                },
                                            },
                                            title: {
                                                display: true,
                                                text: 'Review Ratings Distribution',
                                                color: 'green', // Set chart title color to green
                                            },
                                        },
                                    }}
                                />
                            </Box>
                        )}
                    </CardContent>
                </Card>
                {reviews.map((review) => (
                    <Card key={review.id} sx={{ margin: 2, backgroundColor: petTheme.palette.background.paper }}>
                        <CardContent>
                            <Typography variant="h5">{review.user ? review.user.username : 'Anonymous'}</Typography>
                            <Typography variant="body2">Rating: {review.rating}/5</Typography>
                            <Typography variant="body1">{review.comment}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                {new Date(review.created_at).toLocaleString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </>
        );
    } else if (reviewStatus === 'failed') {
        content = (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={petTheme}>
            <CssBaseline />
            <Container>
                <Typography variant="h4" component="h2" gutterBottom>
                    Reviews
                </Typography>
                {content}
            </Container>
        </ThemeProvider>
    );
};

export default Reviews;
