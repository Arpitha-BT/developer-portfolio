import React, { useState, useContext } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField, IconButton, Typography, Divider } from '@material-ui/core'
import { Update } from '@material-ui/icons';
import { ThemeContext } from '../../../contexts/ThemeContext';
import AdminEdit from '../AdminEdit/AdminEdit'
import './AdminEditArray.css';

const AdminEditArray = (props) => {
    const { theme } = useContext(ThemeContext);
    const [textData, setTextData] = useState('');
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
    const updateTextValue = (event) => {
        event.preventDefault()
        setTextData(event.target.value)
    }

    const updateTextField = async (event, val) => {
        alert('Updating array values is not implemented yet')
    }
    return (
        <>
            <div style={{ width: '100%' }}>
                <Accordion style={{ backgroundColor: theme.primary400 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">{props.valueData.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div div style={{ width: '95%' }}>
                            {typeof (props.valueData.value[0]) === 'object' && props.valueData.value.map((value, index) => (
                                <><AdminEdit headData={props.headData + ',' + props.valueData.title + ',' + index} valueData={setFeildStringArray(value)}></AdminEdit><Divider variant="fullWidth" /></>
                            ))}
                            {typeof (props.valueData.value[0]) === 'string' && props.valueData.value.map((value, index) => (
                                <><TextField type="string" value={value} variant="outlined" multiline size="small" margin="normal" onChange={event => updateTextValue(event)}/><IconButton aria-label="update" onClick={event => updateTextField(event, value)}>
                                    <Update fontSize="small" />
                                </IconButton></>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
};

export default AdminEditArray;
