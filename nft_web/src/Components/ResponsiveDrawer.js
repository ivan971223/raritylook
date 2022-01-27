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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ListAltIcon from '@mui/icons-material/ListAlt';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const options = ["Rarity", "Price: High to Low", "Price: Low to High", "Recently Listed"];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inputId, setInputId] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [applySearch, setApplySearch] = useState(false)
  const [value, setValue] = useState(options[0]);
  const [sortOption, setSortOption] = useState("");
  const [hasSortOption, sethasSortOption] = useState(true)
  const [isBuy, setIsBuy] = useState(false)
  const [variant, setVariant] = useState("outlined")
  const [inputminRank, setinputMinRank] = useState("")
  const [inputmaxRank, setinputMaxRank] = useState("")
  const [minRank, setMinRank] = useState()
  const [maxRank, setMaxRank] = useState()
  const [hasRankFilter, sethasRankFilter] = useState(false)
  const [inputminPrice, setinputMinPrice] = useState("")
  const [inputmaxPrice, setinputMaxPrice] = useState("")
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [hasPriceFilter, sethasPriceFilter] = useState(false)
  const [chipData, setChipData] = React.useState([]);
  const [showSearchText, setShowSearchText] = useState('none')

  console.log("url",props);
  useEffect(()=>{
    console.log(isBuy);
  },[props.urlname])
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
  const handleChangeOption = (event) => {
    setSortOption(event.target.value);
    sethasSortOption(true)
  }

  const handleDelete = (chipToDelete) => () => {
    if (chipToDelete.name == "rank_filter") {
      sethasRankFilter(false)
    }
    else if (chipToDelete.name == "price_filter") {
      sethasPriceFilter(false)
    }

    setChipData((chips) => chips.filter((chip) => chip.name !== chipToDelete.name));
  };

  const addRankTag = () => {
    let filterlist = chipData;
    const hasRankFilterFilter = filterlist.find((element) => element.name == "rank_filter")
    if (hasRankFilterFilter) {
      const index = filterlist.findIndex((element) => element.name == "rank_filter")
      filterlist.splice(index, 1, { name: "rank_filter", label: `Rank: ${inputminRank} - ${inputmaxRank}` })
    }
    else {
      filterlist.push({ name: "rank_filter", label: `Rank:${inputminRank} - ${inputmaxRank}` })
    }
    setChipData(filterlist)
  }
  const addPriceTag = () => {
    let filterlist = chipData;
    const hasPriceFilterFilter = filterlist.find((element) => element.name == "price_filter")
    if (hasPriceFilterFilter) {
      const index = filterlist.findIndex((element) => element.name == "price_filter")
      filterlist.splice(index, 1, { name: "price_filter", label: `Price: ${inputminPrice} - ${inputmaxPrice}` })
    }
    else {
      filterlist.push({ name: "price_filter", label: `Price: ${inputminPrice} - ${inputmaxPrice} ETH` })
    }
    setChipData(filterlist)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChangeId = (event) => {
    const value = event.target.value;
    setInputId(value)
  }
  const handleChangeMinRank = (event) => {
    const value = event.target.value;
    setinputMinRank(value)
  }
  const handleChangeMaxRank = (event) => {
    const value = event.target.value;
    setinputMaxRank(value)
  }
  const applyRank = (event) => {
    if (inputminRank || inputmaxRank) {
      addRankTag()
      sethasRankFilter(true)
    }
    else {
      sethasRankFilter(false)
    }
    if (inputminRank)
      setMinRank(parseInt(inputminRank))
    else
      setMinRank(0)
    if (inputmaxRank)
      setMaxRank(parseInt(inputmaxRank))
    else
      setMaxRank(9999999)
  }
  const handleChangeMinPrice = (event) => {
    const value = event.target.value;
    setinputMinPrice(value)
  }
  const handleChangeMaxPrice = (event) => {
    const value = event.target.value;
    setinputMaxPrice(value)
  }
  const applyPrice = (event) => {
    if (inputminPrice || inputmaxPrice) {
      addPriceTag()
      sethasPriceFilter(true)
    }
    else {
      sethasPriceFilter(false)
    }
    if (inputminPrice)
      setMinPrice(parseInt(inputminPrice))
    else
      setMinPrice(0)
    if (inputmaxPrice)
      setMaxPrice(parseInt(inputmaxPrice))
    else
      setMaxPrice(9999999)
  }
  const buyNowAction = (event) => {
    if (isBuy) {
      setVariant("outlined")
      setIsBuy(false)
    }
    else {
      setVariant("contained")
      setIsBuy(true)
    }
  }
  const searchToken = (event) => {
    setTokenId(inputId)
    if (applySearch) {
      setApplySearch(false)
    }
    else {
      setApplySearch(true)
    }
  }


  const buttons = [
    <ThemeProvider theme={theme}>
      <Button key="one" color="primary" variant={variant} onClick={() => { buyNowAction() }}>Buy now</Button>
      <Button key="two" variant="outlined">on Auction</Button>
    </ThemeProvider>
  ];


  const drawer = () => {
    return (
      <div>

        <ThemeProvider theme={theme}>
          <Toolbar />
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch', marginTop: '20px' },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="token-container">
              <div className="token-text">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Token id"
                  sx={{ width: "19.3ch", marginRight: '0.2ch' }}
                  maxRows={1}
                  value={inputId}
                  onChange={(event) => setInputId(event.target.value)}
                  onClick={() => { setShowSearchText("block") }}
                />
              </div>
              {/* <IconButton color='primary' onClick={() => { setTokenId(inputId) }} aria-label="search" size="small" sx={{ flexGrow: 1 }}>
                <SearchIcon />
              </IconButton> */}
              <Button sx={{ maxWidth: '6.5ch', minWidth: '6.5ch' }} color='primary' onClick={() => searchToken()} variant="contained" ><SearchIcon /></Button>

            </div>

            <Box component="div" sx={{ display: showSearchText }}>
              You can enter a list of ids with using commas, eg.1,2,3
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup aria-label="medium button group">
              {buttons}
            </ButtonGroup>
          </Box>
          <div>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              {/* <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sortOption={sortOption}
                onInputChange={(event, newSortOption) => {
                  setSortOption(newSortOption);
                  sethasSortOption(true)
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Sort by" />}
              /> */}
              <TextField
                id="outlined-select-currency"
                select
                label="Sort By"
                onChange={handleChangeOption}
              // helperText="Sort by"
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </div>

          <Divider sx={{ marginTop: "10px" }}>
            <Chip color="secondary" label="Rank" />
          </Divider>
          <div className="rank-box">
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '11ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Min"
                maxRows={1}
                value={inputminRank}
                onChange={handleChangeMinRank}
              />
            </Box>
            <p>-</p>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '11ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Max"
                maxRows={1}
                value={inputmaxRank}
                onChange={handleChangeMaxRank}
              />
            </Box>
          </div>
          <div classNAme="apply-rank-btn">
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}>
              <Button color="primary" variant="contained" endIcon={<SendIcon />} onClick={() => { applyRank() }}>Apply</Button>
            </Box>
          </div>
          <Divider sx={{ marginTop: "10px" }}>
            <Chip color="secondary" label="Price" />
          </Divider>
          <div className="price-box">
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '11ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Min"
                maxRows={1}
                value={inputminPrice}
                onChange={handleChangeMinPrice}
              />
            </Box>
            <p>-</p>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '11ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Max"
                maxRows={1}
                value={inputmaxPrice}
                onChange={handleChangeMaxPrice}
              />
            </Box>
          </div>
          <div classNAme="apply-price-btn">
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}>
              <Button color="primary" variant="contained" endIcon={<SendIcon />} onClick={() => { applyPrice() }}>Apply</Button>
            </Box>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {chipData.map((data) => {
                return (
                  <ListItem key={data.key} className="filter-area">
                    <Chip
                      color="secondary"
                      label={data.label}
                      onDelete={handleDelete(data)}
                    />
                  </ListItem>
                );
              })}
            </Paper>
            <Box sx={{ display: { xs: 'block', sm: 'none' }}}>
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
                <Divider />
            </Box>
          </div>
        </ThemeProvider>

      </div>
    )
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar className="toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, zIndex: (theme) => theme.zIndex.drawer + 10 }}
            >
              <MenuIcon />
            </IconButton>
            <Navigationbar/>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
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
          {drawer()}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer()}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

        <Toolbar />

        <Collection
          urlname={props.urlname}
          isBuy={isBuy}
          inputId={tokenId}
          sortOption={sortOption}
          hasSortOption={hasSortOption}
          hasRankFilter={hasRankFilter}
          minRank={minRank}
          maxRank={maxRank}
          hasPriceFilter={hasPriceFilter}
          minPrice={minPrice}
          maxPrice={maxPrice}
          applySearch={applySearch}
        />

      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

