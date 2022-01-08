import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://rarity-look.herokuapp.com'
})

export default instance