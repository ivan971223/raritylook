import React, { useEffect, useState } from 'react'
import './Collection.css'
import axios from '../axios'
import async from 'async'
import NoteCard from './NoteCard'
// import Pusher from 'pusher-js'
// import db from '../firebase'
import { set } from 'mongoose'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { CallToAction } from '@mui/icons-material'

// const pusher = new Pusher('b00d611f9490bd8f0e79', {
//     cluster: 'ap1'
//   });

const Collection = ({ urlname, isBuy, inputId, sortOption, hasSortOption, hasRankFilter, minRank, maxRank, hasPriceFilter, minPrice, maxPrice, applySearch }) => {
    // const [profilePic, setProfilePic] = useState('')
    const [itemsData, setItemsData] = useState([])
    const [currItemsData, setCurrItemsData] = useState([])
    const [filterOption, setFilterOption] = useState([])
    const [pageNumbers, setPageNumbers] = useState([])
    const [page, setPage] = React.useState(1);
    const [tokenID, setTokenID] = useState("")
    const [message, setMessage] = useState("")
    const [err, setError] = useState("")

    const itemPerPage = 40
    const timer = React.useRef();

    const handleChange = (event, value) => {
        setPage(value);
    };

    const calculatePageNumber = (data) => {
        const pageTotalNum = Math.ceil(data.length / itemPerPage)
        setPageNumbers(pageTotalNum)
    }

    const updatePageNumber = (number, data) => {
        const indexofLastItem = number * itemPerPage - 1
        const indexofFirstItem = itemPerPage * (number - 1)
        setCurrItemsData(data.slice(indexofFirstItem, indexofLastItem + 1))
    }

    const searchToken = (inputId) => {
        let array = inputId.replace(/\s/g, '').split(",")
        let searchData = []
        array.map((e) => {
            const data = itemsData.find((item) => { return item.token_id === e })
            if (data) {
                searchData.push(data)
            }
        });
        if (!searchData.length && inputId) {
            setCurrItemsData(itemsData.slice(0, itemPerPage))
            setMessage(`Token ${inputId} is not found`)
        }
        else if (!inputId) {
            filter()
            setMessage("")
        }
        else {
            setCurrItemsData(searchData)
            calculatePageNumber(searchData)
            setMessage("")
        }

    }

    const sortbyPriceDes = (b, a) => {
        return a.curr_price - b.curr_price
    }
    const sortbyPriceAsc = (a, b) => {
        return a.curr_price - b.curr_price
    }
    const sortbyRarity = (b, a) => {
        return a.total_score - b.total_score
    }
    const sortbyListTime = (b, a) => {
        return a.listing_time - b.listing_time
    }
    const sortToken = (sortOption, searchData) => {
        switch (sortOption) {
            case "Rarity":
                searchData = searchData.sort(sortbyRarity)
                break;
            case "Price: High to Low":
                searchData = searchData.sort(sortbyPriceDes)
                break;
            case "Price: Low to High":
                searchData = searchData.sort(sortbyPriceAsc)
                break;
            case "Recently Listed":
                searchData = searchData.sort(sortbyListTime)
                break;

            default:
                break;

        }
        return searchData
    }

    const hasCurrPrice = (item) => {
        return item.curr_price > 0
    }
    const buyNow = (searchData) => {
        searchData = searchData.filter(hasCurrPrice)
        return searchData
    }
    const filterMinRank = (item) => {
        return item.rank >= minRank
    }
    const filterMaxRank = (item) => {
        return item.rank <= maxRank
    }

    const rankFilter = (searchData) => {
        if (maxRank)
            searchData = searchData.filter(filterMaxRank)
        if (minRank)
            searchData = searchData.filter(filterMinRank)
        return searchData
    }
    const filterMinPrice = (item) => {
        return item.curr_price >= minPrice
    }
    const filterMaxPrice = (item) => {
        return item.curr_price <= maxPrice
    }

    const priceFilter = (searchData) => {
        if (maxPrice)
            searchData = searchData.filter(filterMaxPrice)
        if (minPrice)
            searchData = searchData.filter(filterMinPrice)
        return searchData
    }

    const filter = () => {
        let filterData = itemsData
        if (isBuy) {
            filterData = buyNow(filterData)
        }
        if (hasRankFilter) {
            filterData = rankFilter(filterData)
        }
        if (hasPriceFilter)
            filterData = priceFilter(filterData)
        if (hasSortOption)
            filterData = sortToken(sortOption, filterData)

        calculatePageNumber(filterData)

        if (page == 1) {
            setCurrItemsData(filterData.slice(0, itemPerPage))
        }
        else {
            updatePageNumber(page, filterData)
        }

    }

    async function syncCollection() {
        try {
            const firstpageResult = await axios.get('/retrieve/firstpage?name=' + urlname)
            setCurrItemsData(firstpageResult.data)
            const itemdataResult = await axios.get('/retrieve/nftcollections?name=' + urlname)
            setItemsData(itemdataResult.data)
        } catch (err) {
            setError(err);
            console.log(err);
        }
    console.log(currItemsData);

    }

    useEffect(() => {
        console.log(urlname);
        syncCollection()
    }, [urlname])

    useEffect(() => {
        setTokenID(inputId)
        searchToken(inputId)
        setPage(1)
    }, [inputId, applySearch])

    useEffect(() => {
        console.log(isBuy, sortOption, minRank, maxRank, hasRankFilter, minPrice, maxPrice, hasPriceFilter, page);
        filter()
    }, [isBuy, sortOption, minRank, maxRank, hasRankFilter, minPrice, maxPrice, hasPriceFilter, page, itemsData])

    useEffect(() => {
        if (page != 1) {
            setPage(1)
        }
    }, [isBuy, sortOption, minRank, maxRank, hasRankFilter, minPrice, maxPrice, hasPriceFilter, inputId, applySearch,urlname])

    useEffect(() => {
        calculatePageNumber(itemsData)
    }, [itemsData])

    useEffect(() => {

    }, [filterOption])


    
    return (

        <div>
            <div className="search_message">{message}</div>
            <Box sx={{ height: 50 }}>
                <Stack spacing={2}>
                    <div className="pagination">
                        <Typography>Page: {page}</Typography>
                        <Pagination color="primary" count={pageNumbers} page={page} onChange={handleChange} />
                    </div>
                </Stack>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 4, lg: 4, xl: 8, xxl: 10 }}>
                {currItemsData.map(entry => (
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
                            isBuy={isBuy}
                            hasRankFilter={hasRankFilter}
                            hasPriceFilter={hasPriceFilter}
                            sortOption={sortOption}
                            page={page}
                            inputId={inputId}
                        />
                    </Grid>
                ))}
            </Grid>

        </div>

    )
}

export default Collection
