################################################################################################ 
####################################### CLIENTE MQTT ########################################### 
################################################################################################


import json
import random
import time
from sendDataBase import sendDataFireBase
from paho.mqtt import client as mqtt_client
from machine import modelClassification


#Local
#BROKER = 'localhost'
#PORT = 1883
#0TOPIC = "/test"
# generate client ID with pub prefix randomly
#CLIENT_ID = "python-mqtt-tcp-pub-sub-{id}".format(id=random.randint(0, 1000))
#USERNAME = 'admin'
#PASSWORD = 'public'
#FLAG_CONNECTED = 0

#Hive
BROKER = 'broker.hivemq.com'
PORT = 1883
TOPIC_DATA = "/test_utn"
TOPIC_ALERT = "/test_utn_alert"
# generate client ID with pub prefix randomly
CLIENT_ID = "python-mqtt-tcp-pub-sub-{id}".format(id=random.randint(0, 1000))
FLAG_CONNECTED = 0

def on_connect(client, userdata, flags, rc):
    global FLAG_CONNECTED
    global FLAG_CONNECTED
    if rc == 0:
        FLAG_CONNECTED = 1
        print("Connected to MQTT Broker!")
        client.subscribe(TOPIC_DATA)
        client.subscribe(TOPIC_ALERT)
    else:
        print("Failed to connect, return code {rc}".format(rc=rc), )


def on_message(client, userdata, msg):
    #print("Received `{payload}` from `{topic}` topic".format(payload=msg.payload.decode(), topic=msg.topic))
    try:
        print("Received `{payload}` from `{topic}` topic".format(payload=msg.payload.decode(), topic=msg.topic))

        ''' if(msg.topic=='/test_utn' and msg.payload.decode()!=None and float(msg.payload.decode())>=0 and float(msg.payload.decode())<170): '''
        if(msg.topic=='/test_utn' and msg.payload.decode()!=None):
            data = json.loads(msg.payload.decode())
            presionSistolica = float(data["presionS"])
            presionDiastolica = float(data["presionD"])
            if (presionSistolica>=0 and  presionSistolica <170 and presionDiastolica>=0 and  presionDiastolica <120):
                #Una vez se recibe el mensaje debe pasar por machine learning y almacenar el base de datos
                #1) Machine Learning
                classDataS = modelClassification(presionSistolica,'model_s.sav')    
                classDataD = modelClassification(presionDiastolica,'model_d.sav')    
                #2) Almacenar en la base de datos -- Se guarda la presión en la base de datos
                sendDataFireBase(presionSistolica,presionDiastolica)
                #3) Enviar alerta a la vista
                publish(client,TOPIC_ALERT,{"data":[{"class":int(classDataS),"type":"S","value":float(presionSistolica)},{"class":int(classDataD),"type":"D","value":float(presionDiastolica)}]})               

    except Exception as e:
        print(e)

def connect_mqtt():
    client = mqtt_client.Client(CLIENT_ID)
    #client.username_pw_set(USERNAME, PASSWORD)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(BROKER, PORT)
    return client

#Enviar mensajes
def publish(client,TOPIC,msg): 
    msg = json.dumps(msg)
    result = client.publish(TOPIC, msg)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print("Send `{msg}` to topic `{topic}`".format(msg=msg, topic=TOPIC))
    else:
        print("Failed to send message to topic {topic}".format(topic=TOPIC))
    time.sleep(1)


client = connect_mqtt()
def run():
    while True:
        client.loop_start()
        time.sleep(1)
        if FLAG_CONNECTED:
            print("Wait for message...")
        else:
            client.loop_stop()


if __name__ == '__main__':
    run()