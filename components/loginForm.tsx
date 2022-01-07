import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../src/authContext';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const LoginForm = () => {

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {email: ''},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login({email: values.email});
    }
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Enter your email address"
          aria-label="Enter your email address"
          name="email"
          autoComplete="email"
          placeholder="example@email.com"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
					Login
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm;