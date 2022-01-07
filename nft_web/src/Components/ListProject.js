import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navigationbar from './Nav';
import axios from '../axios'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './ListProject.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Icon from '@mui/material/Icon';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0277bd'
        },
        secondary: {
            // light: 这将从 palette.primary.main 中进行计算，
            main: '#ef5350',
            light: "#f27573",
            dark: "#a73a38"
            // dark: 这将从 palette.primary.main 中进行计算，
            // contrastText: 这将计算与 palette.primary.main 的对比度
        },

    },
})

const ListProject = () => {
    const [projectData, setProjectData] = useState([])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ p: 1, m: 1, display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ p: 1, m: 1, marginBottom: '50px' }}>
                    <Navigationbar/>
                </Box>
                <Box component="main"
                    sx={{
                        flexGrow: 1, p: 1,
                        m: 1, width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>

                    <h1 className="header">List your Project on RarityLook</h1>
                    <div className="text">
                        All listings of NFT Projects are for
                        <span className="highlight-text"> FREE </span>
                        now.</div>
                    <div className="text">This page is for listing your project ONLY. To add your collection on "upcoming drop", please fill the form
                        <span> </span>
                        <a className="drop-btn" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScMyTPyLYssofMQiIC-z7mAckk4xBCq9RSAcgwwZ4UIpbY_0w/viewform?usp=sf_link">here</a>.</div>
                    <h2 className="sub-header">Listing Plan</h2>
                    <div className="plan-container">
                        <div className="left-plan">
                            <div className="highlight-text">Free plan</div>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderTop: '1px solid' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 24, height: 24, bgcolor: green[500] }}>
                                            <CheckCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Rarity Ranking" />
                                </ListItem>
                            </List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 24, height: 24, bgcolor: red[500] }}>
                                        <CancelIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Update" />
                            </ListItem>
                        </div>

                        <div className="right-plan">
                            <div className="highlight-text">Premium plan</div>
                            <List sx={{ borderTop: "1px solid", width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 24, height: 24, bgcolor: green[500] }}>
                                            <CheckCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Rarity Ranking" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 24, height: 24, bgcolor: green[500] }}>
                                            <CheckCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Regular update on dynamic data" secondary="Daily update on current price and last price to help boost transactions" />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                    <h2 className="sub-header">How to List your project?</h2>
                    <div className="listing-step">
                        <div className="text">1. Fill out the request form below for project listing </div>
                        <div className="text">2. Send a direct message (DM) to our Twitter account</div>
                        <div className="text"></div>
                        <div className="warning-text">Attention! Make sure
                        <ul>
                            <li>our wallet address,</li>
                            <li>our email address,</li>
                            <li>the pin number you set</li> 
                        </ul>
                        <div>exists as same as that on the invoice of our payment request before you pay</div>
                        </div>
                    </div>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScRRt_5d9seOSoDIXCYDuSdy7t1_Dj8D3ewzQwap9aHS1rCeA/viewform?embedded=true" width="100%" height="1895" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">載入中…</iframe>

                </Box>
            </Box>
        </ThemeProvider>
    )
}
export default ListProject