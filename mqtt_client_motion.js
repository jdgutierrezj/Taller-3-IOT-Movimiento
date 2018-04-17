var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

function sleep(milliseconds) {
  var start = new Date().getTime();
  while(true){
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

client.on('connect', function () {
   var datalength = 250;
   for(var i=0;i<datalength;i++){
        var tmpMedition = Math.random() * (100 - 1) + 1
        var objectJson = {
          "id": "S03",
          "data":{
            "timestamp": new Date().getMilliseconds(),
            "medition": tmpMedition
          }
        }
        client.publish('motion', JSON.stringify(objectJson) );
        console.info("Publish in mosquitto: " + tmpMedition + " - " + new Date());
        sleep(6000);
    }
    client.end();
});
