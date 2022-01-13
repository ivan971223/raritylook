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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import axios from '../axios'
import { Avatar } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LaptopWindowsOutlined } from '@mui/icons-material';
import logo from '../weblogo.png';
const drawerWidth = 240;

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
const Search = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    height: '5ch',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(3),
        width: '20ch',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '0ch',
    },
}));

const StyledInputBase = styled(Autocomplete)(({ theme }) => ({
    color: 'inherit',
    '& .MuiAutocomplete-root': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        [theme.breakpoints.down('sm')]: {
            '&:focus': {
                width: '20ch',
            }
        }
    },
}));

const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '5ch',
    }, [theme.breakpoints.up('xs')]: {
        width: '20ch',
    },
}));

const Navigationbar = (props) => {
    const { windows } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [projectData, setProjectData] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(props);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const colortheme = createTheme({
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
    const drawer = (
        <ThemeProvider theme={colortheme}>
            <Box >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <ListAltIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Latest Project" />
                    </ListItem>
                    <ListItem button component={Link} to="/upcomingdrop">
                        <ListItemIcon>
                            <ViewListIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Upcoming Drop" />
                    </ListItem>
                    <ListItem button component={Link} to="/listproject">
                        <ListItemIcon>
                            <AddCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="List New Project" />
                    </ListItem>
                </List>
            </Box>
        </ThemeProvider >
    );

    const container = windows !== undefined ? () => window().document.body : undefined;

    const syncProject = () => {
        axios.get('/retrieve/projects')
            .then((res) => {
                console.log(res.data)
                setProjectData(res.data)
            })
    }
    useEffect(() => {
        syncProject()
    }, [])

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

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1
                    }}
                >
                    <Toolbar className="toolbar">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' },flexGrow: 1 }}>
                            RarityLook
                        </Typography>
                        <Button href="/" color="inherit" sx={{ display: { xs: 'block', sm: 'none' }, textTransform: "none" }}>
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                <img className="logo" src={logo} alt="Logo"></img>
                            </Box>
                        </Button>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledBox>
                                <StyledInputBase
                                    id="free-solo-2-demo"
                                    size="small"
                                    options={projectData}
                                    disableClearable
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <Link to={`/${option.name.replace(/\s/g, "")}`} >
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={option.image_url}
                                                    srcSet={option.image_url}
                                                    alt=""
                                                />
                                                {option.name}
                                            </Box>
                                        </Link>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            size="small"
                                            {...params}
                                            placeholder="Search..."
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autocomplete: 'off',
                                                style: { fontSize: "1rem" }
                                            }}
                                            maxRows='1'
                                        />
                                    )}
                                />
                            </StyledBox>
                        </Search>
                        <Button href="/upcomingdrop" color="inherit" sx={{ display: { xs: 'none', sm: 'block' }, textTransform: "none" }}>Upcoming Drop</Button>
                        <Button href="/" color="inherit" sx={{ display: { xs: 'none', sm: 'block' }, textTransform: "none" }}>Latest Projects</Button>
                        <Button href="/listproject" color="inherit" sx={{ display: { xs: 'none', sm: 'block' }, textTransform: "none" }}>List Your Project</Button>
                        <ThemeProvider theme={theme}>
                            <IconButton aria-label="instagram"
                                id="demo-customized-button"
                                aria-controls="demo-customized-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon />}>
                                <AccountCircleIcon sx={{ fontSize: 30 }} />
                            </IconButton>
                        </ThemeProvider>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem button component={Link} to="/dashboard" onClick={handleClose} disableRipple>
                                <PersonIcon />
                                Login
                            </MenuItem>
                            <Divider />
                            <MenuItem button component={Link} to="/favourite" onClick={handleClose} disableRipple>
                                <FavoriteIcon />
                                My Favorite
                            </MenuItem>
                        </StyledMenu>

                    </Toolbar>
                </AppBar>

            </Box>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, color: 'rgba(71, 98, 130, 0.2)' }}
                aria-label="left-navigation"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box >
    )
}

export default Navigationbar