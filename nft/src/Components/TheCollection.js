import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';
import Collection from './Collection';
import Autocomplete from '@mui/material/Autocomplete';
import './ResponsiveDrawer.css'
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Navigationbar from './Nav'
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import { purple, blue } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ClassNames } from '@emotion/react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import { set } from 'mongoose';
import ResponsiveDrawer from './ResponsiveDrawer';


const TheCollection = () => {
let { urlname } = useParams();
console.log(urlname);
    return (
        <Box>
            <Navigationbar />
            <ResponsiveDrawer urlname={urlname}/>
        </Box>
    )
}
export default TheCollection