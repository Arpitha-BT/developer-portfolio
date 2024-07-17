import React, { useContext, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Login } from '../../components'
import { AiOutlineHome } from "react-icons/ai";
import './LoginPage.css'
import { ThemeContext } from '../../contexts/ThemeContext';

function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { theme, setShowthemHandle } = useContext(ThemeContext);
    setTimeout(() => setShowthemHandle(false), 0);

    const useStyles = makeStyles((t) => ({
        home: {
            color: theme.secondary,
            position: 'absolute',
            top: 25,
            left: 25,
            padding: '7px',
            borderRadius: '50%',
            boxSizing: 'content-box',
            fontSize: '2rem',
            cursor: 'pointer',
            boxShadow: theme.type === 'dark' ? '3px 3px 6px #ffffff40, -3px -3px 6px #00000050' : '3px 3px 6px #ffffff40, -3px -3px 6px #00000050',
            transition: 'all 0.3s ease-in-out',
            "&:hover":
            {
                color: theme.tertiary,
                transform: 'scale(1.1)',
            },
            [t.breakpoints.down('sm')]: {
                fontSize: '1.8rem',
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className="projectPage" style={{ backgroundColor: theme.secondary }}>
            <Helmet>
                <title>Arpitha B T| Login</title>
            </Helmet>
            <div className="projectPage-header" style={{ backgroundColor: theme.primary }}>
                <Link to="/">
                    <AiOutlineHome className={classes.home} />
                </Link>
                <h1 style={{ color: theme.secondary }}>Login</h1>
            </div>
            {isLoading && <><div className="loadingThemme"><ReactLoading type="spinningBubbles" color={theme.primary} height={'10%'} width={'10%'} /></div></>}
            <div className="projectPage-container">
                <Login></Login>
            </div>
        </div>
    )
}

export default LoginPage
