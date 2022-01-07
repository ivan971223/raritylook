import * as React from 'react';
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Dialog } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { CardActionArea } from '@mui/material';
import ItemDialog from './ItemDialog'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import Divider from '@mui/material/Divider';
import './NoteCard.css'
import { ReactComponent as EthIcon } from './Ethereum-Logo.svg';
import * as imageConversion from 'image-conversion';
import axios from '../axios'
import { getAuth } from "firebase/auth";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9e9e9e'
    },
    secondary: {
      // light: 这将从 palette.primary.main 中进行计算，
      main: '#e91e63',
      light: "#f27573",
      dark: "#a73a38"
      // dark: 这将从 palette.primary.main 中进行计算，
      // contrastText: 这将计算与 palette.primary.main 的对比度
    },

  },
})

const NoteCard = ({ name, token_id, image_url, opensea_url, curr_price, symbol, last_price, last_sale_symbol, traits, total_score, rank, isBuy, hasRankFilter, hasPriceFilter, sortOption, page, inputId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [favouriteColor, setFavouriteColor] = useState("primary");
  const [openDialog, setOpenDialog] = React.useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const onLoad = (event) => {
    console.log("loaded");
    setIsLoading(false)
  }
  const onLoadStart = (event) => {
    console.log("loaded");
    setIsLoading(true)
  }

  const handleClick = () => {
  };

  const handleCloseDialog = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDialog(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseDialog}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseDialog}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const saveFavourite = async (postData) => {
    await axios.post('/upload/favourite', postData)
      .then((res) => {
        console.log(res)
      })
  }

  const handleFavourite = () => {
    //check if user otherwise alert to login
    //upload to the db
    //change icon color to red
    if (user) {
      const uid = user.uid;
      console.log(traits);
      const postData = { traits, uid, name, token_id, image_url, opensea_url, curr_price, symbol, last_price, last_sale_symbol, total_score, rank }
      saveFavourite(postData)
      setFavouriteColor("secondary")
    } else {
      setOpenDialog(true);
    }
  }

  const displayPriceSymbol = () => {
    if (symbol == "ETH") {
      return (
        <SvgIcon component={EthIcon} viewBox="0 0 600 476.6" />
      )
    }
  }
  const showCurrPrice = () => {
    if (curr_price > 0)
      return (
        <div>{curr_price}</div>
      )
    else
      return (
        <div>&nbsp;</div>
      )
  }
  const showLastPrice = () => {
    if (last_price > 0)
      return (
        <div className="card-thirdline">
          <div className="last-price-text">Last</div>
          <div>{last_price} {last_sale_symbol}</div>
        </div>

      )
    else
      return (
        <div className="card-thirdline">
          <div className="last-price-text">&nbsp;</div>
        </div>
      )
  }

  // async function compressImage() {
  //   const blobObj = await imageConversion.urltoBlob(image_url)
  //   const compressedImage = await imageConversion.compressAccurately(blobObj, {
  //     size: 20,    //The compressed image size is 100kb
  //     accuracy: 0.9,//the accuracy of image compression size,range 0.8-0.99,default 0.95;
  //     //this means if the picture size is set to 1000Kb and the
  //     //accuracy is 0.9, the image with the compression result
  //     //of 900Kb-1100Kb is considered acceptable;
  //   })
  //   const dataURL = await imageConversion.filetoDataURL(compressedImage)
  //   console.log(dataURL);
  //   setImagesrc(dataURL)
  // }

  const cardMedia = () => {
    return (
      <div>
        <Box sx={{
          height: "20vh", maxHeight: "225px", width: "auto",
          display: isLoading ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <CircularProgress color="primary"
          />

        </Box>
        <CardMedia
          component="img"
          height="auto"
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          image={image_url}
          alt="img"
          sx={{ display: isLoading ? "none" : "block" }}
        />

      </div>
    )
  }

  useEffect(() => {
    setIsLoading(true)
  }, [page])



  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [isBuy, hasRankFilter, hasPriceFilter, sortOption, inputId])

  return (
    <div>
      <Box
        boxShadow={2}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={handleClickOpen}>
            <div className="card-header">#{rank}</div>
            {cardMedia()}
            <CardContent>
              <div className="card-container">
                <div className="card-firstline">
                  <div className="name-text">{name}</div>
                </div>
              </div>
              <div className="card-container-bot">
                <div className="price-text">
                  {displayPriceSymbol()}
                  {showCurrPrice()}
                </div>
                {showLastPrice()}
              </div>
            </CardContent>
          </CardActionArea>
          <Divider />
          <ThemeProvider theme={theme}>
          <IconButton color={favouriteColor} onClick={handleFavourite} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          </ThemeProvider>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

        </Card>
      </Box>

      <Snackbar open={openDialog} action={action} autoHideDuration={6000} onClose={handleCloseDialog}>
        <Alert severity="error">Please sign in first!</Alert>
      </Snackbar>

      <ItemDialog
        open={open}
        onClose={handleClose}
        name={name}
        token_id={token_id}
        opensea_url={opensea_url}
        image_url={image_url}
        curr_price={curr_price}
        symbol={symbol}
        last_price={last_price}
        last_sale_symbol={last_sale_symbol}
        traits={traits}
        total_score={total_score}
        rank={rank}
      />
    </div>
  );
}


export default NoteCard

