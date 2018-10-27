from flask import Flask, render_template, redirect, json, Response
import pymongo
from scrape_mars import scrapeMars
from bson.json_util import dumps

# create instance of Flask app
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.mars
coll = db.mars_data
# drop if db already exists
# db.coll.drop()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/data")
def home():
    allData = coll.find_one({"articles": {"$exists": True}})
    jsonData = dumps(allData)
    print(jsonData)
    # articles = coll.find({"articles": {"$exists": True}})
    # data = {}
    # for x, article in enumerate(articles):
    #     data[x] = article
    # # print(data)
    return Response(jsonData, mimetype='application/json')


@app.route("/scrape")
def scrape():
    db.mars_data.remove({})
    data = scrapeMars()
    print(data)
    coll.insert(data)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
