// http://localhost:5000
// http://localhost:5000/news

let express = require('express');

let app = express();
let cors = require("cors");

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

let i = 1;

let newField1 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];
let newField2 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

const fields = [];
fields.push(newField1);
fields.push(newField2);


app.post("/field", function(req, res) {
    // i++;
    // res.send(`${i}`);
    const field = fields[req.body.playerId];
    res.send(field);
    
});

app.listen(5000, function() {
    console.log('Our srever is ready');
})

app.post("/move", function(req, res){
    const columnId = req.body.column;
    const field = fields[req.body.playerId];
    field[columnId] = [7,7,7,7,7,7];
    res.send(field);
});