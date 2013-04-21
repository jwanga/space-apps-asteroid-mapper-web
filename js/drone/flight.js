var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.config('general:navdata_demo', 'FALSE');
client.takeoff();
data = []

client
  .after(10000, function() {
    this.front(0.1);
  })
  .after(3000, function() {
    this.stop();
    this.land();
    console.log(JSON.stringify(data));
  })
  .on('navdata', function(e) {
    data.push(e);
  });
