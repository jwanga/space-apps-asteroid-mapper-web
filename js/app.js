var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080); // I changed the port from 80 to 8080 incase you are running a web server
var png = null;
var client = null;

function handler (req, res) {
  // fs.readFile(__dirname + '/index.html',
  // function (err, data) {
  //   if (err) {
  //     res.writeHead(500);
  //     return res.end('Error loading index.html');
  //   }

  //   res.writeHead(200);
  //   res.end(data);
  // });
  if (!client)
  {
    res.writeHead(404);
    return;
  }
  if (!png) {
      png = client.createPngStream({ log : process.stderr });
      png.on('error', function (err) {
          console.error('png stream ERROR: ' + err);
      });
    }
  res.writeHead(200, { 'Content-Type': 'multipart/x-mixed-replace; boundary=--daboundary' });
  png.on('data', sendPng);

  function sendPng(buffer) {
    console.log(buffer.length);
    res.write('--daboundary\nContent-Type: image/png\nContent-length: ' + buffer.length + '\n\n');
    res.write(buffer);
  }
}


io.sockets.on('connection', function (socket) {
  
  socket.emit('news', { hello: 'world' });
  


  socket.on('my other event', function (data) {
    console.log(data);
  });


  var arDrone = require('ar-drone');
  client = arDrone.createClient();

  socket.on('moving' , function(data){
    // client.config('general:navdata_demo', 'FALSE');

    if( data.my == 'take-off' ){

      client.takeoff();

      console.log("took off");
    
    } else if( data.my == 'left' ){

      client.left(.2);

      console.log("went left");
    
    } else if( data.my == 'right' ){

       client.right(.2);

      console.log("went right");

    } else if( data.my == 'land' ){

      client.stop();
      client.land();

      console.log("just landed");
    } else {

      console.log('no action');
    }



// data = []

// client
//   .after(10000, function() {
//     this.front(0.1);
//   })
//   .after(3000, function() {
//     this.stop();
//     this.land();
//     console.log(JSON.stringify(data));
//   });



    // console.log( data );





  });


});