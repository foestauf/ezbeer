import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { loginUser } from '../../actions/authActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
    errors: {},
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [props, auth, errors, history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: user.email,
      password: user.password,
    };
    dispatch(loginUser(userData)); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            onChange={onChange}
            value={user.email}
            error={errors.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <span style={{ textColor: 'red' }}>
            {errors.email}
            {errors.emailnotfound}
          </span>
          <TextField
            onChange={onChange}
            value={user.password}
            error={errors.password}
            variant="outlined"
            margin="normal"
            label="Password"
            required
            fullWidth
            autoComplete="current-password"
            id="password"
            type="password"
          />
          <span style={{ textColor: 'red' }}>
            {errors.password}
            {errors.passwordincorrect}
          </span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#home">Forgot Password</Link>
            </Grid>
            <Grid item>
              <Link to="#home">Don&apos;t have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Login;
