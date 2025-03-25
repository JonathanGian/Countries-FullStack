import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';

// Define keyframes for the scrolling animation (leftward movement)
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const HomePage = () => {
  const theme = useTheme();
  // Define the list of features available in the app
  const features = [
    { title: 'Country REST API', description: 'Browse a list of all countries via REST API integration.' },
    { title: 'Supabase Database', description: 'Store and manage your data with our integrated Supabase database.' },
    { title: 'User Validation(Frontend)', description: 'Secure access with user validation using our custom useAuth hook.' },
    { title: 'User Validation(Supabase)', description: 'Extra security ran through Supabase/Google to validate users' },
    { title: 'Jest Testing*', description: 'Robust unit tests powered by Jest.' },
    { title: 'Cypress E2E Testing*', description: 'Comprehensive end-to-end testing with Cypress.' },
    { title: 'Nest.js Backend', description: 'A scalable and reliable backend built with Nest.js.' },
    { title: 'Favorite Countries', description: 'Mark and save your favorite countries for quick access (Stored in Supabase).' },
    { title: 'Country Reviews', description: 'Leave and read reviews for individual countries (Stored in Supabase).' },
    { title: 'Filtered Search', description: 'Quickly find any country with our advanced filtering capabilities.' },
    { title: 'Most Popular Countries', description: 'Discover countries with the most user reviews.' },
    { title: 'Weather API Integration', description: 'Get real-time weather updates for countries around the globe.' },
  ];

  // Split features into two groups
  const half = Math.ceil(features.length / 2);
  const firstGroup = features.slice(0, half);
  const secondGroup = features.slice(half);

  return (
    <Container maxWidth="lg" sx={{ marginTop: theme.spacing(4) }}>
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to the Countries Fullstack App!
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        Explore a wide range of features designed to help you manage, review, and explore countries.
      </Typography>
      {/* First scrolling row: scroll left */}
      <Box
        sx={{
          width: '100vw',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          my: theme.spacing(2),
          position: 'relative',
          left: '50%',
          right: '50%',
          ml: '-50vw',
          mr: '-50vw',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            animation: `${scroll} 90s linear infinite`,
            '&:hover': {
              animationPlayState: 'paused'
            }
          }}
        >
          {firstGroup.concat(firstGroup).map((feature, index) => (
            <Box key={index} sx={{ flex: '0 0 auto', mx: theme.spacing(2) }}>
              <Paper
                elevation={2}
                sx={{
                  padding: theme.spacing(2),
                  minHeight: 150,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Second scrolling row: scroll right */}
      <Box
        sx={{
          width: '100vw',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          my: theme.spacing(2),
          position: 'relative',
          left: '50%',
          right: '50%',
          ml: '-50vw',
          mr: '-50vw',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            animation: `${scroll} 90s linear infinite reverse`,
            '&:hover': {
              animationPlayState: 'paused'
            }
          }}
        >
          {secondGroup.concat(secondGroup).map((feature, index) => (
            <Box key={index} sx={{ flex: '0 0 auto', mx: theme.spacing(2) }}>
              <Paper
                elevation={2}
                sx={{
                  padding: theme.spacing(2),
                  minHeight: 150,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
      <Typography variant="caption" align="center" paragraph sx={{ marginTop: theme.spacing(4) }}>
        *Note: Jest and Cypress testing are setup but extensive is yet to come.
        <br />
        This is a work in progress and will be added in future releases.
      </Typography>
    </Container>
  );
};

export default HomePage;