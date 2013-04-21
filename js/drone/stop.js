var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();
var client = arDrone.createClient();

client.land();