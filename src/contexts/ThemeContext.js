import React, { createContext, useState, useEffect } from 'react'
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import OpacityIcon from '@material-ui/icons/Opacity';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import {
    greenThemeLight, greenThemeDark, bwThemeLight, bwThemeDark, blueThemeLight, blueThemeDark, redThemeLight, redThemeDark, orangeThemeLight, orangeThemeDark, purpleThemeLight, purpleThemeDark, pinkThemeLight, pinkThemeDark, yellowThemeLight, yellowThemeDark
} from '../theme/theme'
import './ThemeContext.css';

export const ThemeContext = createContext()

function ThemeContextProvider(props) {
    const [theme, setTheme] = useState(orangeThemeDark)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [showTheme, setShowTheme] = useState(true);

    const getThemeData = (val) => {
        switch (val) {
            case 'greenThemeLight':
                return greenThemeLight
            case 'greenThemeDark':
                return greenThemeDark
            case 'bwThemeLight':
                return bwThemeLight
            case 'bwThemeDark':
                return bwThemeDark
            case 'blueThemeLight':
                return blueThemeLight
            case 'blueThemeDark':
                return blueThemeDark
            case 'redThemeLight':
                return redThemeLight
            case 'redThemeDark':
                return redThemeDark
            case 'orangeThemeLight':
                return orangeThemeLight
            case 'orangeThemeDark':
                return orangeThemeDark
            case 'purpleThemeLight':
                return purpleThemeLight
            case 'purpleThemeDark':
                return purpleThemeDark
            case 'pinkThemeLight':
                return pinkThemeLight
            case 'pinkThemeDark':
                return pinkThemeDark
            case 'yellowThemeLight':
                return yellowThemeLight
            case 'yellowThemeDark':
                return yellowThemeDark
            default:
                return orangeThemeDark
        }
    }

    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            const docRef = doc(db, "ABT", "themeData");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setTheme(getThemeData(docSnap.data().defaultTheme))
                setIsLoading(false)
            } else {
                setIsLoading(true)
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        onSnapshot(doc(db, "ABT", "themeData"), (doc) => {
            setTheme(getThemeData(doc.data().defaultTheme))
        });
    }, []);
    const useStyles = makeStyles((t) => ({
        selectpallet: {
            position: 'absolute',
            right: 90,
            top: 40,
            zIndex: 999,
            fontSize: '2.5rem',
            color: theme.tertiary,
            cursor: 'pointer',
            transform: 'translateY(-10px)',
            transition: 'color 0.3s',
            '&:hover': {
                color: theme.primary,
            },
            [t.breakpoints.down('sm')]: {
                fontSize: '2.5rem',
            },
            [t.breakpoints.down('xs')]: {
                fontSize: '2rem',
                right: 70,
                top: 43,
            },
        },
        selectpalletPop: {
            "& .MuiPopover-paper": {
                background: theme.primary
            }
        }

    }));

    const classes = useStyles();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = (event) => {
        event.preventDefault()
        setAnchorEl(null);
        switch (event.target.id) {
            case 'greenThemeLight':
                setTheme(greenThemeLight)
                break;
            case 'greenThemeDark':
                setTheme(greenThemeDark)
                break;
            case 'bwThemeLight':
                setTheme(bwThemeLight)
                break;
            case 'bwThemeDark':
                setTheme(bwThemeDark)
                break;
            case 'blueThemeLight':
                setTheme(blueThemeLight)
                break;
            case 'blueThemeDark':
                setTheme(blueThemeDark)
                break;
            case 'redThemeLight':
                setTheme(redThemeLight)
                break;
            case 'redThemeDark':
                setTheme(redThemeDark)
                break;
            case 'orangeThemeLight':
                setTheme(orangeThemeLight)
                break;
            case 'orangeThemeDark':
                setTheme(orangeThemeDark)
                break;
            case 'purpleThemeLight':
                setTheme(purpleThemeLight)
                break;
            case 'purpleThemeDark':
                setTheme(purpleThemeDark)
                break;
            case 'pinkThemeLight':
                setTheme(pinkThemeLight)
                break;
            case 'pinkThemeDark':
                setTheme(pinkThemeDark)
                break;
            case 'yellowThemeLight':
                setTheme(yellowThemeLight)
                break;
            case 'yellowThemeDark':
                setTheme(yellowThemeDark)
                break;
            default:
                setTheme(orangeThemeDark)
        }
    }

    const setHandleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }



    const value = { theme, drawerOpen, setHandleDrawer }
    return (
        <div className='theme-selectmain'>
            {!isLoading &&<OpacityIcon id='themechangeIcon' className={classes.selectpallet} onClick={handleClick}></OpacityIcon>}
            <Popover
                className={classes.selectpalletPop}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className='selectpalletPopMain'>
                    <div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${greenThemeLight.secondary}, ${greenThemeLight.secondary} 50%, ${greenThemeLight.primary} 51% ` }} id="greenThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${greenThemeDark.secondary}, ${greenThemeDark.secondary} 50%, ${greenThemeDark.primary} 51% ` }} id="greenThemeDark" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${bwThemeLight.secondary}, ${bwThemeLight.secondary} 50%, ${bwThemeLight.primary} 51% ` }} id="bwThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${bwThemeDark.secondary}, ${bwThemeDark.secondary} 50%, ${bwThemeDark.primary} 51% ` }} id="bwThemeDark" onClick={handleClose}></div>
                    </div>
                    <div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${blueThemeLight.secondary}, ${blueThemeLight.secondary} 50%, ${blueThemeLight.primary} 51% ` }} id="blueThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${blueThemeDark.secondary}, ${blueThemeDark.secondary} 50%, ${blueThemeDark.primary} 51% ` }} id="blueThemeDark" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${redThemeLight.secondary}, ${redThemeLight.secondary} 50%, ${redThemeLight.primary} 51% ` }} id="redThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${redThemeDark.secondary}, ${redThemeDark.secondary} 50%, ${redThemeDark.primary} 51% ` }} id="redThemeDark" onClick={handleClose}></div>
                    </div>
                    <div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${orangeThemeLight.secondary}, ${orangeThemeLight.secondary} 50%, ${orangeThemeLight.primary} 51% ` }} id="orangeThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${orangeThemeDark.secondary}, ${orangeThemeDark.secondary} 50%, ${orangeThemeDark.primary} 51% ` }} id="orangeThemeDark" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${purpleThemeLight.secondary}, ${purpleThemeLight.secondary} 50%, ${purpleThemeLight.primary} 51% ` }} id="purpleThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${purpleThemeDark.secondary}, ${purpleThemeDark.secondary} 50%, ${purpleThemeDark.primary} 51% ` }} id="purpleThemeDark" onClick={handleClose}></div>
                    </div>
                    <div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${pinkThemeLight.secondary}, ${pinkThemeLight.secondary} 50%, ${pinkThemeLight.primary} 51% ` }} id="pinkThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${pinkThemeDark.secondary}, ${pinkThemeDark.secondary} 50%, ${pinkThemeDark.primary} 51% ` }} id="pinkThemeDark" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${yellowThemeLight.secondary}, ${yellowThemeLight.secondary} 50%, ${yellowThemeLight.primary} 51% ` }} id="yellowThemeLight" onClick={handleClose}></div>
                        <div className='selctcolor-icon' style={{ background: `linear-gradient( -90deg, ${yellowThemeDark.secondary}, ${yellowThemeDark.secondary} 50%, ${yellowThemeDark.primary} 51% ` }} id="yellowThemeDark" onClick={handleClose}></div>
                    </div>
                </div>
            </Popover>
            <ThemeContext.Provider value={value}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    )
}


export default ThemeContextProvider