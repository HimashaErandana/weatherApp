import socketio
import time
import random

sio = socketio.Client()

@sio.event
def connect():
    print("Connected to server!")

sio.connect("http://localhost:4000")

while True:
    data = {
        "device": "sensor_001",
        "temperature": round(random.uniform(20.0, 30.0), 2)
    }
    sio.emit("sensor-data", data)
    print("Sent:", data)
    time.sleep(2)
