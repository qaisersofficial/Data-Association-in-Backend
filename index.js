const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('This Project is about Data Association in Backend');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    
});