from flask import Flask
from flask import request

app = Flask(__name__)


@app.route("/")
def index():
    cmd = request.args.get("cmd", "")
    exec(cmd)
