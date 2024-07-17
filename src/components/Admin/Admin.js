import React, { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ThemeContext } from '../../contexts/ThemeContext';
import AdminEdit from './AdminEdit/AdminEdit'
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import './Admin.css';

const Admin = () => {
    const { theme } = useContext(ThemeContext);
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [abtData, setAbtData] = useState(null);
    const useStyles = makeStyles((t) => ({
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

    return (
        <>
            <div style={{width: '100%'}}>
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
                                <div style={{width: '95%'}}>
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
