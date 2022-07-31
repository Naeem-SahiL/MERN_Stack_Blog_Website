import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import { routes } from '../Routes';

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/build')))

// mongodb://127.s0.0.1:27017
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/my-blog')
mongoose.connect('mongodb://127.0.0.1:27017/my-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => console.log('error in connecting db'))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
})

routes(app)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

app.listen(8000, () => console.log('Listening on port 8000'));