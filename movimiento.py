import json
import time
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import random

Broker = "192.168.100.150"

sub_topic = "sensor/instructions"    # receive messages on this topic

pub_topic = "motion"       # send messages to this topic
temperatura =0
############### MQTT section ##################

# when connecting to mqtt do this;

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(sub_topic)

# when receiving a mqtt message do this;

def on_message(client, userdata, msg):
    message = str(msg.payload)
    print(msg.topic+" "+message)
    display_sensehat(message)

def publish_mqtt(sensor_data):
    mqttc = mqtt.Client("python_pub")
    mqttc.connect(Broker, 1883)
    mqttc.publish(pub_topic, sensor_data)
    #mqttc.loop(2) //timeout = 2s

def on_publish(mosq, obj, mid):
    print("mid: " + str(mid))


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(Broker, 1883, 1)


while True:
    temperatura = random.randint(0,50)
    test={"id":"S05","data":{"timestamp":"12","medition":temperatura}}    
    publish.single("temperature",json.dumps(test), hostname = Broker)
    time.sleep(1)
print ("datos enviados"+ str(temperatura))
