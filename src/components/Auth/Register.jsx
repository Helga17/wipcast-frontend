import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = (props) => {
    const classes = useStyles();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleNameChange = (event) => {
        setName(event.target.value);

        const clonedErrors = { ...errors };
        if (event.target.value.length === 0) {
            clonedErrors.name = 'name is not field'
        } else {
            delete clonedErrors.name;
        }
        setErrors(clonedErrors);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        const isValidEmail = validateEmail(event.target.value);

        const clonedErrors = { ...errors };

        if (!isValidEmail && event.target.value.length > 0) {
            clonedErrors.email = 'Email is not valid';
        } else {
            delete clonedErrors.email;
        }

        setErrors(clonedErrors);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const validatePassword = () => {
        const clonedErrors = { ...errors };

        if (confirmPassword !== password) {
            clonedErrors.confirmPassword = 'The password confirmation does not match';
        } else {
            delete clonedErrors.confirmPassword;
        }
        setErrors(clonedErrors);
    }

    const onSubmit = () => {
        if ((!name && !email) || Object.keys(errors).length !== 0) {
            return;
        }
        axios.post('http://127.0.0.1:9001/api/register', { name: name, email: email, password: password, password_confirmation: confirmPassword })
            .then(result => {
                if (result.data.user) {
                    props.setUser(result.data.user)
                    localStorage.setItem('passport', result.data.access_token);

                    window.location.href = '/';
                }

                if (result.error) {

                }

                localStorage.setItem('passport', result.data.access_token);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.hasOwnProperty('name')}
                            autoComplete="name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            onChange={event => handleNameChange(event)}
                            helperText={errors.hasOwnProperty('name') ? errors.name : ''}
                            onBlur={event => handleNameChange(event)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.hasOwnProperty('email')}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={event => handleEmailChange(event)}
                            helperText={errors.hasOwnProperty('email') ? errors.email : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.hasOwnProperty('password')}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => handlePasswordChange(event)}
                        // onBlur={validatePassword}
                        // helperText={errors.hasOwnProperty('password') ? errors.password : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.hasOwnProperty('confirmPassword')}
                            variant="outlined"
                            required
                            fullWidth
                            name="password-confirmation"
                            label="Password Confirmation"
                            type="password"
                            id="password-confirmation"
                            autoComplete="current-password-confirmation"
                            onChange={event => handleConfirmPasswordChange(event)}
                            onBlur={validatePassword}
                            helperText={errors.hasOwnProperty('confirmPassword') ? errors.confirmPassword : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => onSubmit()}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Register;