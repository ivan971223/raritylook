import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Navigationbar from './Nav';
import axios from '../axios'
import { dividerClasses, Grid } from '@mui/material'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NoteCard from './NoteCard'
import Divider from '@mui/material/Divider';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext"

const Favourite = () => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const { currentUser } = useAuth()
    const [itemsData, setItemsData] = useState([])
    const [pageNumbers, setPageNumbers] = useState([])
    const [page, setPage] = React.useState(1);

    async function syncFavourite() {
        try {
            if (currentUser) {
                const itemdataResult = await axios.get('/retrieve/nftfavourite')
                setItemsData(itemdataResult.data)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(itemsData);

    }

    useEffect(() => {
        syncFavourite()
    }, [])

    return (

        <Box sx={{ p: 1, m: 1, display: 'flex', flexWrap: 'wrap' }}>
            <Box sx={{ p: 1, m: 1, marginBottom: '50px' }}>
                <Navigationbar />
            </Box>
            <Box component="main"
                sx={{
                    flexGrow: 1, p: 1,
                    m: 1, width: '100%'
                }}>
                <Box className="header" sx={{ fontSize: "30px" }}>My Favourite</Box>
                <Divider sx={{ marginBottom: "20px" }} />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 4, lg: 4, xl: 8, xxl: 10 }}>
                    {itemsData.map(entry => (
                        <Grid item xs={2} sm={4} md={1} lg={1} xl={1} xxl={1}>
                            <NoteCard
                                name={entry.name}
                                token_id={entry.token_id}
                                image_url={entry.image_url}
                                opensea_url={entry.opensea_url}
                                curr_price={entry.curr_price}
                                symbol={entry.symbol}
                                last_price={entry.last_price}
                                last_sale_symbol={entry.last_sale_symbol}
                                traits={entry.traits}
                                total_score={entry.total_score}
                                rank={entry.rank}
                            />
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </Box>
    )
}

export default Favourite