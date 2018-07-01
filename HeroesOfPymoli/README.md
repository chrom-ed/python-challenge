
### Heroes Of Pymoli Data Analysis
* 
* 
* 
-----


```python
# Dependencies and Setup
import pandas as pd
import numpy as np

# Raw data file
file_to_load = "Resources/purchase_data.csv"

# Read purchasing file and store into pandas data frame
purchase_data = pd.read_csv(file_to_load)
purchase_data.sample(20)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase ID</th>
      <th>SN</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>167</th>
      <td>167</td>
      <td>Aeral97</td>
      <td>23</td>
      <td>Male</td>
      <td>157</td>
      <td>Spada, Etcher of Hatred</td>
      <td>4.80</td>
    </tr>
    <tr>
      <th>756</th>
      <td>756</td>
      <td>Ilast79</td>
      <td>20</td>
      <td>Male</td>
      <td>73</td>
      <td>Ritual Mace</td>
      <td>2.05</td>
    </tr>
    <tr>
      <th>45</th>
      <td>45</td>
      <td>Haerith37</td>
      <td>23</td>
      <td>Male</td>
      <td>181</td>
      <td>Reaper's Toll</td>
      <td>1.66</td>
    </tr>
    <tr>
      <th>609</th>
      <td>609</td>
      <td>Lisosia93</td>
      <td>25</td>
      <td>Male</td>
      <td>40</td>
      <td>Second Chance</td>
      <td>2.52</td>
    </tr>
    <tr>
      <th>733</th>
      <td>733</td>
      <td>Chamiman85</td>
      <td>20</td>
      <td>Male</td>
      <td>66</td>
      <td>Victor Iron Spikes</td>
      <td>4.40</td>
    </tr>
    <tr>
      <th>760</th>
      <td>760</td>
      <td>Aithelis62</td>
      <td>21</td>
      <td>Male</td>
      <td>44</td>
      <td>Bonecarvin Battle Axe</td>
      <td>2.38</td>
    </tr>
    <tr>
      <th>94</th>
      <td>94</td>
      <td>Aina43</td>
      <td>19</td>
      <td>Male</td>
      <td>96</td>
      <td>Blood-Forged Skeletal Spine</td>
      <td>3.09</td>
    </tr>
    <tr>
      <th>476</th>
      <td>476</td>
      <td>Marassa62</td>
      <td>21</td>
      <td>Male</td>
      <td>103</td>
      <td>Singed Scalpel</td>
      <td>4.35</td>
    </tr>
    <tr>
      <th>692</th>
      <td>692</td>
      <td>Quaecjask96</td>
      <td>9</td>
      <td>Male</td>
      <td>78</td>
      <td>Glimmer, Ender of the Moon</td>
      <td>4.40</td>
    </tr>
    <tr>
      <th>381</th>
      <td>381</td>
      <td>Aerillorin70</td>
      <td>16</td>
      <td>Male</td>
      <td>83</td>
      <td>Lifebender</td>
      <td>3.33</td>
    </tr>
    <tr>
      <th>59</th>
      <td>59</td>
      <td>Yaliru88</td>
      <td>19</td>
      <td>Male</td>
      <td>105</td>
      <td>Hailstorm Shadowsteel Scythe</td>
      <td>3.03</td>
    </tr>
    <tr>
      <th>291</th>
      <td>291</td>
      <td>Idairin51</td>
      <td>20</td>
      <td>Other / Non-Disclosed</td>
      <td>35</td>
      <td>Heartless Bone Dualblade</td>
      <td>3.45</td>
    </tr>
    <tr>
      <th>217</th>
      <td>217</td>
      <td>Cosadar58</td>
      <td>38</td>
      <td>Male</td>
      <td>25</td>
      <td>Hero Cane</td>
      <td>4.35</td>
    </tr>
    <tr>
      <th>17</th>
      <td>17</td>
      <td>Zontibe81</td>
      <td>21</td>
      <td>Male</td>
      <td>161</td>
      <td>Devine</td>
      <td>1.76</td>
    </tr>
    <tr>
      <th>315</th>
      <td>315</td>
      <td>Tyisur83</td>
      <td>23</td>
      <td>Male</td>
      <td>107</td>
      <td>Splitter, Foe Of Subtlety</td>
      <td>2.18</td>
    </tr>
    <tr>
      <th>125</th>
      <td>125</td>
      <td>Yathecal82</td>
      <td>20</td>
      <td>Female</td>
      <td>62</td>
      <td>Piece Maker</td>
      <td>1.87</td>
    </tr>
    <tr>
      <th>161</th>
      <td>161</td>
      <td>Iri67</td>
      <td>20</td>
      <td>Male</td>
      <td>3</td>
      <td>Phantomlight</td>
      <td>2.49</td>
    </tr>
    <tr>
      <th>222</th>
      <td>222</td>
      <td>Chamjask73</td>
      <td>22</td>
      <td>Female</td>
      <td>178</td>
      <td>Oathbreaker, Last Hope of the Breaking Storm</td>
      <td>4.23</td>
    </tr>
    <tr>
      <th>325</th>
      <td>325</td>
      <td>Hiasri33</td>
      <td>23</td>
      <td>Male</td>
      <td>54</td>
      <td>Eternal Cleaver</td>
      <td>2.50</td>
    </tr>
    <tr>
      <th>633</th>
      <td>633</td>
      <td>Chanastnya43</td>
      <td>22</td>
      <td>Male</td>
      <td>80</td>
      <td>Dreamsong</td>
      <td>3.39</td>
    </tr>
  </tbody>
</table>
</div>



## Player Count

* Display the total number of players



```python
numPlayers = purchase_data['SN'].nunique()
numPlayers
```




    576



## Purchasing Analysis (Total)

* Run basic calculations to obtain number of unique items, average price, etc.


* Create a summary data frame to hold the results


* Optional: give the displayed data cleaner formatting


* Display the summary data frame



```python
# total items
numItems = purchase_data['Item Name'].nunique()
# average price
avgPrice = purchase_data['Price'].mean()
# total purchases
totalPurchases = purchase_data['Purchase ID'].count()
# total revenue
totalRevenue = purchase_data['Price'].sum()

# Put data in to summary 
summary_data = {
    'Number of Items':[numItems],
    'Average Purchase Price':str(f'${avgPrice:.2f}'),
    'Number of Purchases':[totalPurchases],
    'Total Revenue':str(f'${totalRevenue:,.2f}'),
}
summary_df = pd.DataFrame(summary_data)

summary_df

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Number of Items</th>
      <th>Average Purchase Price</th>
      <th>Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>179</td>
      <td>$3.05</td>
      <td>780</td>
      <td>$2,379.77</td>
    </tr>
  </tbody>
</table>
</div>



## Gender Demographics

* Run basic calculations to obtain number of unique items, average price, etc.


* Create a summary data frame to hold the results


* Optional: give the displayed data cleaner formatting


* Display the summary data frame



```python
# DataFrame with Female players purchases
Femaledf = purchase_data.loc[purchase_data['Gender'] == 'Female']
# DataFrame with Male players purchases
Maledf = purchase_data.loc[purchase_data['Gender'] == 'Male']
# DataFrame with Other/Non-Disclosed gender players purchases
Otherdf = purchase_data.loc[(purchase_data['Gender'] != 'Male') & (purchase_data['Gender'] != 'Female')]
# Summary data for players by gender
summary_players = {
    'Number of Female Players':[Femaledf['SN'].nunique()],
    'Number of Male Players':[Maledf['SN'].nunique()],
    'Number of Other/Non-Disclosed Gender Players':[Otherdf['SN'].nunique()],
    'Percentage of Female Players':[(Femaledf['SN'].nunique() / numPlayers * 100)],
    'Percentage of Male Players':[(Maledf['SN'].nunique() / numPlayers * 100)],
    'Percentage of Other/Non-Disclosed Gender Players':[(Otherdf['SN'].nunique() / numPlayers * 100)],
}
players_df = pd.DataFrame(summary_players)

# clean up formatting
players_df['Percentage of Female Players'] = players_df['Percentage of Female Players'].map("{:.2f}%".format)
players_df['Percentage of Male Players'] = players_df['Percentage of Male Players'].map("{:.2f}%".format)
players_df['Percentage of Other/Non-Disclosed Gender Players'] = players_df['Percentage of Other/Non-Disclosed Gender Players'].map("{:.2f}%".format)

players_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Number of Female Players</th>
      <th>Number of Male Players</th>
      <th>Number of Other/Non-Disclosed Gender Players</th>
      <th>Percentage of Female Players</th>
      <th>Percentage of Male Players</th>
      <th>Percentage of Other/Non-Disclosed Gender Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>81</td>
      <td>484</td>
      <td>11</td>
      <td>14.06%</td>
      <td>84.03%</td>
      <td>1.91%</td>
    </tr>
  </tbody>
</table>
</div>




## Purchasing Analysis (Gender)

* Run basic calculations to obtain purchase count, avg. purchase price, etc. by gender


* For normalized purchasing, divide total purchase value by purchase count, by gender


* Create a summary data frame to hold the results


* Optional: give the displayed data cleaner formatting


* Display the summary data frame


```python
# purchase data grouped by gender
genderdf = purchase_data.groupby('Gender')
# purchase statistics grouped by gender
gpurchasedf = pd.DataFrame({
    'Purchase Count':genderdf['Price'].count(),
    'Average Purchase Price':genderdf['Price'].mean(),
    'Total Purchase Value':genderdf['Price'].sum()
})

# normalized data by gender
genderscount = ['Number of Female Players','Number of Male Players','Number of Other/Non-Disclosed Gender Players']
normgender = gpurchasedf['Total Purchase Value'].values / players_df[genderscount].values

# add normalized data
gpurchasedf['Normalized Totals'] = normgender[0]

#clean up formatting
gpurchasedf['Average Purchase Price'] = gpurchasedf['Average Purchase Price'].map("${:.2f}".format)
gpurchasedf['Total Purchase Value'] = gpurchasedf['Total Purchase Value'].map("${:,.2f}".format)
gpurchasedf['Normalized Totals'] = gpurchasedf['Normalized Totals'].map("${:.2f}".format)

gpurchasedf
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
    <tr>
      <th>Gender</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Female</th>
      <td>113</td>
      <td>$3.20</td>
      <td>$361.94</td>
      <td>$4.47</td>
    </tr>
    <tr>
      <th>Male</th>
      <td>652</td>
      <td>$3.02</td>
      <td>$1,967.64</td>
      <td>$4.07</td>
    </tr>
    <tr>
      <th>Other / Non-Disclosed</th>
      <td>15</td>
      <td>$3.35</td>
      <td>$50.19</td>
      <td>$4.56</td>
    </tr>
  </tbody>
</table>
</div>



## Age Demographics

* Establish bins for ages


* Categorize the existing players using the age bins. Hint: use pd.cut()


* Calculate the numbers and percentages by age group


* Create a summary data frame to hold the results


* Optional: round the percentage column to two decimal points


* Display Age Demographics Table



```python
# Establish bins for ages
age_bins = [0, 9.90, 14.90, 19.90, 24.90, 29.90, 34.90, 39.90, 99999]
group_names = ["<10", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40+"]
# add age bins to main DataFrame
purchase_data['Age Bin'] = pd.cut(purchase_data['Age'],age_bins,labels=group_names)

# purchase data grouped by age bin
agedf = purchase_data.groupby('Age Bin')

# statistics grouped by gender
agestatdf = pd.DataFrame({
    'Players':agedf['SN'].nunique(),
    'Percentage of Playerbase':(agedf['SN'].nunique() / numPlayers * 100)
})
agestatdf['Percentage of Playerbase'] = agestatdf['Percentage of Playerbase'].map("{:.2f}%".format)
agestatdf
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Players</th>
      <th>Percentage of Playerbase</th>
    </tr>
    <tr>
      <th>Age Bin</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>&lt;10</th>
      <td>17</td>
      <td>2.95%</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>22</td>
      <td>3.82%</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>107</td>
      <td>18.58%</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>258</td>
      <td>44.79%</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>77</td>
      <td>13.37%</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>52</td>
      <td>9.03%</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>31</td>
      <td>5.38%</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>12</td>
      <td>2.08%</td>
    </tr>
  </tbody>
</table>
</div>



## Purchasing Analysis (Age)

* Bin the purchase_data data frame by age


* Run basic calculations to obtain purchase count, avg. purchase price, etc. in the table below


* Calculate Normalized Purchasing


* Create a summary data frame to hold the results


* Optional: give the displayed data cleaner formatting


* Display the summary data frame


```python
# purchase statistics grouped by gender
agepurchasedf = pd.DataFrame({
    'Purchase Count':agedf['Price'].count(),
    'Average Purchase Price':agedf['Price'].mean(),
    'Total Purchase Value':agedf['Price'].sum(),
})

# normalized data by age
normage = agepurchasedf['Total Purchase Value'].values / agestatdf['Players'].values

# add normalized data
agepurchasedf['Normalized Totals'] = normage

# sorted to show highest spending age groups
agepurchasedf.sort_values('Normalized Totals',ascending=False,inplace=True)

# clean up formatting
agepurchasedf['Average Purchase Price'] = agepurchasedf['Average Purchase Price'].map("${:.2f}".format)
agepurchasedf['Total Purchase Value'] = agepurchasedf['Total Purchase Value'].map("${:,.2f}".format)
agepurchasedf['Normalized Totals'] = agepurchasedf['Normalized Totals'].map("${:.2f}".format)

agepurchasedf
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
    <tr>
      <th>Age Bin</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>35-39</th>
      <td>41</td>
      <td>$3.60</td>
      <td>$147.67</td>
      <td>$4.76</td>
    </tr>
    <tr>
      <th>&lt;10</th>
      <td>23</td>
      <td>$3.35</td>
      <td>$77.13</td>
      <td>$4.54</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>365</td>
      <td>$3.05</td>
      <td>$1,114.06</td>
      <td>$4.32</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>73</td>
      <td>$2.93</td>
      <td>$214.00</td>
      <td>$4.12</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>136</td>
      <td>$3.04</td>
      <td>$412.89</td>
      <td>$3.86</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>101</td>
      <td>$2.90</td>
      <td>$293.00</td>
      <td>$3.81</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>28</td>
      <td>$2.96</td>
      <td>$82.78</td>
      <td>$3.76</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>13</td>
      <td>$2.94</td>
      <td>$38.24</td>
      <td>$3.19</td>
    </tr>
  </tbody>
</table>
</div>



## Top Spenders

* Run basic calculations to obtain the results in the table below


* Create a summary data frame to hold the results


* Sort the total purchase value column in descending order


* Optional: give the displayed data cleaner formatting


* Display a preview of the summary data frame




```python
# group purchases by user
userpurchasedf = purchase_data.groupby('SN')

# purchase statistics by user (top 5)
top5users = userpurchasedf['Price'].sum().nlargest(5)
top5purchasecount = userpurchasedf['Price'].count().nlargest(5)

# purchase statistics for top 5 users
top5purchasedf = pd.DataFrame({
    'SN':top5users.index,
    'Purchase Count':top5purchasecount.values,
    'Average Purchase Price':(top5users.values / top5purchasecount.values),
    'Total Purchase Value':top5users.values
})
top5purchasedf
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>SN</th>
      <th>Purchase Count</th>
      <th>Average Purchase Price</th>
      <th>Total Purchase Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Lisosia93</td>
      <td>5</td>
      <td>3.792000</td>
      <td>18.96</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Idastidru52</td>
      <td>4</td>
      <td>3.862500</td>
      <td>15.45</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Chamjask73</td>
      <td>4</td>
      <td>3.457500</td>
      <td>13.83</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Iral74</td>
      <td>3</td>
      <td>4.540000</td>
      <td>13.62</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Iskadarya95</td>
      <td>3</td>
      <td>4.366667</td>
      <td>13.10</td>
    </tr>
  </tbody>
</table>
</div>



## Most Popular Items

* Retrieve the Item ID, Item Name, and Item Price columns


* Group by Item ID and Item Name. Perform calculations to obtain purchase count, item price, and total purchase value


* Create a summary data frame to hold the results


* Sort the purchase count column in descending order


* Optional: give the displayed data cleaner formatting


* Display a preview of the summary data frame




```python
# group purchases by item
itempurchasedf = purchase_data.groupby('Item ID')

# purchase statistics by item (top 5)
# take 5 items with largest count values (all columns are equal length so which column to count is arbitrary)
top5items = itempurchasedf['Price'].count().nlargest(5)

# initialize list of item names
itemname = []

# loop through top 5 item IDs and match the Item Name column with the matching ID
# (taking the 0 index value because multiple lines of purchases are returned for each item)
for ID in top5items.index:
    itemname.append(purchase_data[purchase_data['Item ID'] == ID]['Item Name'].values[0])
    
# initialize list of item prices
itemprice = []

# loop through top 5 item IDs and match the Price column with the matching ID
# (taking the 0 index value because multiple lines of purchases are returned for each item)
for ID in top5items.index:
    itemprice.append(purchase_data[purchase_data['Item ID'] == ID]['Price'].values[0])
    
# initialize list of item totals
itemtotal = []

# knowing exactly 5 values exist in top 5 we loop 5 times, multiplying the nth value of previous lists/sequences
for n in range(0,5):
    itemtotal.append(top5items.values[n] * itemprice[n])

# purchase statistics for top 5 items
top5itemdf = pd.DataFrame({
    'ID':top5items.index,
    'Name':itemname,
    'Purchase Count':top5items.values,
    'Price':itemprice,
    'Total Purchase Value':itemtotal
})
top5itemdf
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ID</th>
      <th>Name</th>
      <th>Purchase Count</th>
      <th>Price</th>
      <th>Total Purchase Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>178</td>
      <td>Oathbreaker, Last Hope of the Breaking Storm</td>
      <td>12</td>
      <td>4.23</td>
      <td>50.76</td>
    </tr>
    <tr>
      <th>1</th>
      <td>82</td>
      <td>Nirvana</td>
      <td>9</td>
      <td>4.90</td>
      <td>44.10</td>
    </tr>
    <tr>
      <th>2</th>
      <td>108</td>
      <td>Extraction, Quickblade Of Trembling Hands</td>
      <td>9</td>
      <td>3.53</td>
      <td>31.77</td>
    </tr>
    <tr>
      <th>3</th>
      <td>145</td>
      <td>Fiery Glass Crusader</td>
      <td>9</td>
      <td>4.58</td>
      <td>41.22</td>
    </tr>
    <tr>
      <th>4</th>
      <td>19</td>
      <td>Pursuit, Cudgel of Necromancy</td>
      <td>8</td>
      <td>1.02</td>
      <td>8.16</td>
    </tr>
  </tbody>
</table>
</div>



## Most Profitable Items

* Sort the above table by total purchase value in descending order


* Optional: give the displayed data cleaner formatting


* Display a preview of the data frame




```python
# create Y var table with each item as a column
itemtotaldf = purchase_data.pivot(index='Purchase ID', columns='Item ID', 
                                  values='Price')

# top 5 item IDs with the most total sale volume
top5value = itemtotaldf.sum().nlargest(5)

# initialize a list for the names of the items with the highest total
titemname = []

# loop through top 5 item IDs and match the Name column with the matching ID
# (taking the 0 index value because multiple lines of purchases are returned for each item)
for ID in top5value.index:
    titemname.append(purchase_data[purchase_data['Item ID'] == ID]['Item Name'].values[0])

# initialize list for the purchase counts
top5count = []
    
# top 5 items by sales volume: purchase count
for ID in top5value.index:  
    top5count.append(itemtotaldf[ID].count())
    
# initialize list for top 5 prices
top5price = []

# loop through top 5 item IDs and match the Price column with the matching ID
# (taking the 0 index value because multiple lines of purchases are returned for each item)
for ID in top5value.index:
    top5price.append(purchase_data[purchase_data['Item ID'] == ID]['Price'].values[0])
    
# purchase statistics for top 5 items by total sale volume
top5totaldf = pd.DataFrame({
    'ID':top5value.index,
    'Name':titemname,
    'Purchase Count':top5count,
    'Price':top5price,
    'Total Purchase Value':top5value.values
})
top5totaldf
```
