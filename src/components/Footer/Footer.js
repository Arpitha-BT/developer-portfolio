import React, { useContext } from 'react'
import './Footer.css'
import { ThemeContext } from '../../contexts/ThemeContext'

function Footer(props) {

    const { theme }  = useContext(ThemeContext)

    return (
        <div className="footer" style={{backgroundColor: theme.secondary}}>
            <p style={{color: theme.tertiary}}>
               {props.footerText}
            </p>
        </div>
    )
}

export default Footer

