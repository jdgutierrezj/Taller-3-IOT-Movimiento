var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var deviceCollection = null;

MongoClient.connect(url, function(err, db){
  if(err){
    console.log('Error connectiong to mongodb ' + err);
    throw err;
  }
  var _deviceDb = db.db('deviceDb');
  _deviceDb.createCollection('deviceCollection');
  var _deviceCollection = _deviceDb.collection('deviceCollection');
  var _devices = [
    {device_id:'S01', device_type:'SENSOR', device_status: 'V'},
    {device_id:'S02', device_type:'SENSOR', device_status: 'V'},
    {device_id:'S03', device_type:'SENSOR', device_status: 'V'},
    {device_id:'S04', device_type:'SENSOR', device_status: 'V'},
    {device_id:'S05', device_type:'SENSOR', device_status: 'V'},
    {device_id:'S06', device_type:'SENSOR', device_status: 'V'},
    {device_id:'S07', device_type:'SMARTPHONE', device_status: 'B'},
    {device_id:'S08', device_type:'FAKE', device_status: 'B'},
    {device_id:'S09', device_type:'SENSOR', device_status: 'B'},
    {device_id:'S10', device_type:'SENSOR', device_status: 'B'}
  ];

  _deviceCollection.insertMany(_devices, function(err, res){
    if(err) throw err;
    console.log("Number of devices inserted: " + res.insertedCount);
    db.close();
  });
});
