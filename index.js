const express = require('express');
const productsRouter = require('./routers/productsRoute');

const PORT = 3000;
const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.listen(PORT, () => console.log('server running on port 3000'));
