var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbserial-A601FDN8", {
    baudrate: 9600
  });

var io = require('socket.io').listen(8015, { log: false });
var socket, emitBuffer;

io.sockets.on('connection', function (conn) {
  console.log('socket io connected');
  socket = conn;
  var i = 0

  setInterval(function(){
    console.log(emitBuffer);
    socket.emit('ping', emitBuffer);
    i++;
}, 750);
 
});


var readBuffer = "";

serialPort.on("open", function () {

  console.log('open');
  serialPort.on('data', function(data) {
    var z;
    readBuffer += data.toString();

    if(readBuffer.indexOf('\n') != -1){ 
      //if(socket){
        z = parseInt(readBuffer);
        if(z && z !== null){
          emitBuffer = {x:0,y:0,z:z};
          }
      //}
      readBuffer = "";
    }
    

  });   
});
