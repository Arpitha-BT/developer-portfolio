import React, { useContext, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineHome } from "react-icons/ai";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

import './ProjectPage.css'
import { SingleProject } from '../../components';
import { ThemeContext } from '../../contexts/ThemeContext';

function ProjectPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('')
    const [projectsData, setProjectsData] = useState([]);
    const { theme, setShowthemHandle } = useContext(ThemeContext);
    setTimeout(() => setShowthemHandle(false), 0);
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

    useEffect(() => {
        onSnapshot(doc(db, "ABT", "projectsData"), (doc) => {
            setProjectsData(doc.data().projects)
        });
    }, []);

    const filteredArticles = projectsData.filter((project) => {
        const content = project.projectName + project.projectDesc + project.tags
        return content.toLowerCase().includes(search.toLowerCase())
    })

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
                <title>Arpitha B T| Projects</title>
            </Helmet>
            <div className="projectPage-header" style={{ backgroundColor: theme.primary }}>
                <Link to="/">
                    <AiOutlineHome className={classes.home} />
                </Link>
                <h1 style={{ color: theme.secondary }}>Projects</h1>
            </div>
            {isLoading && <><div className="loadingThemme"><ReactLoading type="spinningBubbles" color={theme.primary} height={'10%'} width={'10%'} /></div></>}
            <div className="projectPage-container">
                <div className="projectPage-search">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search project..." className={classes.search} />
                </div>
                <div className="project-container">
                    {!isLoading &&
                        <Grid className="project-grid" container direction="row" alignItems="center" justifyContent="center">
                            {filteredArticles.map(project => (
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
