const express = require('express')
const cors = require('cors');
// const path = require('path')

const app = express()

app.set('port', process.env.PORT || 3001)
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(app.router)
// app.use(express.static(path.join(__dirname, 'public')))

let clients = [];
let facts = [];

function eventsHandler(req, res, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(facts)}\n\n`;
  
    res.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      res
    };
  
    clients.push(newClient);
  
    req.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
};

function sendEventsToAll(newFact) {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(newFact)}\n\n`))
  };
  
async function addFact(req, res, next) {
    try {
        const newFact = req.body;
        console.log(newFact);
        facts.push(newFact);
        res.json({data: newFact})
        return sendEventsToAll(newFact);
    } catch (err) {
        console.log(err);
        res.json({"err": err})
    }
};

app.get('/status', (req, res) => res.json({clients: clients.length}));

app.get('/events', eventsHandler);

app.post('/fact', addFact);


const server = app.listen(app.get('port'), ()=> {
  console.log('listening on port', app.get('port'));
})

// unhandled rejections
process.on('unhandledRejection', async(err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close();
  process.exit(1);
});