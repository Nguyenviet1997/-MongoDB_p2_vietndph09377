const express = require('express')
const expressHbs = require('express-handlebars');
const port = 3036

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path")

const app = express();

const viewspath = path.join(__dirname, "/views");
app.set("views",viewspath);
app.engine('.handlebars', expressHbs.engine());
app.set('view engine', '.handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://viet1997:viet2301@cluster0.fso1uhw.mongodb.net/cp17302?retryWrites=true&w=majority')
  .then(() => console.log('Kết nối thành công'))
  .catch((err) => console.log(err));

const SinhVienModel = require('./SinhVienModel');



app.get('/', async (req, res) => {
  try {
    let users = await SinhVienModel.find({}); 
    users = users.map((user) => user.toObject());
    res.render('list', { users });
  } catch (err) {
    console.log(err);
    res.status(500).send('ko thanh công');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});