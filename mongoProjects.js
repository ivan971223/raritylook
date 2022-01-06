import mongoose from 'mongoose'

const projectModel = mongoose.Schema({
    name: String,
    description: String,
    image_url: String,
    discord_url: String,
    twitter_username: String,
    instagram_username: String,
    external_url: String
},
{ collection: "nftprojects" })

export default mongoose.model('nftprojects', projectModel)