import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome } from "react-icons/ai";
import './ResumePage.css'
import { ThemeContext } from '../../contexts/ThemeContext';


function ResumePage() {
    const { theme, setShowthemHandle } = useContext(ThemeContext);
    setShowthemHandle(false)
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
        <div className="resumePage" style={{ backgroundColor: theme.secondary }}>
            <Helmet>
                <title>Arpitha B T| Resume</title>
            </Helmet>
            <div className="resumePage-header" style={{ backgroundColor: theme.primary }}>
                <Link to="/">
                    <AiOutlineHome className={classes.home} />
                </Link>
                <h1 style={{ color: theme.secondary }}>Resume</h1>
            </div>
            <div className="resumePage-container">
                <iframe src="https://firebasestorage.googleapis.com/v0/b/arpitha-b-t.appspot.com/o/resume.pdf?alt=media&token=92afc816-3304-4bbc-8b6b-dbf0bbfe67cc" width="100%" height="500px" />
            </div>
        </div>
    )
}

export default ResumePage
