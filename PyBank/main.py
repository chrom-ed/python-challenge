# main file for PyBank

# import data file
import csv
with open('/Users/Evan/Git/python-challenge/PyBank/budget_data.csv') as csvfile:
    # create total profit/loss variable
    totalNet = 0
    maxnet = 0
    maxloss = 0

    # iterate through each row of datafile with an enumerated index
    fileReader = csv.reader(csvfile)
    for idx, lstRow in enumerate(fileReader):

        # skip the first row
        if lstRow[0] != 'Date':

            # return last index for total months
            totalMonths = idx

            # sum the profit/loss
            net = int(lstRow[1])
            totalNet += net

            # compare profit/loss to greatest value
            if net > maxnet:
                maxnet = net
                maxmonth = lstRow[0]
            elif net < maxloss:
                maxloss = net
                lossmonth = lstRow[0]

# create output text file
outputFile = open(
    '/Users/Evan/Git/python-challenge/PyBank/budget_data_output.txt', 'w')

# begin analysis printout
print("Financial Analysis")
outputFile.write("Financial Analysis" + '\n')
print("--------------------------------------")
outputFile.write("--------------------------------------" + '\n')
# print final month total
print("Total months of data: " + str(totalMonths))
outputFile.write("Total months of data: " + str(totalMonths) + '\n')

# print sum of profit/loss
print("Net profit or loss over given period: " +
      "$" + "{:,.2f}".format(totalNet))
outputFile.write("Net profit or loss over given period: " +
                 "$" + "{:,.2f}".format(totalNet) + '\n')

# average profit/loss over total months
average = totalNet / totalMonths
print("Average change in value over given period: " +
      "$" + "{:,.2f}".format(average))
outputFile.write("Average change in value over given period: " +
                 "$" + "{:,.2f}".format(average) + '\n')

# print maximum profits and losses
print("The greatest increase, or profit, occurred during " +
      maxmonth + " in the amount of " + "$" + "{:,.2f}".format(maxnet))
outputFile.write("The greatest increase, or profit, occurred during " +
                 maxmonth + " in the amount of " + "$" + "{:,.2f}".format(maxnet) + '\n')
print("The greatest decrease, or loss, occurred during " +
      lossmonth + " in the amount of " + "$" + "{:,.2f}".format(maxloss))
outputFile.write("The greatest decrease, or loss, occurred during " +
                 lossmonth + " in the amount of " + "$" + "{:,.2f}".format(maxloss) + '\n')

# close output file
outputFile.close()
