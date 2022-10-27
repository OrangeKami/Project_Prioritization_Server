var { app, PORT, HOST } = require("./server");

const server = app.listen(PORT, HOST, () => {
  if (server.address().port !== PORT) {
    PORT = server.address().port;
  }

  console.log(`
    ExpressJS Demo server is now running!
    Server address mapping is:
    
    HOST: ${HOST}
    PORT: ${PORT}
    Congrats!
  `);
});
