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

      console.log('starting');
      socket.emit('moving-back', 'starting');

      // require('tty').setRawMode(true);

      client.disableEmergency();      
      client.takeoff();

      console.log("took off");
      socket.emit('moving-back', 'Took Off');

    } else if( data.my == 'left' ){

      client.left(.05);

      console.log("went left");
      socket.emit('moving-back', 'Going Left');

    
    } else if( data.my == 'right' ){

       client.right(.05);

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

      client.front(.05);

      console.log("forward");
      socket.emit('moving-back', 'Forward');
      
    } else if( data.my == 'back' ){

      client.back(.05);

      console.log("backwards");
      socket.emit('moving-back', 'Backwards');
      
    } else if( data.my == 'steady' ){

      client.up(0);

      console.log("Steady");
      socket.emit('moving-back', 'Steady');
      
    } else if( data.my == 'clockwise' ){

      client.clockwise(.05);

      console.log("Rotating Clockwise");
      socket.emit('moving-back', 'Rotating Clockwise');
      
    } else if( data.my == 'counter-clockwise' ){

      client.counterClockwise(.05);

      console.log("Rotating Counter Clockwise");
      socket.emit('moving-back', 'Rotating Counter Clockwise');
      
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