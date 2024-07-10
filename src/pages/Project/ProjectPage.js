import React, { useContext, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

import './ProjectPage.css'
import { SingleProject } from '../../components';
import { ThemeContext } from '../../contexts/ThemeContext';
// import { projectsData } from '../../data/projectsData'
import { headerData } from '../../data/headerData'

function ProjectPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [projectsData, setProjectsData] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            const docRef = doc(db, "ABT", "projectsData");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProjectsData(docSnap.data().projects)
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        }
        fetchData();
    }, []);

    const useStyles = makeStyles((t) => ({
        search: {
            color: theme.tertiary,
            width: '40%',
            height: '2.75rem',
            outline: 'none',
            border: 'none',
            borderRadius: '20px',
            padding: '0.95rem 1rem',
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 500,
            fontSize: '0.9rem',
            backgroundColor: theme.secondary,
            boxShadow: theme.type === 'dark' ? 'inset 3px 3px 6px #ffffff10, inset -3px -3px 6px #00000060' : 'inset 3px 3px 6px #ffffffbd, inset -3px -3px 6px #00000030',
            "&::placeholder": {
                color: theme.tertiary80,
            },
            [t.breakpoints.down('sm')]: {
                width: '350px',
            },
        },
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
                <title>{headerData.name} | Projects</title>
            </Helmet>
            <div className="projectPage-header" style={{ backgroundColor: theme.primary }}>
                <Link to="/">
                    <AiOutlineHome className={classes.home} />
                </Link>
                <h1 style={{ color: theme.secondary }}>Projects</h1>
            </div>
            <div className="projectPage-container">
                <div className="project-container">
                    {!isLoading && <Grid className="project-grid" container direction="row" alignItems="center" justifyContent="center">
                        {projectsData.map(project => (
                            <SingleProject
                                theme={theme}
                                key={project.id}
                                id={project.id}
                                name={project.projectName}
                                desc={project.projectDesc}
                                tags={project.tags}
                                code={project.code}
                                demo={project.demo}
                                image={project.image}
                            />
                        ))}
                    </Grid>}
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
