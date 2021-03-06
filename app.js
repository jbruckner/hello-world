var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', (req, res) => {
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);

    var newObject = { 'cookie': randomNumber,
                    'date' : (new Date()).getTime() };
    
    let rawdata = fs.readFileSync('./src/sessions.json'); 
    let data = JSON.parse(rawdata);

    var i;
    for (i = 0; i < data.sessions.length; i++) {
        var date = data.sessions[i].date;
        var timeDif = (new Date()).getTime() - date;
        if ((30 * 1000) < timeDif) {
            data.sessions.splice(i, 1);
        } 
    }


    data.sessions.push(newObject);
    fs.writeFileSync('./src/sessions.json', JSON.stringify(data));

    res.send('ok');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});