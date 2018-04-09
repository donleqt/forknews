const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.resolve('dist')));
app.listen(process.env.PORT || 8080);
