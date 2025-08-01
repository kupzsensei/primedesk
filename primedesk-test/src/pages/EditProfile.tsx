
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  TextField,
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../redux/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  bio: yup.string().required('Bio is required'),
  avatar: yup.string().url('Enter a valid URL').required('Avatar URL is required'),
});

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: user.fullName,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      axios
        .put('http://127.0.0.1:5000/api/user', values)
        .then((response) => {
          dispatch(setUser(response.data));
          setSubmitting(false);
          setOpenSnackbar(true);
          setTimeout(() => navigate('/dashboard'), 2000);
        });
    },
  });

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
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
            Edit Profile
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} component="div">
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12} component="div">
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} component="div">
                <TextField
                  required
                  fullWidth
                  id="bio"
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
              </Grid>
              <Grid item xs={12} component="div">
                <TextField
                  required
                  fullWidth
                  id="avatar"
                  name="avatar"
                  label="Avatar URL"
                  value={formik.values.avatar}
                  onChange={formik.handleChange}
                  error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                  helperText={formik.touched.avatar && formik.errors.avatar}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button onClick={() => navigate('/dashboard')} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfile;
