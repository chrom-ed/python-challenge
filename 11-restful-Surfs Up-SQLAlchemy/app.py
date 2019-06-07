import datetime as dt
import numpy as np
import pandas as pd

import pymysql
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.automap import automap_base
from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
# Passenger = Base.classes.passenger
# Measurement = Base.classes.measurements
# Station = Base.classes.stations

# Create our session (link) from Python to the DB
session = Session(engine)
conn = engine.connect()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/'startdate'<br/>"
        f"/api/v1.0/'startdate'/'enddate'"
    )


@app.route("/precipitation")
def precipitation():
    startDate = dt.datetime.now().strftime("%Y-%m-%d")
    # print(startDate)

    # getting the date 12 months prior to your chosen vacation start
    startYear = int(startDate[0:4]) - 1
    month = int(startDate[5:7])
    day = int(startDate[8:])
    lookBackYear = startYear - 1
    lookBackDate = str(lookBackYear) + "-" + str(month) + "-" + str(day)
    print(f"{day} {month} {startYear} - {day} {month} {lookBackYear}")
    print(f"{startDate} - {lookBackDate}")

    result = engine.execute(
        f"SELECT date, prcp, tobs, station FROM measurements ORDER BY date")
    # yes i know this is the hard way, i just hate wrestling with datetime functions
    precipDict = {}
    # print(result)
    for row in result:
        curDate = row[0]
        curYear = int(curDate[0:4])
        curMonth = int(curDate[5:7])
        curDay = int(curDate[8:])
        if (curYear == lookBackYear and curMonth == month and curDay >= day) \
                or (curYear == startYear and curMonth == month and curDay <= day) \
                or (curYear == lookBackYear and curMonth > month) \
                or (curYear == startYear and curMonth < month):
            # print(row)
            # calculate averageish precipitation
            if curDate in precipDict:
                prcpAvg = np.average([row[1], precipDict[curDate]])
                precipDict[curDate] = prcpAvg
            else:
                precipDict[curDate] = row[1]
    #         precipItem = {curDate:row[1]}
    #         # print(precipItem)
    #         precipList.append(precipItem)
    #         # print(precipList)

    # precipDF = pd.DataFrame(precipList)
    # # print(precipDF)

    # # and now going backwards to a dictionary
    # precipDict = precipDF.to_dict(orient='dict')
    return jsonify(precipDict)


@app.route("/stations")
def stations():
    stationsList = []
    result = engine.execute("SELECT station FROM stations")
    for row in result:
        print(row[0])
        stationsList.append(row[0])
    return jsonify(stationsList)


@app.route("/tobs")
def tobs():
    startDate = dt.datetime.now().strftime("%Y-%m-%d")
    # print(startDate)

    # getting the date 12 months prior to your chosen vacation start
    startYear = int(startDate[0:4]) - 1
    month = int(startDate[5:7])
    day = int(startDate[8:])
    lookBackYear = startYear - 1
    lookBackDate = str(lookBackYear) + "-" + str(month) + "-" + str(day)
    print(f"{day} {month} {startYear} - {day} {month} {lookBackYear}")
    print(f"{startDate} - {lookBackDate}")

    result = engine.execute(
        f"SELECT date, prcp, tobs, station FROM measurements ORDER BY date")
    # yes i know this is the hard way, i just hate wrestling with datetime functions
    tempList = []
    # print(result)
    for row in result:
        curDate = row[0]
        curYear = int(curDate[0:4])
        curMonth = int(curDate[5:7])
        curDay = int(curDate[8:])
        if (curYear == lookBackYear and curMonth == month and curDay >= day) \
                or (curYear == startYear and curMonth == month and curDay <= day) \
                or (curYear == lookBackYear and curMonth > month) \
                or (curYear == startYear and curMonth < month):
            # print(row)
            tempList.append(row[2])
    return jsonify(tempList)


@app.route("/<startDate>")
def yearFromStart(startDate):
    print(startDate)

    # getting the date 12 months prior to your chosen vacation start
    startYear = int(startDate[0:4])
    month = int(startDate[5:7])
    day = int(startDate[8:])
    lookBackYear = startYear - 1
    lookBackDate = str(lookBackYear) + "-" + str(month) + "-" + str(day)
    print(f"{day} {month} {startYear} - {day} {month} {lookBackYear}")
    print(f"{startDate} - {lookBackDate}")

    result = engine.execute(
        f"SELECT date, prcp, tobs, station FROM measurements ORDER BY date")
    # yes i know this is the hard way, i just hate wrestling with datetime functions
    tempList1 = []
    # print(result)
    for row in result:
        curDate = row[0]
        curYear = int(curDate[0:4])
        curMonth = int(curDate[5:7])
        curDay = int(curDate[8:])
        if (curYear == lookBackYear and curMonth == month and curDay >= day) \
                or (curYear == startYear and curMonth == month and curDay <= day) \
                or (curYear == lookBackYear and curMonth > month) \
                or (curYear == startYear and curMonth < month):
            # print(row)
            tempList1.append(row[2])
    tMin = np.min(tempList1)
    tMax = np.max(tempList1)
    tAvg = np.average(tempList1)
    tempDict = {"Min Temp": tMin,
                "Avg Temp": tAvg,
                "Max Temp": tMax}
    return jsonify(tempDict)


@app.route("/<startDate>/<lookBackDate>")
def customRange(startDate, lookBackDate):
    startYear = int(startDate[0:4])
    startMonth = int(startDate[5:7])
    startDay = int(startDate[8:])
    lookBackYear = int(lookBackDate[0:4])
    lookBackMonth = int(lookBackDate[5:7])
    lookBackDay = int(lookBackDate[8:])
    print(f'{lookBackYear}-{lookBackMonth}-{lookBackDay}, {startYear}-{startMonth}-{startDay}')
    result = engine.execute(
        f"SELECT date, prcp, tobs, station FROM measurements ORDER BY date")
    # yes i know this is the hard way, i just hate wrestling with datetime functions
    tList = []
    for row in result:
        curDate = row[0]
        curYear = int(row[0][0:4])
        curMonth = int(row[0][5:7])
        curDay = int(row[0][8:])
        if lookBackYear != startYear:
            if (curYear == lookBackYear and curMonth == lookBackMonth and curDay >= lookBackDay) \
                    or (curYear == startYear and curMonth == startMonth and curDay <= startDay) \
                    or (curYear == lookBackYear and curMonth > lookBackMonth) \
                    or (curYear == startYear and curMonth < startMonth):

                print(row)
                tItem = row[2]
                tList.append(tItem)
#             else:
#                 print('topblock skip')

        elif (curYear == startYear and curMonth == lookBackMonth and curDay >= lookBackDay) \
                or (curYear == startYear and curMonth > lookBackMonth and curMonth < startMonth) \
                or (curYear == startYear and curMonth == startMonth and curDay <= startDay):

            print(row)
            tItem = row[2]
            tList.append(tItem)
#         else:
#             print('bottom block skip')

    minT = min(tList)
    maxT = max(tList)
    avgT = np.average(tList)
    return jsonify({"Max Temp": maxT, "Avg Temp": avgT, "Min Temp": minT})


if __name__ == '__main__':
    app.run(debug=True)
