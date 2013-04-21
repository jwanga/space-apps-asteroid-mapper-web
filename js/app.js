var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , cv = require('opencv')

app.listen(8080); // I changed the port from 80 to 8080 incase you are running a web server
var arDrone = require('ar-drone');
var client = arDrone.createClient();
var png = client.createPngStream({ log : process.stderr });
png.on('error', function (err) {
        console.error('png stream ERROR: ' + err);
    });

png.on('data', sendPng);

var i = 0;
function handler (req, res) {
  fs.readFile(__dirname + '/../index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

function sendPng(buffer) {
  i += 1;
  fs.writeFile("/tmp/png_data/pic"+i+".png", buffer, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
  });
}

io.sockets.on('connection', function (socket) {
  
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });



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