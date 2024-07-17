import React, { useState, useContext } from 'react';
import { TextField, Button, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import { Update } from '@material-ui/icons';
import { ThemeContext } from '../../../contexts/ThemeContext';
import AdminEditArray from '../AdminEditArray/AdminEditArray'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import './AdminEdit.css';

const AdminEdit = (props) => {
    const { theme } = useContext(ThemeContext);
    const [textData, setTextData] = useState('');
    const [numberData, setNumberData] = useState();

    const updateTextValue = (event) => {
        event.preventDefault()
        setTextData(event.target.value)
    }

    const updateNumberValue = (event) => {
        event.preventDefault()
        setNumberData(event.target.value)
    }

    const updateTextField = async (event, val) => {

        const abtRef = doc(db, "ABT", props.headData);
        const updateData = {}
        updateData[val.title] = textData
        if (!props.headData.includes(",")) {
            await updateDoc(abtRef, updateData).then(() =>{
                alert('Updated successfully')
            });
        } else {
            alert('Updating subchild is not implemented yet')
        }
    }

    const updateNumberField = async (event, val) => {
        const abtRef = doc(db, "ABT", props.headData);
        const updateData = {}
        updateData[val.title] = numberData
        if (!props.headData.includes(",")) {
            await updateDoc(abtRef, updateData).then(() =>{
                alert('Updated successfully')
            });
        } else {
            alert('Updating subchild is not implemented yet')
        }
    }

    return (
        <>
            <div>
                {props.valueData.map((val) => (
                    <div className='fieldWrapper'>
                        {val.type === 'string' && <><TextField type="string" label={val.title} defaultValue={val.value} variant="outlined" multiline className='inputFieldWidth' size="small" onChange={event => updateTextValue(event)} /><IconButton aria-label="update" onClick={event => updateTextField(event, val)}>
                            <Update fontSize="small" />
                        </IconButton></>}
                        {val.type === 'number' && <><TextField type="number" label={val.title} defaultValue={val.value} variant="outlined" size="small" onChange={event => updateNumberValue(event)} /><IconButton aria-label="update" onClick={event => updateNumberField(event, val)}>
                            <Update fontSize="small" />
                        </IconButton></>}
                        {val.type === 'array' && <AdminEditArray headData={props.headData} valueData={val} />}
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminEdit;
