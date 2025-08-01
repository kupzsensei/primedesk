
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser, logout } from '../redux/userSlice';
import axios from 'axios';
import {
  Container,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../theme.tsx';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user.fullName) {
      axios.get('http://127.0.0.1:5000/api/user').then((response) => {
        dispatch(setUser(response.data));
        setLoading(false);
      }).catch(() => {
        navigate('/login');
      });
    } else {
      setLoading(false);
    }
  }, [dispatch, user.fullName, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Container component="main" maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
          <FormControlLabel
            control={<Switch onChange={toggleTheme} />}
            label="Dark Mode"
            sx={{ position: 'absolute', top: 16, right: 16 }}
          />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }} component="div">
              <Avatar
                src={user.avatar}
                alt={user.fullName}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item xs={12} md={8} component="div">
              <Typography component="h1" variant="h4" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                Welcome, {user.fullName}!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                {user.email}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, textAlign: { xs: 'center', md: 'left' } }}>
                {user.bio}
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/edit-profile')}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
