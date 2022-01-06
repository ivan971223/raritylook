//importing stuff

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
// import GridFsStorage from 'multer-gridfs-storage'
// import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import path from 'path'
import Pusher from 'pusher'
import mongoProjects from './mongoProjects.js'
import mongoUpcoming from './mongoUpcoming.js'
import mongoFavourite from './mongoFavourite.js'

const path = require("path")

// Grid.mongo = mongoose.mongo
require("dotenv").config({path:"./config.env"});
//app config
const app = express()
const port = process.env.PORT || 9000

// const pusher = new Pusher({
//     appId: "1215317",
//     key: "b00d611f9490bd8f0e79",
//     secret: "cd2c00f306b6756ddfaf",
//     cluster: "ap1",
//     useTLS: true
//   });

//middlewares
app.use(bodyParser.json());
app.use(cors())


//db config
const mongoURI = 'mongodb+srv://admin:admin@serverlessinstance0.qt9z7.mongodb.net/nftProjectDB?retryWrites=true&w=majority'

const conn = mongoose.createConnection(mongoURI, {
});

const connection = mongoose.connect(mongoURI)

mongoose.connection.once('open', () => {
    console.log('DB Connected')

    // const changeStream = mongoose.connection.collection('posts').watch()

    // changeStream.on('change', (change)=>{
    //     console.log(change)

    //     if(change.operationType==='insert'){
    //         console.log('Triggering Pusher')

    //         pusher.trigger('posts', 'inserted', {
    //             change: change
    //         })
    //     } else {
    //         console.log('Error triggering Pusher')
    //     }
    // })
})

//api routes
app.get('/', (req, res) => res.status(200).send('hello World'))

app.get('/retrieve/nftcollections', (req, res) => {
    const itemModel = new mongoose.Schema({
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
    }, { collection: req.query.name })
    let mongoItems
    try {
        mongoItems = mongoose.model(req.query.name)
    } catch (error) {
        mongoItems = mongoose.model(req.query.name, itemModel)
    }
    // const mongoItems = mongoose.model(req.query.name, itemMdel)
    console.log(req.query.name);
    try {
        mongoItems.find().sort({ total_score: -1 }).exec(function (err, data) {
            res.status(200).send(data);
        })
    } catch (error) {
        res.status(500).send(error);
    };
})

app.get('/retrieve/firstpage', (req, res) => {
    const itemModel = new mongoose.Schema({
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
    }, { collection: req.query.name })
    let mongoItems
    try {
        mongoItems = mongoose.model(req.query.name)
    } catch (error) {
        mongoItems = mongoose.model(req.query.name, itemModel)
    }
    console.log(req.query.name);
    try {
        mongoItems.find().sort({ total_score: -1 }).limit(40).exec(function (err, data) {
            res.status(200).send(data)

        })
    } catch (error) {
        res.status(500).send(error);
    };
})
// app.get('/project_name', (req,res)=>{
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(names);
//         }
//         res.status(200).send(names) 
//         mongoose.connection.close();
//       });
// })

app.post('/upload/favourite', (req, res) => {
    const dbFav = req.body

    mongoFavourite.create(dbFav, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }

    })

})

app.get('/retrieve/nftfavourite', (req, res) => {

    console.log(req.query.uid);
    try {
        mongoFavourite.find().exec(function (err, data) {
            res.status(200).send(data);
        })
    } catch (error) {
        res.status(500).send(error);
    };
})

app.get('/retrieve/projects', (req, res) => {
    try {
        mongoProjects.find().exec(function (err, data) {
            res.status(200).send(data);
        })
    } catch (error) {
        res.status(500).send(error);
    };
})

app.get('/retrieve/upcoming', (req, res) => {
    try {
        mongoUpcoming.find().sort({ date: 1 }).exec(function (err, data) {
            res.status(200).send(data);
        })
    } catch (error) {
        res.status(500).send(error);
    };
})

if (process.env.NODE_ENV === "production"){
    app.use(express.static("nft_web/build"));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(_dirname,'nft_web','build','index.html'));
    })
}

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`))