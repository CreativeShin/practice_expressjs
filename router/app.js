const express = require('express');
const app = express();
const path = require('path');

const bookRouter = require('./views/routes/bookrouter');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
});


app.listen(3000, ()=>{
    console.log('Server is running at port 3000.')
})