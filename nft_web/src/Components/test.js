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
import imageCompression from 'browser-image-compression';


async function compressImage(){
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
  };

  const compressedPic = await imageCompression.loadImage("https://lh3.googleusercontent.com/n48iXrExknbRu3UoBEV5Tx020Bi_Ae_GiKCgHWK4Z-hpzRqluZPdQkn8GxN_uvLl4RaaoSnnelH4dASiFjQx7_SYwF6P0xasLpBM")
  const compressedPic2 = await imageCompression.drawImageInCanvas(compressedPic)
  const compressedPic3 = await imageCompression.canvasToFile(compressedPic2)

  console.log(compressedPic3);
  console.log('compressed', compressedPic3.size);
  return compressedPic3
}

compressImage()