import React, { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { InputLabel, Button, LinearProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ThemeContext } from '../../contexts/ThemeContext';
import AdminEdit from './AdminEdit/AdminEdit'
import { collection, query, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../../utils/firebaseConfig";
import './Admin.css';

const Admin = () => {
    const { theme } = useContext(ThemeContext);
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [abtData, setAbtData] = useState(null);
    const [progressValuePic, setProgressValuePic] = useState(0)
    const [progressValueRes, setProgressValueRes] = useState(0)
    const useStyles = makeStyles((t) => ({
        uploadBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            margin: '8px 0',
            width: '100%',
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
            }
        }
    }));

    const classes = useStyles();
    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            let abtData = []
            const q = query(collection(db, "ABT"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                abtData.push({ head: doc.id, value: doc.data() })
            });
            setAbtData(abtData)
            setIsLoading(false)
            return abtData;
        }
        fetchData();
    }, []);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
                history.push('/');
            }
        });
    }, []);

    const setFeildStringArray = ((abtVal) => {
        let tempString = []
        Object.entries(abtVal).forEach(([key, value]) => {
            if (typeof value === 'string') {
                tempString.push({ title: key, value: value, type: 'string' })
            } else if (typeof value === 'number') {
                tempString.push({ title: key, value: value, type: 'number' })
            } else if (Array.isArray(value)) {
                tempString.push({ title: key, value: value, type: 'array' })
            }
        });
        return tempString
    })

    const uploadProfilePicture = ((event) => {
        const file = event.target.files[0]
        const fileName = file.name
        const replaceFileName = 'abt3'
        const fileExt = fileName.split('.').pop();
        const genaratedFileName = replaceFileName + "." + fileExt;
        const storage = getStorage();
        const storageRef = ref(storage, genaratedFileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + parseInt(progress) + '% done');
                setProgressValuePic(parseInt(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                setProgressValuePic(0)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProgressValuePic(0)
                    alert("File upload completed")
                });
            }
        );
    })

    const uploadResume = ((event) => {
        const file = event.target.files[0]
        const fileName = file.name
        const replaceFileName = 'resume'
        const fileExt = fileName.split('.').pop();
        const genaratedFileName = replaceFileName + "." + fileExt;
        const storage = getStorage();
        const storageRef = ref(storage, genaratedFileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + parseInt(progress) + '% done');
                setProgressValueRes(parseInt(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                setProgressValueRes(0)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProgressValueRes(0)
                    alert("File upload completed")
                });
            }
        );
    })

    return (
        <>
            <div style={{ width: '100%' }}>
                {!isLoading && <Accordion style={{ backgroundColor: theme.primary }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h5">fileEdit</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='fileEditContainer'>
                            <div>
                                <InputLabel >Profile picture:</InputLabel>
                                <Button
                                    className={classes.uploadBtn}
                                    variant="contained"
                                    component="label"
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        accept="image/jpg"
                                        hidden
                                        onChange={(event) => uploadProfilePicture(event)}
                                    />
                                </Button>
                                { progressValuePic > 0 && <LinearProgress variant="determinate" value={progressValuePic} />}
                            </div>
                            <div>
                                <InputLabel for="resume">Resume:</InputLabel>
                                <Button
                                    className={classes.uploadBtn}
                                    variant="contained"
                                    component="label"
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        hidden
                                        onChange={(event) => uploadResume(event)}
                                    />
                                </Button>
                                { progressValueRes > 0 &&<LinearProgress variant="determinate" value={progressValueRes} />}
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>}
                {!isLoading && abtData.map(abt => (
                    <Accordion style={{ backgroundColor: theme.primary }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h5">{abt.head}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{ width: '95%' }}>
                                <AdminEdit headData={abt.head} valueData={setFeildStringArray(abt.value)}></AdminEdit>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </>
    );
};

export default Admin;
