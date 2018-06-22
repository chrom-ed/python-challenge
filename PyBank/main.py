# main file for PyBank

# import data file
import csv
with open('/Users/Evan/Git/python-challenge/PyBank/budget_data.csv') as csvfile:
    # create total profit/loss variable
    total = 0

    # iterate through each row of datafile
    fileReader = csv.reader(csvfile)
    for lstRow in fileReader:
        if lstRow[0] != 'Date':
            net = lstRow[1]
            total += int(net)
print(total)
