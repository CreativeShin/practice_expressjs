const express = require('express');
const bookRouter = express.Router();

bookRouter.route('/')
 .get((req, res)=>{
    res.send('/books rout here.')
});

module.exports = bookRouter;