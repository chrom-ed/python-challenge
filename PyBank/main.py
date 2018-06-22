# main file for PyBank

# import data file
import csv
with open('/Users/Evan/Git/python-challenge/PyBank/budget_data.csv') as csvfile:

    # iterate through each row of datafile
    fileReader = csv.reader(csvfile)
    for row in fileReader:
        print(row)

#
