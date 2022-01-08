import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://https://rarity-look.herokuapp.com'
})

export default instance