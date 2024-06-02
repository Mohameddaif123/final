import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import mycat from '../images/mycat.jpg'; // Import the image
import backgroundpets from '../images/backgroundpets.jpg'; // Import the image

const AboutMe = () => {
    const [isHovered, setIsHovered] = useState(false);

    const HeroSection = styled('section')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        width: '65%',
        margin: 'auto',
        padding: '80px',
        // Remove backgroundColor property to display only the background picture
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '30px',
            width: '85%',
        },
    }));

    const TextDiv = styled('div')(({ theme }) => ({
        marginRight: '40px',
        paddingTop: '0',
        [theme.breakpoints.down('md')]: {
            order: 2,
            height: 'auto',
            marginBottom: '15px',
            marginRight: '0',
        },
    }));

    const StyledButton = styled(Button)({
        textDecoration: 'none',
        color: '#333333', // Dark font color
        background: isHovered ? 'linear-gradient(#696484, #8788BA)' : 'linear-gradient(#8E86B5, #ACAEED)',
        padding: '20px 30px',
        fontSize: '1.1em',
        borderRadius: '50px',
        transition: 'background 0.3s ease',
        '&:hover': {
            background: 'linear-gradient(#696484, #8788BA)',
        },
    });

    const Image = styled('img')(({ theme }) => ({
        maxWidth: '50%',
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            order: 1,
            marginBottom: '40px',
        },
    }));

    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundpets})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '16px',
                height: '100vh', // Adjust height as needed
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                margin: '0',
            }}
        >
            <HeroSection>
                <TextDiv>
                    <Typography variant="h1" sx={{ color: '#333333', fontSize: '3em', paddingBottom: '25px' }}>
                        Mohamed: Animal Lover and Web Developer
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontSize: '1.2em', marginBottom: '70px', backgroundColor: 'black', padding: '20px', borderRadius: '5px' }}>
                        Mohamed is an ardent animal lover and a skilled web developer, combining his passion for the natural world with his technical expertise. With over five years of professional experience, Mohamed has honed his ability to capture the essence of every project he undertakes, much like a photographer captures the perfect moment. His love for animals inspires him to bring a unique perspective to his work, blending creativity with precision. Whether he is crafting intuitive user interfaces or developing robust backend systems, Mohamed&apos;s dedication and passion shine through, making him a valuable asset in any project. His commitment to excellence and his love for all living creatures drive him to continuously improve and innovate in the field of web development.
                    </Typography>
                    <StyledButton
                        href="/"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Check our Website
                    </StyledButton>
                </TextDiv>
                <Image src={mycat} alt="mohamad cat" />
            </HeroSection>
        </Box>
    );
}

export default AboutMe;
