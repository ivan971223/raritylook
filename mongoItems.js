import mongoose from 'mongoose'

const itemModel = mongoose.Schema({
    name: String,
    token_id: String,
    image_url: String,
    opensea_url: String,
    curr_price: String,
    symbol: String,
    rank: Number,
    total_score: Number,
    listing_time: Number,
    last_price: String,
    last_sale_symbol: String
},
{ collection: "nftcollections" })

export default mongoose.model('nftcollections', itemModel)