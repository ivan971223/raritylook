import mongoose from 'mongoose'

const upcomingModel = mongoose.Schema({
    imageurl : String,
    name : String,
    description : String,
    date : String,
    unitprice : String,
    twmember : String,
    dismember : String,
    twurl : String,
    igurl :String,
    disurl : String,
    weburl : String
},
{ collection: "upcoming" })

export default mongoose.model('upcoming', upcomingModel)