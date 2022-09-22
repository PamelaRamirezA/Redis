import axios from 'axios'

const express = require('express')
const app = express();
const redis = require('redis');

const redisClient = redis.createClient({
    host: "localhost",
    port: 6379
})

redisClient.connect();

app.listen(3000);
console.log('server running on port 3000')
app.get('/', async (req:any,res:any) =>{
    res.json('server running');
})
app.get('/characters', async (req:any,res:any) =>{
    const response= await axios.get("https://rickandmortyapi.com/api/character")
    redisClient.set('characters2',JSON.stringify(response.data))
    redisClient.set('test2',JSON.stringify(response.data))

    res.json(response.data);
})

