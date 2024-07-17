import React, { useState, useEffect, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ThemeContext } from '../../contexts/ThemeContext';
import { makeStyles } from '@material-ui/core/styles';

const EmailPasswordLoginScreen = () => {
    const { theme } = useContext(ThemeContext);
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const paperStyle={padding :20,width:"80%", margin:"20px auto", backgroundColor: theme.primary}
    const fieldStyle={padding :20}
    const avatarStyle={backgroundColor: theme.secondary}
    const btnstyle={margin:'8px 0'}
    const useStyles = makeStyles((t) => ({
        loginBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            margin:'8px 0',
            width: '150px',
            height: '50px',
            fontSize: '1rem',
            fontWeight: '500',
            fontFamily: 'var(--primaryFont)',
            border: `3px solid ${theme.tertiary}`,
            transition: '100ms ease-out',
            '&:hover': {
                backgroundColor: theme.secondary,
                color: theme.tertiary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        logoutBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            width: '150px',
            height: '50px',
            fontSize: '1rem',
            fontWeight: '500',
            fontFamily: 'var(--primaryFont)',
            border: `3px solid ${theme.tertiary}`,
            transition: '100ms ease-out',
            '&:hover': {
                backgroundColor: theme.secondary,
                color: theme.tertiary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down('sm')]: {
                display: 'none',
            },
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        });
    }, []);

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };

    const handleLogin = async () => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                history.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <>{!loggedIn &&
            <div>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        </Grid>
                        <TextField label='Email' placeholder='Enter email' variant="outlined" fullWidth required  onChange={(e) => setEmail(e.target.value)} />
                        <div style={fieldStyle}></div>
                        <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button className={classes.loginBtn} onClick={handleLogin}>Login</Button>
                        <Typography>
                            <Link href="#" style={{ color: theme.tertiary }}>
                                Forgot password ?
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </div>}
            {loggedIn &&
                <div>
                    <Typography style={{ color: theme.tertiary, padding: '10px' }}>
                                Already loggedIn 
                        </Typography>
                    <Button className={classes.logoutBtn} onClick={logoutUser}>Logout</Button>
                </div>}
        </>
    );
};

export default EmailPasswordLoginScreen;
