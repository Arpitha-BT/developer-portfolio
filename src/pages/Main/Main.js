import React, { useContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import ReactLoading from 'react-loading';
import { Navbar, Footer, Landing, About, Skills, Education, Contacts } from '../../components'
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { ThemeContext } from '../../contexts/ThemeContext';
import './Main.css'

function Main() {
    const [isLoading, setIsLoading] = useState(true);
    const [abtData, setAbtData] = useState(null);
    const { theme, setShowthemHandle } = useContext(ThemeContext);
    setTimeout(() => setShowthemHandle(true), 0);
    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            let abtData = {}
            const q = query(collection(db, "ABT"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                abtData[doc.id] = doc.data()
            });
            setAbtData(abtData)
            setIsLoading(false)
            return abtData;
        }
        fetchData();
    }, []);
    useEffect(() => {
        onSnapshot(collection(db, "ABT"), (snapshot) => {
            let abtDataref = {}
            snapshot.forEach((doc) => {
                abtDataref[doc.id] = doc.data()
            });
            setAbtData(abtDataref)
        });
    }, []);
    return (
        <div>
            {!isLoading && <>
                <Helmet>
                    <title>{abtData.headerData.name} - Porfolio</title>
                </Helmet>
                <Navbar {...abtData.headerData} />
                <Landing headerVal={abtData.headerData} socialVal={abtData.socialsData} />
                <About {...abtData.aboutData} />
                <Education {...abtData.educationData} />
                <Skills {...abtData.skillsData} />
                <Contacts contactVal={abtData.contactsData} socialVal={abtData.socialsData} />
                <Footer {...abtData.headerData} />
            </>}
            {isLoading && <><div className="loadingThemme"><ReactLoading type="spinningBubbles" color={theme.primary} height={'10%'} width={'10%'} /></div></> 
            }
        </div>
    )
}

export default Main
