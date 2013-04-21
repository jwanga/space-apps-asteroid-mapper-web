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

      console.log('starting');
      socket.emit('moving-back', 'starting');

      // require('tty').setRawMode(true);

      client.disableEmergency();      
      client.takeoff();

      console.log("took off");
      socket.emit('moving-back', 'Took Off');

    } else if( data.my == 'left' ){

      client.left(.2);

      console.log("went left");
      socket.emit('moving-back', 'Going Left');

    
    } else if( data.my == 'right' ){

       client.right(.2);

      console.log("went right");
      socket.emit('moving-back', 'Going Right');

    } else if( data.my == 'land' ){

      socket.emit('moving-back', 'Preparing to land');

      client.stop();
      client.land();

      console.log("just landed");
      socket.emit('moving-back', 'Landed');
    }
    else if( data.my == 'up' ){

      client.stop();
      client.up(.1);

      console.log("went up a little");
      socket.emit('moving-back', 'A little up');
    }
    else if( data.my == 'down' ){

      client.stop();
      client.down(.1);

      console.log("went down a little");
      socket.emit('moving-back', 'A little down');


    } else if( data.my == 'reset' ){

      client.disableEmergency();

      console.log("reseted");
      socket.emit('moving-back', 'Reset');
      
    } else if( data.my == 'front' ){

      client.front(.15);

      console.log("forward");
      socket.emit('moving-back', 'Forward');
      
    } else if( data.my == 'back' ){

      client.back(.15);

      console.log("backwards");
      socket.emit('moving-back', 'Backwards');
      
    } else if( data.my == 'steady' ){

      client.front(0);

      console.log("Steady");
      socket.emit('moving-back', 'Steady');
      
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