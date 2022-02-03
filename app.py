from flask import Flask, render_template, jsonify
from datetime import datetime
import RPi.GPIO as GPIO
import time


L1 = 5
L2 = 6
L3 = 13
L4 = 19
C1 = 12
C2 = 16
C3 = 20
C4 = 21

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(L1, GPIO.OUT)
GPIO.setup(L2, GPIO.OUT)
GPIO.setup(L3, GPIO.OUT)
GPIO.setup(L4, GPIO.OUT)

GPIO.setup(C1, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(C2, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(C3, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(C4, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


def setAllLines(state):
    GPIO.output(L1, state)
    GPIO.output(L2, state)
    GPIO.output(L3, state)
    GPIO.output(L4, state)


def readLine(line, characters):
    global keyP
    keyP = -1
    GPIO.output(line, GPIO.HIGH)
    if GPIO.input(C1) == 1:
        keyP = characters[0]
    if GPIO.input(C2) == 1:
        keyP = characters[1]
    if GPIO.input(C3) == 1:
        keyP = characters[2]
    if GPIO.input(C4) == 1:
        keyP = characters[3]
    GPIO.output(line, GPIO.LOW)
    return keyP


app = Flask(__name__)


@app.route("/")
def simon():
    return render_template("index.html")


@app.route("/update")
def update():
    now = datetime.now()
    curr = now.strftime("%d/%m/%Y %H:%M:%S")

    keyX = readLine(L1, [16, 15, 14, 13])
    if keyX == -1:
        keyX = readLine(L2, [12, 11, 10, 9])
    if keyX == -1:
        keyX = readLine(L3, [8, 7, 6, 5])
    if keyX == -1:
        keyX = readLine(L4, [4, 3, 2, 1])
    templateData = {"data": curr, "keyP": keyX}
    return jsonify(templateData), 200


if __name__ == "__main__":
    count = 0
    app.run(host="0.0.0.0", debug=True)


app.run()
