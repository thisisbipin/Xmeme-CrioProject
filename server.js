const Datastore = require('nedb');
const express = require('express');
const app = express();
const database = new Datastore('memes.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json());

app.get('/memes', async (req, res) => {
    console.log('Memes were fetched...');
    database.find({}, (err, data) => {
        res.send(data);
    });
    // res.send('spps');
});
app.get('/memes/:id', async (req, res) => {
    console.log('Memes were fetched...');
    database.find({ date: parseInt(req.params.id) }, (err, data) => {
        console.log(data);
        if (data.length === 0)
            res.status(404).send('404 not found!');
        else
            res.send(data);
    });
    // res.send('spps');
});

app.post('/memes', (req, res) => {
    console.log('trying to perform post');
    // console.log(req.body);
    if (isValidMeme(req.body)) {
        database.find({ name: req.body.name }, (err, data) => {
            console.log(data);
            if (data.length != 0)
                res.status(409).send({ state: "Author name already exists.." });
            else
                database.find({ url: req.body.url }, (err, data) => {
                    console.log(data);
                    if (data.length != 0)
                        res.status(409).send({ state: "Image URL already exists.." });
                    else
                        database.find({ caption: req.body.caption }, (err, data) => {
                            console.log(data);
                            if (data.length != 0)
                                res.status(409).send({ state: "Caption already exists.." });
                            else {
                                const id = Date.now();
                                const meme = {
                                    name: req.body.name,
                                    url: req.body.url,
                                    caption: req.body.caption,
                                    date: id
                                };
                                console.log('insert ho rha hai....');
                                database.insert(meme);
                                console.log(meme);
                                res.send(JSON.stringify({ id: id }));
                            }
                        });
                });

        });

    }
    else
        console.log({ state: 'Invalid Data' });



});


function isValidMeme(req) {
    if (!req.name || !req.url || !req.caption)
        return false;
    return true;
}
const port = process.env.PORT || 9999;
app.listen(port, () => console.log(`Listening on port ${port}...`));