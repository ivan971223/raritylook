import * as React from 'react';
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './ItemDialog.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const ItemDialog = (props) => {
  const { open, onClose, name, token_id, opensea_url, image_url,
    curr_price, symbol,last_price,last_sale_symbol, traits, total_score, rank } = props
  const theme = useTheme();

  const showPrice = () => {
    if (curr_price > 0)
      return (
        <div className="price">For sale: {curr_price} {symbol}</div>
      )
  }
  const showLastPrice = () => {
    if (last_price > 0)
      return (
        <div>
          <div className="last-price"> {last_price} {last_sale_symbol}</div>
          <div className="last">Last </div>
        </div>
        
      )
  }
  return (
    <Dialog fullWidth="md" maxWidth="md" onClose={onClose} open={open}>
      <div className="container">
        <div className="card-left">
          <div>Rarity Rank #{rank}</div>
          <img src={image_url} alt="image"></img>
          <p>{name}{showPrice()}</p>
          <p>{showLastPrice()}</p>
          
        </div>
        <div className="card-right">
          {traits.map(e => (
            <div className="trait_container">
              <div className="trait_box_top">
                <div className="box-1">
                  {e.trait_type}
                  <div className="box-2">+{e.rarity_score}</div>
                </div>
              </div>
              <div className="trait_box_bot">
                <div className="box-3">
                  {e.value}
                  <div className="box-4">{e.trait_count}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="box-5">
            <p>Rarity Score</p>
            <div>{total_score}</div>
          </div>
          <a href={opensea_url} target="_blank" class="opensea-link">
            <img src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20Light.png" />
            </a>
        </div>
      </div>
    </Dialog>
  );
}
export default ItemDialog