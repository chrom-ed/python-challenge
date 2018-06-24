# main file for PyPoll
import os
import csv

# define file path
electionpath = os.path.join("..", "python-challenge", "PyPoll")

# import data file
with open(electionpath + "/election_data.csv") as csvfile:
    # create dictionary reader
    pollreader = csv.DictReader(csvfile)

    # initialize variables
    votes = 0
    candidates = {}

    for dctVote in pollreader:
        # track total votes
        votes += 1
        # add any new candidates to candidate list
        if not dctVote['Candidate'] in candidates:
            candidates[dctVote['Candidate']] = int(1)
        else:
            candidates[dctVote['Candidate']] += 1
        if votes % 10000 == 0:
            print(votes)

            # create output file
with open(electionpath + '/election_data_output.txt', 'w') as outputfile:

    # initialize winning vote tally
    vmax = 0

    # write file header
    print("\n-------------------Final Vote Count-------------------\n")
    outputfile.write(
        "\n-------------------Final Vote Count-------------------\n")

    # summarize each candidates votes
    for c, v in candidates.items():
        print(
            f"{c} received:\n {v / votes * 100:,.3f}% of the votes with:\n {v} votes.")
        outputfile.write(
            f"{c} received:\n {v / votes * 100:,.3f}% of the votes with:\n {v} votes.\n")
        if v > vmax:
            vmax = v
            winner = c
    print("\n-------------------And the Winner is-------------------\n")
    outputfile.write(
        "\n-------------------And the Winner is-------------------\n")
    print(f"{winner} is the winner with {vmax} votes!")
    outputfile.write(f"{winner} is the winner with {vmax} votes!")
