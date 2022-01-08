import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://rarity-look.herokuapp.com/'
})

export default instance