import axios from 'axios'
import { setJson,getJson } from "./redis"

const express = require('express')
const app = express();

app.listen(3000);
console.log('server running on port 3000')
app.get('/', async (req:any,res:any) =>{
    res.json('server running');
})
app.get('/characters', async (req:any,res:any) =>{
    const response= await axios.get("https://rickandmortyapi.com/api/character")
    setJson(response.data);
    getJson('area:trigger:kiwibot55');
    res.json(response.data);
})
