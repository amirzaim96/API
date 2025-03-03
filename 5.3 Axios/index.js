import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
let port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))


app.post('/', async (req, res) => {
    try {
        console.log(req.body)
        let typeChoice = req.body['type'];
        let partiChoice = req.body['participants'];
        let response = await axios.get(`http://localhost:4000/filter?type=${typeChoice}&participants=${partiChoice}`)
        let result = response.data[Math.floor(Math.random() * response.data.length)];
        console.log(result);
        res.render('index.ejs', {info: result});
    } catch (error) {
        console.log('No activities that match your criteria', error.message);
        res.render('index.ejs', {error: error.message})
    }
})

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/random');
        let result = response.data;
        res.render('index.ejs', {info: result})
    } catch (error) {
        console.error('Failed to make request', error.message);
        res.render('index.ejs', {error: error.message})
    }
    
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})