import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import { Navbar, Footer, Landing, About, Skills, Education, Contacts, Projects } from '../../components'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

function Main() {
    const [isLoading, setIsLoading] = useState(true);
    const [abtData, setAbtData] = useState(null);
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
                <Projects {...abtData.projectsData} />
                <Contacts contactVal={abtData.contactsData} socialVal={abtData.socialsData} />
                <Footer {...abtData.headerData} />
            </>}
            {isLoading && <title>Loading - Porfolio</title>}
        </div>
    )
}

export default Main
