# main file for PyPoll
import os
import csv

# define file path
electionpath = os.path.join("..", "python-challenge",
                            "PyPoll", "election_data.csv")

# import data file
with open(electionpath) as csvfile:
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
        print(candidates)

        # test break
        if votes > 10000:
            break

    vmax = 0
    for c, v in candidates.items():
        print(f"{c} received {v / votes * 100}% of the votes with {v} votes")
        if v > vmax:
            vmax = v
            winner = c
    print(f"{winner} is the winner with {vmax} votes!")
