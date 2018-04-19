const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const listController = require('./controllers/listController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://haris799:Harmos12@ds151809.mlab.com:51809/list');

app.use(express.static('cssFiles'));
app.use(express.static('jsFiles'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'htmlFiles/index.html'));
});

app.get('/getList', (req, res) => {
    listController.getList((err, list) => {
        if (err) {
            console.error("Error");
        } else {
            res.send(list);
        }
    });
});

app.post('/createList', listController.createList);

app.post('/deleteList', listController.deleteList);

app.post('/updateList', listController.updateList);

app.listen(3000);