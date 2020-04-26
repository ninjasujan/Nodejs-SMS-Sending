const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const nexmo = require('nexmo');

//init app
const app = express();

// init Nexmo
const nexmoOb = new nexmo(
  {
    apiKey: '7b777576',
    apiSecret: 'RhUhSBrVSctLmw0e',
  },
  { debug: true }
);

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// public folder setup
app.use(express.static(__dirname + '/public'));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
  const number = req.body.number;
  const text = req.body.text;
  nexmoOb.message.sendSms(
    '917022406442',
    number,
    text,
    {
      type: 'unicode',
    },
    (err, resdata) => {
      if (err) {
        console.log('err');
      } else {
        console.dir(resdata);
        // GET data from response
        const data = {
          id: resdata.messages[0]['message-id'],
          number: resdata.messages[0]['to'],
        };
        io.emit('smsStatus', data);
      }
    }
  );
});

// server setup
const port = 5000;
const server = app.listen(port, () => {
  console.log(`server running in port ${port}`);
});

const io = socketIo(server);
io.on('connection', () => {
  console.log('connected');
  io.on('disconnect', () => {
    console.log('disconnected');
  });
});
