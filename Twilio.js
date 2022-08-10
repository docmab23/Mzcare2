const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')("AC935ee7307449bece15a765669166e634"
  ,"d4d6c2d609c775ded00a85fc14a8e407"
);

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
      from: +17408753450 ,
      to:  req.query.to,
      body: "Hi Bro!"
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
client.fax.faxes
  .create({
     from: +17408753450,
     to: req.query.to,
     mediaUrl: req.query.fileURL
   })
  .then(fax => 
      console.log(fax.sid)
  ).catch(error => 
      console.log(error)
  );

});
app.get('/api/try', (req, res) => {
      const name_= req.params.name;
      res.send(JSON.stringify(name_));
    });
    
app.listen(3000, () =>
  console.log('Express server is running on localhost:8080')
);

