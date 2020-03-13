// Node package esile kutsumine.
const express = require('express');
const bodyParser = require('body-parser');
const todayDate = require(__dirname + '/dateController.js');

// Express kasutamine.
const app = express();
app.use(express.static('public'));

// Body parser kasutamine.
app.use(bodyParser.urlencoded({extended: true}));

// Ejs ühendamine.
app.set('view engine', 'ejs');

// Pordi sätestamine.
var port = 8080;

// Listi elementide salvestamiseks massiiv.
var items = [];
var itemsStudy = [];

// Kui portiga ühendatakse.
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
});

app.get('/', (req, res)=>{
    let day = todayDate.getCurrentDate();

    res.render('index', {
        listTitle: day,
        listItems: items
    });
});

app.post('/', (req, res)=>{
    var item = req.body.newItem;
    if(req.body.list == "Study TODO"){
        itemsStudy.push(item);
        res.redirect('/study');
        console.log(itemsStudy);
    } else {
        items.push(item);
        res.redirect('/');
        console.log(items);
    }
});

app.get('/study', (req, res)=>{
    res.render('index', {
        listTitle: "Study TODO",
        listItems: itemsStudy
    })
});