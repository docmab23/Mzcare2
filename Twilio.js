const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')("AC935ee7307449bece15a765669166e634"
  ,"d4d6c2d609c775ded00a85fc14a8e407"
);
const Phaxio = require('phaxio-official');
const phaxio = new Phaxio(process.env.PHAXIOKEY, process.env.PHAXIOSECRET);
 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: req.query.from_number,
      to:  req.query.to,
      body: req.query.body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.post('/api/fax', (req, res) => {
  phaxio.faxes.create({
    to: req.query.to, // Replace this with a number that can receive faxes.
    content_url: 'https://google.com',
    file: req.query.filepath,
  })
    .then((fax) => {
      // The `create` method returns a fax object with methods attached to it for doing things
      // like cancelling, resending, getting info, etc.
   
      // Wait 5 seconds to let the fax send, then get the status of the fax by getting its info from the API.
      return setTimeout(() => {
        fax.getInfo()
      }, 5000)
    })
    .then(status => console.log('Fax status response:\n', JSON.stringify(status, null, 2)))
    .catch((err) => { throw err; });
   
});
app.get('/api/try', (req, res) => {
      const name_= req.params.name;
      res.send(JSON.stringify(name_));
    });
    
app.listen(process.env.PORT || 5000, () =>
  console.log('Express server is running on localhost:5000')
);

