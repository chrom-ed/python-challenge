# Analysis

## Observations and assumptions

### 1. The range of latitudes returned for the list of cities is within tolerances for a roughly uniform distribution. There is a shift to the northern latitudes, which is expected due to the higher concentration of populated landmass, but given the number of cities returned any trends should still be visible.

### 2. Due to the nature of latitude and the equator temperature as a function of latitude has a distinctive U shape which resists a linear regression model. Instead of using a difficult non-linear regression I chose to take the absolute value of latitude to return a measure of distance from the equator that is not biased to the Northern or Southern hemispheres.

## Trends

### 1. Temperature has a statistically significant inverse coorelation with distance from the equator, as seen in figure 4: "TempVAbsLatScatter".

### 2. Humidity also has a statistically significant inverse coorelation with distance from the equator, however it is much smaller (lower slope) than the relationship with Temperature, and can be seen in figure 6: "HumidityVLatScatter".

### 3. Temperature and Humidity have a noticable inverse coorelation as seen in figure 11: "CorrelationMatrix".

```python
import matplotlib.pyplot as plt
import seaborn as sns
import requests
import json
import random
import pandas as pd
from config import api_key
from citipy import citipy
import numpy as np
from datetime import date
base_url = "http://api.openweathermap.org/data/2.5/weather?"
plt.rcParams['figure.figsize'] = [15, 10]

today = date.today()

```


```python
cities = {}

while len(cities) < 1000:

    lat = random.random() * 180 - 90

    lng = random.random() * 360 - 180
    
    city = citipy.nearest_city(lat, lng)

    name = city.city_name
    country = city.country_code
    
#     print(lat,lng)
#     print(city.city_name)
#     print(city.country_code)
    
    if not city.city_name in cities.keys():
        cities[f'{name},{country}'] = lat
    else:
        continue
    
len(cities)
```




    1000




```python
dataDict = {}
for place in cities.keys():    
    city = place
    units = 'imperial'
    url = f'{base_url}{api_key}&q={city}&units={units}'
    data = requests.get(url).json()
    try:
        lst = [data['main']['temp'],data['coord']['lat'],data['main']['humidity'],
               data['clouds']['all'],data['wind']['speed']]
        dataDict[place] = lst
        print(f"LOG: City ID: {data['id']}, City Name: {place}, URL: {url}")
    except KeyError:
        print(f'Missing key at {place}')
summDF = pd.DataFrame.from_dict(dataDict, orient='index', columns=['Temp','Lat','Humidity','Clouds','Wind'])
summDF.sort_values('Lat',ascending=False)
```

    LOG: City ID: 2025256, City Name: chumikan,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chumikan,ru&units=imperial
    LOG: City ID: 3932145, City Name: pisco,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pisco,pe&units=imperial
    LOG: City ID: 4732862, City Name: nome,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nome,us&units=imperial
    LOG: City ID: 935215, City Name: saint-philippe,re, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saint-philippe,re&units=imperial
    LOG: City ID: 2075265, City Name: busselton,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=busselton,au&units=imperial
    LOG: City ID: 5848280, City Name: kapaa,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kapaa,us&units=imperial
    LOG: City ID: 1015776, City Name: bredasdorp,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bredasdorp,za&units=imperial
    LOG: City ID: 3383384, City Name: onverwacht,sr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=onverwacht,sr&units=imperial
    LOG: City ID: 2110227, City Name: butaritari,ki, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=butaritari,ki&units=imperial
    LOG: City ID: 4030556, City Name: rikitea,pf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rikitea,pf&units=imperial
    LOG: City ID: 6320062, City Name: vila velha,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vila velha,br&units=imperial
    Missing key at mataura,pf
    LOG: City ID: 2077963, City Name: albany,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=albany,au&units=imperial
    Missing key at haapu,pf
    LOG: City ID: 6170031, City Name: tuktoyaktuk,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tuktoyaktuk,ca&units=imperial
    LOG: City ID: 5855927, City Name: hilo,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hilo,us&units=imperial
    Missing key at airai,pw
    LOG: City ID: 1507390, City Name: dikson,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dikson,ru&units=imperial
    LOG: City ID: 3915350, City Name: guayaramerin,bo, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=guayaramerin,bo&units=imperial
    LOG: City ID: 2514651, City Name: los llanos de aridane,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=los llanos de aridane,es&units=imperial
    LOG: City ID: 4020109, City Name: atuona,pf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=atuona,pf&units=imperial
    LOG: City ID: 3833367, City Name: ushuaia,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ushuaia,ar&units=imperial
    LOG: City ID: 1503037, City Name: kodinsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kodinsk,ru&units=imperial
    LOG: City ID: 1865309, City Name: katsuura,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=katsuura,jp&units=imperial
    Missing key at umzimvubu,za
    Missing key at afmadu,so
    LOG: City ID: 4032243, City Name: vaini,to, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vaini,to&units=imperial
    LOG: City ID: 3448903, City Name: sao joao da barra,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sao joao da barra,br&units=imperial
    LOG: City ID: 2121025, City Name: srednekolymsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=srednekolymsk,ru&units=imperial
    LOG: City ID: 1337610, City Name: thinadhoo,mv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=thinadhoo,mv&units=imperial
    LOG: City ID: 5919850, City Name: chapais,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chapais,ca&units=imperial
    LOG: City ID: 3370903, City Name: jamestown,sh, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=jamestown,sh&units=imperial
    LOG: City ID: 2127202, City Name: anadyr,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=anadyr,ru&units=imperial
    LOG: City ID: 2171722, City Name: charters towers,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=charters towers,au&units=imperial
    LOG: City ID: 6185377, City Name: yellowknife,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yellowknife,ca&units=imperial
    Missing key at payo,ph
    LOG: City ID: 3652764, City Name: puerto ayora,ec, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=puerto ayora,ec&units=imperial
    LOG: City ID: 2012530, City Name: zhigansk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zhigansk,ru&units=imperial
    LOG: City ID: 2035601, City Name: nenjiang,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nenjiang,cn&units=imperial
    LOG: City ID: 2122090, City Name: pevek,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pevek,ru&units=imperial
    LOG: City ID: 1174451, City Name: keti bandar,pk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=keti bandar,pk&units=imperial
    LOG: City ID: 5882953, City Name: aklavik,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=aklavik,ca&units=imperial
    LOG: City ID: 6165406, City Name: thompson,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=thompson,ca&units=imperial
    LOG: City ID: 1299237, City Name: pyapon,mm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pyapon,mm&units=imperial
    LOG: City ID: 3401148, City Name: cururupu,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cururupu,br&units=imperial
    LOG: City ID: 632542, City Name: vammala,fi, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vammala,fi&units=imperial
    Missing key at kismayo,so
    LOG: City ID: 3874787, City Name: punta arenas,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=punta arenas,cl&units=imperial
    LOG: City ID: 2154219, City Name: orange,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=orange,au&units=imperial
    LOG: City ID: 3421719, City Name: narsaq,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=narsaq,gl&units=imperial
    LOG: City ID: 964432, City Name: port alfred,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port alfred,za&units=imperial
    Missing key at malwan,in
    LOG: City ID: 1794971, City Name: shitanjing,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shitanjing,cn&units=imperial
    LOG: City ID: 6138501, City Name: saint-augustin,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saint-augustin,ca&units=imperial
    LOG: City ID: 4944903, City Name: nantucket,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nantucket,us&units=imperial
    LOG: City ID: 3573061, City Name: saint george,bm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saint george,bm&units=imperial
    LOG: City ID: 2144528, City Name: warrnambool,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=warrnambool,au&units=imperial
    LOG: City ID: 2206900, City Name: westport,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=westport,nz&units=imperial
    LOG: City ID: 2206939, City Name: bluff,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bluff,nz&units=imperial
    LOG: City ID: 103630, City Name: najran,sa, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=najran,sa&units=imperial
    LOG: City ID: 6113406, City Name: prince rupert,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=prince rupert,ca&units=imperial
    LOG: City ID: 4267710, City Name: sitka,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sitka,us&units=imperial
    LOG: City ID: 1106677, City Name: bambous virieux,mu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bambous virieux,mu&units=imperial
    LOG: City ID: 2168943, City Name: devonport,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=devonport,au&units=imperial
    LOG: City ID: 1637001, City Name: luwuk,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=luwuk,id&units=imperial
    LOG: City ID: 5955902, City Name: fort nelson,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fort nelson,ca&units=imperial
    Missing key at bargal,so
    LOG: City ID: 3848950, City Name: la rioja,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=la rioja,ar&units=imperial
    LOG: City ID: 3366880, City Name: hermanus,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hermanus,za&units=imperial
    LOG: City ID: 2071860, City Name: esperance,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=esperance,au&units=imperial
    LOG: City ID: 2019004, City Name: novaya igirma,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=novaya igirma,ru&units=imperial
    LOG: City ID: 1006984, City Name: east london,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=east london,za&units=imperial
    LOG: City ID: 2022572, City Name: khatanga,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=khatanga,ru&units=imperial
    LOG: City ID: 1337607, City Name: kudahuvadhoo,mv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kudahuvadhoo,mv&units=imperial
    LOG: City ID: 934322, City Name: mahebourg,mu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mahebourg,mu&units=imperial
    LOG: City ID: 4035715, City Name: avarua,ck, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=avarua,ck&units=imperial
    LOG: City ID: 3573197, City Name: hamilton,bm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hamilton,bm&units=imperial
    LOG: City ID: 1608900, City Name: maha sarakham,th, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=maha sarakham,th&units=imperial
    LOG: City ID: 2206895, City Name: greymouth,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=greymouth,nz&units=imperial
    Missing key at asfi,ma
    LOG: City ID: 3382783, City Name: wageningen,sr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=wageningen,sr&units=imperial
    Missing key at wulanhaote,cn
    LOG: City ID: 6151455, City Name: souris,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=souris,ca&units=imperial
    LOG: City ID: 3939761, City Name: hualmay,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hualmay,pe&units=imperial
    LOG: City ID: 2121385, City Name: severo-kurilsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=severo-kurilsk,ru&units=imperial
    Missing key at illoqqortoormiut,gl
    LOG: City ID: 539640, City Name: kukushtan,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kukushtan,ru&units=imperial
    LOG: City ID: 1014034, City Name: carnarvon,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=carnarvon,za&units=imperial
    LOG: City ID: 2174444, City Name: bowen,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bowen,au&units=imperial
    LOG: City ID: 49747, City Name: xuddur,so, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=xuddur,so&units=imperial
    Missing key at hunza,pk
    Missing key at yomitan,jp
    Missing key at samusu,ws
    LOG: City ID: 2155415, City Name: new norfolk,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=new norfolk,au&units=imperial
    LOG: City ID: 2119283, City Name: zyryanka,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zyryanka,ru&units=imperial
    LOG: City ID: 1052373, City Name: beira,mz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=beira,mz&units=imperial
    LOG: City ID: 2967972, City Name: vire,fr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vire,fr&units=imperial
    LOG: City ID: 5367788, City Name: lompoc,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lompoc,us&units=imperial
    LOG: City ID: 3471451, City Name: arraial do cabo,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=arraial do cabo,br&units=imperial
    LOG: City ID: 2633274, City Name: akureyri,is, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=akureyri,is&units=imperial
    LOG: City ID: 2450173, City Name: taoudenni,ml, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=taoudenni,ml&units=imperial
    LOG: City ID: 3831208, City Name: qaanaaq,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=qaanaaq,gl&units=imperial
    Missing key at taolanaro,mg
    LOG: City ID: 1693835, City Name: pilar,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pilar,ph&units=imperial
    LOG: City ID: 3664716, City Name: canutama,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=canutama,br&units=imperial
    LOG: City ID: 2146219, City Name: torquay,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=torquay,au&units=imperial
    Missing key at nizhneyansk,ru
    LOG: City ID: 1511846, City Name: oktyabrskoye,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=oktyabrskoye,ru&units=imperial
    LOG: City ID: 2017155, City Name: saskylakh,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saskylakh,ru&units=imperial
    LOG: City ID: 3372707, City Name: ribeira grande,pt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ribeira grande,pt&units=imperial
    LOG: City ID: 2014833, City Name: tura,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tura,ru&units=imperial
    LOG: City ID: 3587428, City Name: aguilares,sv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=aguilares,sv&units=imperial
    Missing key at vaitupu,wf
    LOG: City ID: 778707, City Name: mehamn,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mehamn,no&units=imperial
    LOG: City ID: 2039557, City Name: khasan,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=khasan,ru&units=imperial
    LOG: City ID: 3394023, City Name: natal,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=natal,br&units=imperial
    LOG: City ID: 235826, City Name: zemio,cf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zemio,cf&units=imperial
    LOG: City ID: 1267390, City Name: kavaratti,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kavaratti,in&units=imperial
    LOG: City ID: 2270385, City Name: camacha,pt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=camacha,pt&units=imperial
    LOG: City ID: 347612, City Name: tala,eg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tala,eg&units=imperial
    LOG: City ID: 5826559, City Name: green river,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=green river,us&units=imperial
    LOG: City ID: 2064735, City Name: nhulunbuy,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nhulunbuy,au&units=imperial
    LOG: City ID: 286987, City Name: nizwa,om, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nizwa,om&units=imperial
    LOG: City ID: 3863379, City Name: mar del plata,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mar del plata,ar&units=imperial
    Missing key at spetsai,gr
    LOG: City ID: 8142546, City Name: lasem,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lasem,id&units=imperial
    LOG: City ID: 3465713, City Name: conde,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=conde,br&units=imperial
    Missing key at lushunkou,cn
    LOG: City ID: 2112802, City Name: hasaki,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hasaki,jp&units=imperial
    LOG: City ID: 1045114, City Name: inhambane,mz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=inhambane,mz&units=imperial
    LOG: City ID: 3839307, City Name: rawson,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rawson,ar&units=imperial
    LOG: City ID: 3372472, City Name: vila franca do campo,pt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vila franca do campo,pt&units=imperial
    LOG: City ID: 1282256, City Name: hithadhoo,mv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hithadhoo,mv&units=imperial
    LOG: City ID: 2132606, City Name: samarai,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=samarai,pg&units=imperial
    LOG: City ID: 2516925, City Name: guadix,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=guadix,es&units=imperial
    LOG: City ID: 1501000, City Name: kyshtovka,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kyshtovka,ru&units=imperial
    LOG: City ID: 2128867, City Name: noshiro,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=noshiro,jp&units=imperial
    LOG: City ID: 3466165, City Name: cidreira,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cidreira,br&units=imperial
    LOG: City ID: 5880568, City Name: bethel,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bethel,us&units=imperial
    LOG: City ID: 3369157, City Name: cape town,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cape town,za&units=imperial
    LOG: City ID: 4252975, City Name: barrow,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=barrow,us&units=imperial
    Missing key at saleaula,ws
    LOG: City ID: 3374346, City Name: ponta do sol,cv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ponta do sol,cv&units=imperial
    LOG: City ID: 2524881, City Name: crotone,it, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=crotone,it&units=imperial
    LOG: City ID: 2163355, City Name: hobart,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hobart,au&units=imperial
    LOG: City ID: 2138555, City Name: poum,nc, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=poum,nc&units=imperial
    LOG: City ID: 4031574, City Name: provideniya,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=provideniya,ru&units=imperial
    LOG: City ID: 2662149, City Name: ystad,se, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ystad,se&units=imperial
    LOG: City ID: 3835869, City Name: santiago del estero,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santiago del estero,ar&units=imperial
    LOG: City ID: 1630789, City Name: pontianak,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pontianak,id&units=imperial
    LOG: City ID: 2092164, City Name: lorengau,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lorengau,pg&units=imperial
    Missing key at sentyabrskiy,ru
    LOG: City ID: 1168700, City Name: ormara,pk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ormara,pk&units=imperial
    LOG: City ID: 2068655, City Name: katherine,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=katherine,au&units=imperial
    LOG: City ID: 2126199, City Name: cherskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cherskiy,ru&units=imperial
    LOG: City ID: 4407665, City Name: kodiak,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kodiak,us&units=imperial
    LOG: City ID: 3443061, City Name: chuy,uy, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chuy,uy&units=imperial
    LOG: City ID: 2126123, City Name: chokurdakh,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chokurdakh,ru&units=imperial
    LOG: City ID: 336454, City Name: ginir,et, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ginir,et&units=imperial
    LOG: City ID: 2322911, City Name: sokoto,ng, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sokoto,ng&units=imperial
    Missing key at palabuhanratu,id
    LOG: City ID: 964420, City Name: port elizabeth,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port elizabeth,za&units=imperial
    LOG: City ID: 3424607, City Name: tasiilaq,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tasiilaq,gl&units=imperial
    LOG: City ID: 3981460, City Name: coahuayana,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=coahuayana,mx&units=imperial
    LOG: City ID: 3108681, City Name: soria,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=soria,es&units=imperial
    LOG: City ID: 5969025, City Name: haines junction,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=haines junction,ca&units=imperial
    LOG: City ID: 258576, City Name: tirnavos,gr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tirnavos,gr&units=imperial
    LOG: City ID: 490040, City Name: sovetskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sovetskiy,ru&units=imperial
    LOG: City ID: 3057789, City Name: ruzomberok,sk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ruzomberok,sk&units=imperial
    Missing key at tambul,sd
    LOG: City ID: 2164422, City Name: griffith,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=griffith,au&units=imperial
    LOG: City ID: 2074865, City Name: carnarvon,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=carnarvon,au&units=imperial
    Missing key at amderma,ru
    LOG: City ID: 2761186, City Name: wilhelmsburg,at, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=wilhelmsburg,at&units=imperial
    LOG: City ID: 3899695, City Name: ancud,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ancud,cl&units=imperial
    Missing key at mys shmidta,ru
    LOG: City ID: 3933104, City Name: pangoa,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pangoa,pe&units=imperial
    Missing key at lolua,tv
    LOG: City ID: 2654728, City Name: bridlington,gb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bridlington,gb&units=imperial
    LOG: City ID: 578947, City Name: baryatino,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=baryatino,ru&units=imperial
    LOG: City ID: 580660, City Name: minyar,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=minyar,ru&units=imperial
    LOG: City ID: 3838874, City Name: rio cuarto,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rio cuarto,ar&units=imperial
    Missing key at pousat,kh
    LOG: City ID: 3896218, City Name: castro,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=castro,cl&units=imperial
    LOG: City ID: 77408, City Name: bajil,ye, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bajil,ye&units=imperial
    LOG: City ID: 1258819, City Name: rajpipla,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rajpipla,in&units=imperial
    LOG: City ID: 3446692, City Name: tatui,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tatui,br&units=imperial
    LOG: City ID: 3883457, City Name: lebu,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lebu,cl&units=imperial
    LOG: City ID: 4036284, City Name: alofi,nu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=alofi,nu&units=imperial
    LOG: City ID: 1800764, City Name: mengcheng,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mengcheng,cn&units=imperial
    LOG: City ID: 934649, City Name: cap malheureux,mu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cap malheureux,mu&units=imperial
    LOG: City ID: 2411397, City Name: georgetown,sh, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=georgetown,sh&units=imperial
    Missing key at bolungarvik,is
    LOG: City ID: 3361934, City Name: saldanha,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saldanha,za&units=imperial
    LOG: City ID: 1852357, City Name: shimoda,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shimoda,jp&units=imperial
    Missing key at saint anthony,ca
    LOG: City ID: 2027296, City Name: aykhal,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=aykhal,ru&units=imperial
    LOG: City ID: 584051, City Name: svetlogorsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=svetlogorsk,ru&units=imperial
    LOG: City ID: 2109528, City Name: buala,sb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=buala,sb&units=imperial
    LOG: City ID: 608324, City Name: shetpe,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shetpe,kz&units=imperial
    LOG: City ID: 1235846, City Name: matara,lk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=matara,lk&units=imperial
    Missing key at codrington,ag
    LOG: City ID: 1215502, City Name: banda aceh,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=banda aceh,id&units=imperial
    LOG: City ID: 1633419, City Name: padang,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=padang,id&units=imperial
    LOG: City ID: 2021017, City Name: kysyl-syr,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kysyl-syr,ru&units=imperial
    LOG: City ID: 4787534, City Name: sterling,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sterling,us&units=imperial
    LOG: City ID: 2964782, City Name: dingle,ie, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dingle,ie&units=imperial
    LOG: City ID: 2729907, City Name: longyearbyen,sj, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=longyearbyen,sj&units=imperial
    Missing key at cheuskiny,ru
    LOG: City ID: 978895, City Name: margate,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=margate,za&units=imperial
    LOG: City ID: 2180815, City Name: tuatapere,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tuatapere,nz&units=imperial
    LOG: City ID: 2219235, City Name: awbari,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=awbari,ly&units=imperial
    LOG: City ID: 1495480, City Name: pavlogradka,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pavlogradka,ru&units=imperial
    LOG: City ID: 934479, City Name: grand gaube,mu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=grand gaube,mu&units=imperial
    LOG: City ID: 1524801, City Name: shieli,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shieli,kz&units=imperial
    LOG: City ID: 688846, City Name: vradiyivka,ua, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vradiyivka,ua&units=imperial
    LOG: City ID: 1168749, City Name: nushki,pk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nushki,pk&units=imperial
    LOG: City ID: 113636, City Name: ashtian,ir, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ashtian,ir&units=imperial
    Missing key at belushya guba,ru
    LOG: City ID: 4034551, City Name: faanui,pf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=faanui,pf&units=imperial
    Missing key at atka,ru
    LOG: City ID: 3430443, City Name: necochea,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=necochea,ar&units=imperial
    LOG: City ID: 5965462, City Name: gravelbourg,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gravelbourg,ca&units=imperial
    LOG: City ID: 2136825, City Name: isangel,vu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=isangel,vu&units=imperial
    LOG: City ID: 1501377, City Name: kungurtug,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kungurtug,ru&units=imperial
    LOG: City ID: 3170027, City Name: potenza,it, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=potenza,it&units=imperial
    LOG: City ID: 2152668, City Name: portland,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=portland,au&units=imperial
    LOG: City ID: 3424901, City Name: aasiaat,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=aasiaat,gl&units=imperial
    LOG: City ID: 2647074, City Name: hereford,gb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hereford,gb&units=imperial
    LOG: City ID: 5404476, City Name: ukiah,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ukiah,us&units=imperial
    LOG: City ID: 3386177, City Name: trairi,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=trairi,br&units=imperial
    Missing key at juarez,mx
    LOG: City ID: 4031637, City Name: lavrentiya,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lavrentiya,ru&units=imperial
    LOG: City ID: 2022463, City Name: khilok,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=khilok,ru&units=imperial
    LOG: City ID: 5972291, City Name: havre-saint-pierre,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=havre-saint-pierre,ca&units=imperial
    LOG: City ID: 2020838, City Name: lensk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lensk,ru&units=imperial
    Missing key at ituni,gy
    LOG: City ID: 777019, City Name: vardo,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vardo,no&units=imperial
    Missing key at artyk,ru
    LOG: City ID: 2210554, City Name: surt,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=surt,ly&units=imperial
    LOG: City ID: 3573703, City Name: scarborough,tt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=scarborough,tt&units=imperial
    LOG: City ID: 2647984, City Name: great yarmouth,gb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=great yarmouth,gb&units=imperial
    LOG: City ID: 3137469, City Name: sorland,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sorland,no&units=imperial
    LOG: City ID: 1498919, City Name: mezhdurechenskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mezhdurechenskiy,ru&units=imperial
    LOG: City ID: 286245, City Name: sur,om, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sur,om&units=imperial
    Missing key at bengkulu,id
    LOG: City ID: 5208292, City Name: arroyo,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=arroyo,us&units=imperial
    LOG: City ID: 745664, City Name: hendek,tr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hendek,tr&units=imperial
    LOG: City ID: 1633442, City Name: paciran,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=paciran,id&units=imperial
    LOG: City ID: 1650434, City Name: bambanglipuro,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bambanglipuro,id&units=imperial
    LOG: City ID: 3398428, City Name: humberto de campos,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=humberto de campos,br&units=imperial
    LOG: City ID: 2162737, City Name: ingham,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ingham,au&units=imperial
    LOG: City ID: 3115824, City Name: muros,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=muros,es&units=imperial
    LOG: City ID: 2427637, City Name: mongo,td, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mongo,td&units=imperial
    LOG: City ID: 2264557, City Name: ponta do sol,pt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ponta do sol,pt&units=imperial
    LOG: City ID: 286621, City Name: salalah,om, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=salalah,om&units=imperial
    LOG: City ID: 149854, City Name: sirari,tz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sirari,tz&units=imperial
    LOG: City ID: 2064550, City Name: northam,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=northam,au&units=imperial
    LOG: City ID: 2109701, City Name: auki,sb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=auki,sb&units=imperial
    Missing key at gat,ly
    LOG: City ID: 2409215, City Name: mattru,sl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mattru,sl&units=imperial
    Missing key at grand river south east,mu
    LOG: City ID: 477940, City Name: ust-tsilma,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ust-tsilma,ru&units=imperial
    LOG: City ID: 3894426, City Name: coihaique,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=coihaique,cl&units=imperial
    LOG: City ID: 1152194, City Name: mae sai,th, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mae sai,th&units=imperial
    LOG: City ID: 1849876, City Name: tateyama,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tateyama,jp&units=imperial
    LOG: City ID: 1784131, City Name: huilong,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=huilong,cn&units=imperial
    LOG: City ID: 3832899, City Name: viedma,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=viedma,ar&units=imperial
    LOG: City ID: 2417795, City Name: mandiana,gn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mandiana,gn&units=imperial
    LOG: City ID: 1510689, City Name: baykit,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=baykit,ru&units=imperial
    LOG: City ID: 6620339, City Name: karratha,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=karratha,au&units=imperial
    LOG: City ID: 2127515, City Name: wakkanai,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=wakkanai,jp&units=imperial
    Missing key at halalo,wf
    LOG: City ID: 6255012, City Name: flinders,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=flinders,au&units=imperial
    LOG: City ID: 3374336, City Name: porto novo,cv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=porto novo,cv&units=imperial
    LOG: City ID: 2208248, City Name: kaitangata,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kaitangata,nz&units=imperial
    LOG: City ID: 3572627, City Name: cockburn town,bs, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cockburn town,bs&units=imperial
    LOG: City ID: 1787093, City Name: yantai,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yantai,cn&units=imperial
    LOG: City ID: 2214846, City Name: misratah,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=misratah,ly&units=imperial
    LOG: City ID: 2168305, City Name: dubbo,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dubbo,au&units=imperial
    LOG: City ID: 1624041, City Name: ternate,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ternate,id&units=imperial
    LOG: City ID: 3405380, City Name: bom conselho,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bom conselho,br&units=imperial
    LOG: City ID: 2267254, City Name: lagoa,pt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lagoa,pt&units=imperial
    LOG: City ID: 2396518, City Name: port-gentil,ga, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port-gentil,ga&units=imperial
    LOG: City ID: 88319, City Name: benghazi,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=benghazi,ly&units=imperial
    LOG: City ID: 1213855, City Name: sibolga,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sibolga,id&units=imperial
    LOG: City ID: 1503153, City Name: klyuchi,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=klyuchi,ru&units=imperial
    LOG: City ID: 542374, City Name: krasnogorsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=krasnogorsk,ru&units=imperial
    LOG: City ID: 216281, City Name: goma,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=goma,cd&units=imperial
    LOG: City ID: 1495626, City Name: pangody,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pangody,ru&units=imperial
    LOG: City ID: 2191911, City Name: dargaville,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dargaville,nz&units=imperial
    LOG: City ID: 5847411, City Name: kahului,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kahului,us&units=imperial
    LOG: City ID: 2070998, City Name: geraldton,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=geraldton,au&units=imperial
    LOG: City ID: 5991056, City Name: kenora,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kenora,ca&units=imperial
    LOG: City ID: 6149996, City Name: smithers,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=smithers,ca&units=imperial
    LOG: City ID: 3402429, City Name: caucaia,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=caucaia,br&units=imperial
    LOG: City ID: 3693584, City Name: pimentel,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pimentel,pe&units=imperial
    LOG: City ID: 2094342, City Name: kavieng,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kavieng,pg&units=imperial
    Missing key at pipar,in
    Missing key at beian,cn
    Missing key at attawapiskat,ca
    LOG: City ID: 565381, City Name: pestovo,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pestovo,ru&units=imperial
    LOG: City ID: 1166265, City Name: sambrial,pk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sambrial,pk&units=imperial
    LOG: City ID: 3925158, City Name: el carmen,bo, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=el carmen,bo&units=imperial
    LOG: City ID: 2156643, City Name: mount gambier,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mount gambier,au&units=imperial
    LOG: City ID: 2137748, City Name: voh,nc, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=voh,nc&units=imperial
    LOG: City ID: 1165057, City Name: shinpokh,pk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shinpokh,pk&units=imperial
    LOG: City ID: 1623673, City Name: panji,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=panji,id&units=imperial
    LOG: City ID: 2377457, City Name: nouadhibou,mr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nouadhibou,mr&units=imperial
    LOG: City ID: 2063036, City Name: port lincoln,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port lincoln,au&units=imperial
    LOG: City ID: 3131500, City Name: visnes,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=visnes,no&units=imperial
    Missing key at sahrak,af
    LOG: City ID: 2022454, City Name: khingansk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=khingansk,ru&units=imperial
    LOG: City ID: 2082539, City Name: merauke,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=merauke,id&units=imperial
    LOG: City ID: 2137773, City Name: vao,nc, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vao,nc&units=imperial
    LOG: City ID: 515873, City Name: oktyabrskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=oktyabrskiy,ru&units=imperial
    LOG: City ID: 2189343, City Name: kaeo,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kaeo,nz&units=imperial
    LOG: City ID: 6167817, City Name: torbay,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=torbay,ca&units=imperial
    LOG: City ID: 3933185, City Name: pampas,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pampas,pe&units=imperial
    LOG: City ID: 2345521, City Name: damaturu,ng, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=damaturu,ng&units=imperial
    Missing key at rungata,ki
    LOG: City ID: 218680, City Name: boende,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=boende,cd&units=imperial
    LOG: City ID: 2165087, City Name: gold coast,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gold coast,au&units=imperial
    LOG: City ID: 546105, City Name: nikolskoye,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nikolskoye,ru&units=imperial
    LOG: City ID: 1524243, City Name: georgiyevka,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=georgiyevka,kz&units=imperial
    LOG: City ID: 1283217, City Name: khandbari,np, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=khandbari,np&units=imperial
    LOG: City ID: 5978404, City Name: humboldt,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=humboldt,ca&units=imperial
    LOG: City ID: 4031742, City Name: egvekinot,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=egvekinot,ru&units=imperial
    LOG: City ID: 2194098, City Name: ahipara,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ahipara,nz&units=imperial
    LOG: City ID: 4035249, City Name: lufilufi,ws, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lufilufi,ws&units=imperial
    LOG: City ID: 1007311, City Name: durban,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=durban,za&units=imperial
    LOG: City ID: 3985168, City Name: san patricio,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=san patricio,mx&units=imperial
    LOG: City ID: 1816080, City Name: cangzhou,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cangzhou,cn&units=imperial
    LOG: City ID: 578534, City Name: baymak,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=baymak,ru&units=imperial
    LOG: City ID: 1142264, City Name: farah,af, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=farah,af&units=imperial
    LOG: City ID: 2374583, City Name: bubaque,gw, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bubaque,gw&units=imperial
    LOG: City ID: 1278987, City Name: allapalli,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=allapalli,in&units=imperial
    LOG: City ID: 2792301, City Name: linkebeek,be, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=linkebeek,be&units=imperial
    Missing key at barawe,so
    LOG: City ID: 5380437, City Name: pacific grove,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pacific grove,us&units=imperial
    Missing key at kazalinsk,kz
    LOG: City ID: 1512019, City Name: aksarka,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=aksarka,ru&units=imperial
    LOG: City ID: 3448455, City Name: sao miguel do araguaia,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sao miguel do araguaia,br&units=imperial
    LOG: City ID: 6089245, City Name: norman wells,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=norman wells,ca&units=imperial
    LOG: City ID: 2123814, City Name: leningradskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=leningradskiy,ru&units=imperial
    LOG: City ID: 1337619, City Name: ugoofaaru,mv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ugoofaaru,mv&units=imperial
    Missing key at avera,pf
    LOG: City ID: 5563839, City Name: fortuna,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fortuna,us&units=imperial
    LOG: City ID: 3421193, City Name: paamiut,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=paamiut,gl&units=imperial
    LOG: City ID: 3491161, City Name: bull savanna,jm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bull savanna,jm&units=imperial
    LOG: City ID: 241131, City Name: victoria,sc, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=victoria,sc&units=imperial
    LOG: City ID: 2119447, City Name: yuzhno-kurilsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yuzhno-kurilsk,ru&units=imperial
    LOG: City ID: 1293625, City Name: dawei,mm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dawei,mm&units=imperial
    LOG: City ID: 2758626, City Name: borculo,nl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=borculo,nl&units=imperial
    Missing key at lata,sb
    LOG: City ID: 5811696, City Name: spokane,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=spokane,us&units=imperial
    LOG: City ID: 545353, City Name: zarechnyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zarechnyy,ru&units=imperial
    LOG: City ID: 3926462, City Name: urcos,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=urcos,pe&units=imperial
    LOG: City ID: 5850554, City Name: makakilo city,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=makakilo city,us&units=imperial
    LOG: City ID: 1259385, City Name: port blair,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port blair,in&units=imperial
    Missing key at mafinga,tz
    LOG: City ID: 4905770, City Name: peru,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=peru,us&units=imperial
    LOG: City ID: 1634718, City Name: muncar,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=muncar,id&units=imperial
    LOG: City ID: 3466993, City Name: caarapo,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=caarapo,br&units=imperial
    LOG: City ID: 3671450, City Name: inirida,co, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=inirida,co&units=imperial
    LOG: City ID: 1058381, City Name: morondava,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=morondava,mg&units=imperial
    LOG: City ID: 2077895, City Name: alice springs,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=alice springs,au&units=imperial
    LOG: City ID: 2015306, City Name: tiksi,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tiksi,ru&units=imperial
    Missing key at skalnyy,ru
    Missing key at aflu,dz
    LOG: City ID: 2172797, City Name: cairns,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cairns,au&units=imperial
    LOG: City ID: 6453331, City Name: kristiansund,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kristiansund,no&units=imperial
    LOG: City ID: 3374083, City Name: bathsheba,bb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bathsheba,bb&units=imperial
    LOG: City ID: 3893629, City Name: coquimbo,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=coquimbo,cl&units=imperial
    LOG: City ID: 1695555, City Name: pandan,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pandan,ph&units=imperial
    LOG: City ID: 3936456, City Name: lima,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lima,pe&units=imperial
    LOG: City ID: 1795095, City Name: mingshui,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mingshui,cn&units=imperial
    LOG: City ID: 2027109, City Name: barguzin,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=barguzin,ru&units=imperial
    LOG: City ID: 2126710, City Name: beringovskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=beringovskiy,ru&units=imperial
    LOG: City ID: 3374210, City Name: sao filipe,cv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sao filipe,cv&units=imperial
    LOG: City ID: 3833859, City Name: tres arroyos,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tres arroyos,ar&units=imperial
    LOG: City ID: 1650213, City Name: banjarmasin,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=banjarmasin,id&units=imperial
    LOG: City ID: 211098, City Name: lubao,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lubao,cd&units=imperial
    Missing key at krasnoyarsk-66,ru
    LOG: City ID: 779554, City Name: honningsvag,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=honningsvag,no&units=imperial
    LOG: City ID: 4033557, City Name: tautira,pf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tautira,pf&units=imperial
    LOG: City ID: 2156034, City Name: muswellbrook,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=muswellbrook,au&units=imperial
    Missing key at san quintin,mx
    LOG: City ID: 5871146, City Name: palmer,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=palmer,us&units=imperial
    LOG: City ID: 2181625, City Name: te anau,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=te anau,nz&units=imperial
    LOG: City ID: 3985710, City Name: cabo san lucas,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cabo san lucas,mx&units=imperial
    LOG: City ID: 889191, City Name: karoi,zw, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=karoi,zw&units=imperial
    LOG: City ID: 53654, City Name: mogadishu,so, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mogadishu,so&units=imperial
    LOG: City ID: 780687, City Name: berlevag,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=berlevag,no&units=imperial
    Missing key at kusye-aleksandrovskiy,ru
    LOG: City ID: 3389321, City Name: santa rita,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santa rita,br&units=imperial
    LOG: City ID: 2170581, City Name: coolum beach,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=coolum beach,au&units=imperial
    LOG: City ID: 3472391, City Name: amambai,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=amambai,br&units=imperial
    Missing key at grand centre,ca
    LOG: City ID: 3355672, City Name: luderitz,na, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=luderitz,na&units=imperial
    LOG: City ID: 1800065, City Name: nangong,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nangong,cn&units=imperial
    LOG: City ID: 2179639, City Name: warkworth,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=warkworth,nz&units=imperial
    Missing key at svetlyy,ru
    LOG: City ID: 6113828, City Name: provost,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=provost,ca&units=imperial
    LOG: City ID: 6355222, City Name: yulara,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yulara,au&units=imperial
    LOG: City ID: 2026861, City Name: berdigestyakh,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=berdigestyakh,ru&units=imperial
    LOG: City ID: 5688789, City Name: dickinson,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dickinson,us&units=imperial
    LOG: City ID: 3421765, City Name: nanortalik,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nanortalik,gl&units=imperial
    LOG: City ID: 2120591, City Name: tilichiki,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tilichiki,ru&units=imperial
    Missing key at evenskjaer,no
    LOG: City ID: 3416888, City Name: grindavik,is, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=grindavik,is&units=imperial
    LOG: City ID: 144616, City Name: ahar,ir, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ahar,ir&units=imperial
    LOG: City ID: 1214488, City Name: meulaboh,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=meulaboh,id&units=imperial
    LOG: City ID: 2012938, City Name: yerofey pavlovich,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yerofey pavlovich,ru&units=imperial
    LOG: City ID: 3491355, City Name: black river,jm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=black river,jm&units=imperial
    Missing key at hendijan,ir
    LOG: City ID: 772195, City Name: gizycko,pl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gizycko,pl&units=imperial
    LOG: City ID: 2108502, City Name: honiara,sb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=honiara,sb&units=imperial
    LOG: City ID: 2013918, City Name: ust-maya,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ust-maya,ru&units=imperial
    LOG: City ID: 3843123, City Name: neuquen,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=neuquen,ar&units=imperial
    LOG: City ID: 2095925, City Name: ialibu,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ialibu,pg&units=imperial
    LOG: City ID: 2281120, City Name: tabou,ci, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tabou,ci&units=imperial
    LOG: City ID: 2126682, City Name: bilibino,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bilibino,ru&units=imperial
    Missing key at marzuq,ly
    LOG: City ID: 1242110, City Name: kalmunai,lk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kalmunai,lk&units=imperial
    LOG: City ID: 5859699, City Name: college,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=college,us&units=imperial
    LOG: City ID: 1489656, City Name: teya,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=teya,ru&units=imperial
    LOG: City ID: 2399001, City Name: mayumba,ga, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mayumba,ga&units=imperial
    LOG: City ID: 4011743, City Name: constitucion,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=constitucion,mx&units=imperial
    LOG: City ID: 2032201, City Name: bulgan,mn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bulgan,mn&units=imperial
    LOG: City ID: 6156102, City Name: steinbach,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=steinbach,ca&units=imperial
    LOG: City ID: 1804153, City Name: leshan,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=leshan,cn&units=imperial
    LOG: City ID: 1276731, City Name: basudebpur,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=basudebpur,in&units=imperial
    LOG: City ID: 2446796, City Name: bilma,ne, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bilma,ne&units=imperial
    LOG: City ID: 3641099, City Name: el vigia,ve, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=el vigia,ve&units=imperial
    Missing key at bac lieu,vn
    LOG: City ID: 3580477, City Name: west bay,ky, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=west bay,ky&units=imperial
    LOG: City ID: 2381334, City Name: atar,mr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=atar,mr&units=imperial
    LOG: City ID: 3418910, City Name: upernavik,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=upernavik,gl&units=imperial
    LOG: City ID: 2630299, City Name: hofn,is, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hofn,is&units=imperial
    LOG: City ID: 5710360, City Name: winnemucca,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=winnemucca,us&units=imperial
    LOG: City ID: 2013279, City Name: vostok,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vostok,ru&units=imperial
    LOG: City ID: 3572640, City Name: clarence town,bs, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=clarence town,bs&units=imperial
    LOG: City ID: 1151528, City Name: pa sang,th, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pa sang,th&units=imperial
    LOG: City ID: 986717, City Name: kruisfontein,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kruisfontein,za&units=imperial
    LOG: City ID: 464790, City Name: zapolyarnyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zapolyarnyy,ru&units=imperial
    LOG: City ID: 779622, City Name: havoysund,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=havoysund,no&units=imperial
    LOG: City ID: 3674676, City Name: mitu,co, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mitu,co&units=imperial
    LOG: City ID: 2075720, City Name: broome,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=broome,au&units=imperial
    LOG: City ID: 921900, City Name: dzaoudzi,yt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dzaoudzi,yt&units=imperial
    LOG: City ID: 3480908, City Name: la asuncion,ve, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=la asuncion,ve&units=imperial
    LOG: City ID: 2840555, City Name: schalksmuhle,de, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=schalksmuhle,de&units=imperial
    LOG: City ID: 3133895, City Name: tromso,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tromso,no&units=imperial
    LOG: City ID: 3386213, City Name: touros,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=touros,br&units=imperial
    LOG: City ID: 2303287, City Name: bawku,gh, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bawku,gh&units=imperial
    LOG: City ID: 1489822, City Name: teguldet,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=teguldet,ru&units=imperial
    LOG: City ID: 522410, City Name: nevel,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nevel,ru&units=imperial
    LOG: City ID: 119374, City Name: qeshm,ir, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=qeshm,ir&units=imperial
    LOG: City ID: 464179, City Name: zavetnoye,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zavetnoye,ru&units=imperial
    LOG: City ID: 2972350, City Name: toul,fr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=toul,fr&units=imperial
    LOG: City ID: 1855540, City Name: naze,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=naze,jp&units=imperial
    LOG: City ID: 1106643, City Name: quatre cocos,mu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=quatre cocos,mu&units=imperial
    LOG: City ID: 2185329, City Name: waipawa,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=waipawa,nz&units=imperial
    LOG: City ID: 2403094, City Name: waterloo,sl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=waterloo,sl&units=imperial
    LOG: City ID: 2400578, City Name: fougamou,ga, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fougamou,ga&units=imperial
    LOG: City ID: 3421319, City Name: nuuk,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nuuk,gl&units=imperial
    LOG: City ID: 525426, City Name: sobolevo,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sobolevo,ru&units=imperial
    Missing key at sodertalje,se
    LOG: City ID: 2276492, City Name: harper,lr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=harper,lr&units=imperial
    LOG: City ID: 3465329, City Name: coruripe,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=coruripe,br&units=imperial
    LOG: City ID: 1486321, City Name: yar-sale,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yar-sale,ru&units=imperial
    LOG: City ID: 2160413, City Name: leeton,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=leeton,au&units=imperial
    LOG: City ID: 2065594, City Name: mount isa,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mount isa,au&units=imperial
    LOG: City ID: 3140301, City Name: sandnessjoen,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sandnessjoen,no&units=imperial
    LOG: City ID: 933995, City Name: souillac,mu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=souillac,mu&units=imperial
    LOG: City ID: 3194494, City Name: niksic,me, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=niksic,me&units=imperial
    LOG: City ID: 1655559, City Name: luang prabang,la, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=luang prabang,la&units=imperial
    LOG: City ID: 3608828, City Name: iralaya,hn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=iralaya,hn&units=imperial
    LOG: City ID: 231550, City Name: kiboga,ug, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kiboga,ug&units=imperial
    LOG: City ID: 1486910, City Name: komsomolskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=komsomolskiy,ru&units=imperial
    LOG: City ID: 1181065, City Name: chitral,pk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chitral,pk&units=imperial
    LOG: City ID: 2360541, City Name: gayeri,bf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gayeri,bf&units=imperial
    LOG: City ID: 1795632, City Name: shenjiamen,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shenjiamen,cn&units=imperial
    LOG: City ID: 3558315, City Name: gibara,cu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gibara,cu&units=imperial
    LOG: City ID: 6078372, City Name: moose factory,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=moose factory,ca&units=imperial
    Missing key at burica,pa
    LOG: City ID: 2027044, City Name: batagay,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=batagay,ru&units=imperial
    LOG: City ID: 3447779, City Name: serra,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=serra,br&units=imperial
    LOG: City ID: 893485, City Name: chiredzi,zw, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chiredzi,zw&units=imperial
    LOG: City ID: 5975004, City Name: high level,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=high level,ca&units=imperial
    LOG: City ID: 2014624, City Name: udachnyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=udachnyy,ru&units=imperial
    LOG: City ID: 2173911, City Name: broken hill,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=broken hill,au&units=imperial
    LOG: City ID: 2136150, City Name: luganville,vu, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=luganville,vu&units=imperial
    LOG: City ID: 2021041, City Name: kyra,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kyra,ru&units=imperial
    Missing key at papara,pf
    LOG: City ID: 3441483, City Name: nueva helvecia,uy, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nueva helvecia,uy&units=imperial
    LOG: City ID: 2125906, City Name: dukat,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dukat,ru&units=imperial
    LOG: City ID: 4692521, City Name: friendswood,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=friendswood,us&units=imperial
    Missing key at tabo-o,ph
    LOG: City ID: 2019488, City Name: namtsy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=namtsy,ru&units=imperial
    LOG: City ID: 2524181, City Name: melito di porto salvo,it, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=melito di porto salvo,it&units=imperial
    LOG: City ID: 3609667, City Name: french harbor,hn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=french harbor,hn&units=imperial
    LOG: City ID: 2654970, City Name: brae,gb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=brae,gb&units=imperial
    LOG: City ID: 962367, City Name: richards bay,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=richards bay,za&units=imperial
    LOG: City ID: 2510573, City Name: teguise,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=teguise,es&units=imperial
    LOG: City ID: 4366164, City Name: washington,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=washington,us&units=imperial
    LOG: City ID: 4021858, City Name: guerrero negro,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=guerrero negro,mx&units=imperial
    LOG: City ID: 2565056, City Name: punta umbria,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=punta umbria,es&units=imperial
    LOG: City ID: 2112444, City Name: kamaishi,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kamaishi,jp&units=imperial
    LOG: City ID: 2488835, City Name: medea,dz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=medea,dz&units=imperial
    LOG: City ID: 3694112, City Name: paita,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=paita,pe&units=imperial
    LOG: City ID: 2063056, City Name: port augusta,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port augusta,au&units=imperial
    LOG: City ID: 1488235, City Name: ust-charyshskaya pristan,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ust-charyshskaya pristan,ru&units=imperial
    LOG: City ID: 4004293, City Name: ixtapa,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ixtapa,mx&units=imperial
    LOG: City ID: 3372783, City Name: ponta delgada,pt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ponta delgada,pt&units=imperial
    LOG: City ID: 3577154, City Name: oranjestad,aw, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=oranjestad,aw&units=imperial
    LOG: City ID: 1696188, City Name: palauig,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=palauig,ph&units=imperial
    LOG: City ID: 556131, City Name: is,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=is,ru&units=imperial
    Missing key at asau,tv
    Missing key at gondar,et
    LOG: City ID: 87205, City Name: darnah,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=darnah,ly&units=imperial
    LOG: City ID: 6094391, City Name: ormstown,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ormstown,ca&units=imperial
    LOG: City ID: 3440777, City Name: rocha,uy, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rocha,uy&units=imperial
    LOG: City ID: 3437443, City Name: pozo colorado,py, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pozo colorado,py&units=imperial
    LOG: City ID: 3937516, City Name: juli,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=juli,pe&units=imperial
    Missing key at tsihombe,mg
    LOG: City ID: 3101426, City Name: ciechocinek,pl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ciechocinek,pl&units=imperial
    LOG: City ID: 4153188, City Name: destin,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=destin,us&units=imperial
    LOG: City ID: 584365, City Name: abrau-dyurso,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=abrau-dyurso,ru&units=imperial
    LOG: City ID: 5812604, City Name: sunnyside,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sunnyside,us&units=imperial
    LOG: City ID: 64814, City Name: bandarbeyla,so, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bandarbeyla,so&units=imperial
    LOG: City ID: 3404558, City Name: cabedelo,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cabedelo,br&units=imperial
    LOG: City ID: 1794480, City Name: shuiji,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shuiji,cn&units=imperial
    LOG: City ID: 3573374, City Name: the valley,ai, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=the valley,ai&units=imperial
    LOG: City ID: 2030065, City Name: mandalgovi,mn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mandalgovi,mn&units=imperial
    LOG: City ID: 2122104, City Name: petropavlovsk-kamchatskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=petropavlovsk-kamchatskiy,ru&units=imperial
    LOG: City ID: 2126638, City Name: bogorodskoye,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bogorodskoye,ru&units=imperial
    Missing key at krasnoselkup,ru
    LOG: City ID: 5892532, City Name: banff,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=banff,ca&units=imperial
    LOG: City ID: 2035836, City Name: manzhouli,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=manzhouli,cn&units=imperial
    LOG: City ID: 5847486, City Name: kailua,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kailua,us&units=imperial
    LOG: City ID: 2510485, City Name: tias,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tias,es&units=imperial
    LOG: City ID: 1226260, City Name: trincomalee,lk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=trincomalee,lk&units=imperial
    Missing key at kegayli,uz
    LOG: City ID: 1805733, City Name: jinchang,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=jinchang,cn&units=imperial
    LOG: City ID: 204953, City Name: tshikapa,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tshikapa,cd&units=imperial
    LOG: City ID: 184921, City Name: mwingi,ke, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mwingi,ke&units=imperial
    LOG: City ID: 2629833, City Name: husavik,is, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=husavik,is&units=imperial
    LOG: City ID: 2618795, City Name: klaksvik,fo, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=klaksvik,fo&units=imperial
    LOG: City ID: 3578441, City Name: saint-francois,gp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saint-francois,gp&units=imperial
    LOG: City ID: 236901, City Name: ouadda,cf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ouadda,cf&units=imperial
    LOG: City ID: 2240449, City Name: luanda,ao, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=luanda,ao&units=imperial
    LOG: City ID: 5983720, City Name: iqaluit,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=iqaluit,ca&units=imperial
    LOG: City ID: 1518980, City Name: shymkent,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shymkent,kz&units=imperial
    LOG: City ID: 2420883, City Name: fria,gn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fria,gn&units=imperial
    LOG: City ID: 2664855, City Name: varnamo,se, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=varnamo,se&units=imperial
    LOG: City ID: 2152659, City Name: port macquarie,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port macquarie,au&units=imperial
    LOG: City ID: 1848373, City Name: fukue,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fukue,jp&units=imperial
    LOG: City ID: 2969958, City Name: verdun,fr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=verdun,fr&units=imperial
    Missing key at tlahualilo,mx
    Missing key at mahadday weyne,so
    LOG: City ID: 1082243, City Name: ambilobe,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ambilobe,mg&units=imperial
    LOG: City ID: 5554072, City Name: juneau,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=juneau,us&units=imperial
    LOG: City ID: 6096551, City Name: pangnirtung,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pangnirtung,ca&units=imperial
    LOG: City ID: 479071, City Name: umba,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=umba,ru&units=imperial
    LOG: City ID: 3466980, City Name: caravelas,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=caravelas,br&units=imperial
    LOG: City ID: 2236967, City Name: soyo,ao, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=soyo,ao&units=imperial
    Missing key at aybak,af
    LOG: City ID: 3357804, City Name: eenhana,na, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=eenhana,na&units=imperial
    Missing key at lasa,cn
    LOG: City ID: 2652885, City Name: cleethorpes,gb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cleethorpes,gb&units=imperial
    LOG: City ID: 1488774, City Name: tyukhtet,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tyukhtet,ru&units=imperial
    LOG: City ID: 2145554, City Name: ulladulla,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ulladulla,au&units=imperial
    LOG: City ID: 1526041, City Name: atasu,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=atasu,kz&units=imperial
    LOG: City ID: 3646487, City Name: carora,ve, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=carora,ve&units=imperial
    LOG: City ID: 2155742, City Name: narrabri,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=narrabri,au&units=imperial
    LOG: City ID: 7626370, City Name: bud,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bud,no&units=imperial
    LOG: City ID: 496307, City Name: severnyy-kospashskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=severnyy-kospashskiy,ru&units=imperial
    LOG: City ID: 3395981, City Name: maceio,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=maceio,br&units=imperial
    Missing key at meyungs,pw
    LOG: City ID: 2259655, City Name: impfondo,cg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=impfondo,cg&units=imperial
    LOG: City ID: 5301067, City Name: kingman,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kingman,us&units=imperial
    Missing key at marcona,pe
    LOG: City ID: 3079556, City Name: bela pod bezdezem,cz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bela pod bezdezem,cz&units=imperial
    LOG: City ID: 5469841, City Name: grants,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=grants,us&units=imperial
    LOG: City ID: 2090021, City Name: namatanai,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=namatanai,pg&units=imperial
    LOG: City ID: 2447513, City Name: arlit,ne, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=arlit,ne&units=imperial
    LOG: City ID: 2014078, City Name: urusha,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=urusha,ru&units=imperial
    Missing key at rawannawi,ki
    LOG: City ID: 3347019, City Name: namibe,ao, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=namibe,ao&units=imperial
    LOG: City ID: 1276788, City Name: basar,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=basar,in&units=imperial
    LOG: City ID: 462522, City Name: zimovniki,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zimovniki,ru&units=imperial
    LOG: City ID: 559731, City Name: gornyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gornyy,ru&units=imperial
    LOG: City ID: 1491719, City Name: sladkovo,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sladkovo,ru&units=imperial
    LOG: City ID: 5325327, City Name: avenal,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=avenal,us&units=imperial
    LOG: City ID: 310641, City Name: kaman,tr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kaman,tr&units=imperial
    LOG: City ID: 5314245, City Name: show low,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=show low,us&units=imperial
    LOG: City ID: 1507116, City Name: dudinka,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dudinka,ru&units=imperial
    LOG: City ID: 2172880, City Name: byron bay,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=byron bay,au&units=imperial
    LOG: City ID: 2029947, City Name: moron,mn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=moron,mn&units=imperial
    LOG: City ID: 1185239, City Name: sarankhola,bd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sarankhola,bd&units=imperial
    LOG: City ID: 1640344, City Name: kendari,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kendari,id&units=imperial
    LOG: City ID: 245338, City Name: am timan,td, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=am timan,td&units=imperial
    LOG: City ID: 5666176, City Name: miles city,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=miles city,us&units=imperial
    LOG: City ID: 57000, City Name: hobyo,so, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hobyo,so&units=imperial
    LOG: City ID: 2428394, City Name: mao,td, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mao,td&units=imperial
    Missing key at teul,mx
    LOG: City ID: 1651591, City Name: amahai,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=amahai,id&units=imperial
    LOG: City ID: 4590184, City Name: orangeburg,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=orangeburg,us&units=imperial
    LOG: City ID: 1626542, City Name: sorong,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sorong,id&units=imperial
    LOG: City ID: 70979, City Name: sayyan,ye, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sayyan,ye&units=imperial
    LOG: City ID: 1786855, City Name: rongcheng,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rongcheng,cn&units=imperial
    LOG: City ID: 3662489, City Name: santa isabel do rio negro,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santa isabel do rio negro,br&units=imperial
    LOG: City ID: 2396853, City Name: omboue,ga, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=omboue,ga&units=imperial
    LOG: City ID: 3662927, City Name: pauini,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pauini,br&units=imperial
    LOG: City ID: 5924351, City Name: clyde river,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=clyde river,ca&units=imperial
    LOG: City ID: 3391412, City Name: portel,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=portel,br&units=imperial
    LOG: City ID: 2306104, City Name: teshie,gh, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=teshie,gh&units=imperial
    LOG: City ID: 935214, City Name: saint-pierre,re, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saint-pierre,re&units=imperial
    LOG: City ID: 1270349, City Name: harihar,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=harihar,in&units=imperial
    LOG: City ID: 6324729, City Name: halifax,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=halifax,ca&units=imperial
    LOG: City ID: 214974, City Name: kalemie,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kalemie,cd&units=imperial
    LOG: City ID: 2508813, City Name: adrar,dz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=adrar,dz&units=imperial
    LOG: City ID: 3666395, City Name: urrao,co, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=urrao,co&units=imperial
    LOG: City ID: 1847947, City Name: shingu,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shingu,jp&units=imperial
    LOG: City ID: 884927, City Name: mutoko,zw, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mutoko,zw&units=imperial
    LOG: City ID: 2172832, City Name: caboolture,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=caboolture,au&units=imperial
    LOG: City ID: 5861897, City Name: fairbanks,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fairbanks,us&units=imperial
    LOG: City ID: 609404, City Name: khromtau,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=khromtau,kz&units=imperial
    LOG: City ID: 1861450, City Name: ise,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ise,jp&units=imperial
    LOG: City ID: 1154689, City Name: ko samui,th, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ko samui,th&units=imperial
    LOG: City ID: 638936, City Name: rovaniemi,fi, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rovaniemi,fi&units=imperial
    LOG: City ID: 2278158, City Name: buchanan,lr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=buchanan,lr&units=imperial
    LOG: City ID: 1636022, City Name: martapura,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=martapura,id&units=imperial
    LOG: City ID: 1788268, City Name: dongsheng,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dongsheng,cn&units=imperial
    LOG: City ID: 1529484, City Name: hami,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hami,cn&units=imperial
    LOG: City ID: 2128975, City Name: nemuro,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nemuro,jp&units=imperial
    LOG: City ID: 886763, City Name: masvingo,zw, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=masvingo,zw&units=imperial
    LOG: City ID: 1859964, City Name: kaseda,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kaseda,jp&units=imperial
    LOG: City ID: 2163055, City Name: horsham,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=horsham,au&units=imperial
    LOG: City ID: 4647963, City Name: paris,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=paris,us&units=imperial
    LOG: City ID: 2013459, City Name: verkh-usugli,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=verkh-usugli,ru&units=imperial
    LOG: City ID: 5572979, City Name: merrill,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=merrill,us&units=imperial
    Missing key at irbil,iq
    LOG: City ID: 6096232, City Name: paisley,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=paisley,ca&units=imperial
    LOG: City ID: 1259395, City Name: porbandar,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=porbandar,in&units=imperial
    LOG: City ID: 162627, City Name: yabrud,sy, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yabrud,sy&units=imperial
    LOG: City ID: 1241622, City Name: wattegama,lk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=wattegama,lk&units=imperial
    LOG: City ID: 1690039, City Name: palimbang,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=palimbang,ph&units=imperial
    LOG: City ID: 1795857, City Name: shaowu,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shaowu,cn&units=imperial
    LOG: City ID: 3359638, City Name: walvis bay,na, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=walvis bay,na&units=imperial
    Missing key at milkovo,ru
    LOG: City ID: 4470244, City Name: havelock,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=havelock,us&units=imperial
    LOG: City ID: 1498314, City Name: motygino,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=motygino,ru&units=imperial
    LOG: City ID: 3985344, City Name: cerritos,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cerritos,mx&units=imperial
    LOG: City ID: 504409, City Name: pryazha,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pryazha,ru&units=imperial
    LOG: City ID: 142676, City Name: astara,az, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=astara,az&units=imperial
    Missing key at zolotinka,ru
    Missing key at haibowan,cn
    LOG: City ID: 1488838, City Name: tyazhinskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tyazhinskiy,ru&units=imperial
    LOG: City ID: 1783621, City Name: zunyi,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zunyi,cn&units=imperial
    Missing key at ascension,mx
    LOG: City ID: 618453, City Name: zahnitkiv,ua, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zahnitkiv,ua&units=imperial
    Missing key at paradwip,in
    LOG: City ID: 3530691, City Name: chunhuhub,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chunhuhub,mx&units=imperial
    LOG: City ID: 2088122, City Name: port moresby,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port moresby,pg&units=imperial
    LOG: City ID: 6148373, City Name: sioux lookout,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sioux lookout,ca&units=imperial
    LOG: City ID: 2400547, City Name: gamba,ga, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gamba,ga&units=imperial
    LOG: City ID: 350550, City Name: qena,eg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=qena,eg&units=imperial
    LOG: City ID: 6094665, City Name: osoyoos,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=osoyoos,ca&units=imperial
    Missing key at ust-kamchatsk,ru
    LOG: City ID: 4368711, City Name: salisbury,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=salisbury,us&units=imperial
    LOG: City ID: 3514843, City Name: vega de alatorre,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vega de alatorre,mx&units=imperial
    LOG: City ID: 2123614, City Name: makarov,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=makarov,ru&units=imperial
    LOG: City ID: 6111862, City Name: port hardy,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=port hardy,ca&units=imperial
    LOG: City ID: 3429886, City Name: punta alta,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=punta alta,ar&units=imperial
    LOG: City ID: 3402548, City Name: castelo do piaui,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=castelo do piaui,br&units=imperial
    LOG: City ID: 3887127, City Name: iquique,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=iquique,cl&units=imperial
    LOG: City ID: 1806041, City Name: jiaocheng,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=jiaocheng,cn&units=imperial
    LOG: City ID: 2119626, City Name: yagodnoye,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yagodnoye,ru&units=imperial
    LOG: City ID: 6063191, City Name: mackenzie,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mackenzie,ca&units=imperial
    LOG: City ID: 1621313, City Name: ambulu,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ambulu,id&units=imperial
    LOG: City ID: 2177069, City Name: ballina,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ballina,au&units=imperial
    Missing key at barentsburg,sj
    LOG: City ID: 2036776, City Name: huadian,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=huadian,cn&units=imperial
    LOG: City ID: 5530932, City Name: socorro,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=socorro,us&units=imperial
    LOG: City ID: 5024237, City Name: callaway,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=callaway,us&units=imperial
    LOG: City ID: 2146219, City Name: hervey bay,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hervey bay,au&units=imperial
    LOG: City ID: 610091, City Name: chingirlau,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chingirlau,kz&units=imperial
    LOG: City ID: 1808880, City Name: hanting,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hanting,cn&units=imperial
    LOG: City ID: 5312913, City Name: san luis,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=san luis,mx&units=imperial
    LOG: City ID: 189741, City Name: lamu,ke, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lamu,ke&units=imperial
    Missing key at inderborskiy,kz
    LOG: City ID: 509483, City Name: pinega,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pinega,ru&units=imperial
    LOG: City ID: 2098329, City Name: daru,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=daru,pg&units=imperial
    LOG: City ID: 1529376, City Name: korla,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=korla,cn&units=imperial
    LOG: City ID: 1785036, City Name: zhangye,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zhangye,cn&units=imperial
    LOG: City ID: 3347353, City Name: menongue,ao, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=menongue,ao&units=imperial
    LOG: City ID: 3527545, City Name: frontera,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=frontera,mx&units=imperial
    LOG: City ID: 2214827, City Name: mizdah,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mizdah,ly&units=imperial
    LOG: City ID: 5931800, City Name: cranbrook,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cranbrook,ca&units=imperial
    LOG: City ID: 618370, City Name: drochia,md, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=drochia,md&units=imperial
    LOG: City ID: 2385535, City Name: kouango,cf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kouango,cf&units=imperial
    LOG: City ID: 3424934, City Name: saint-pierre,pm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=saint-pierre,pm&units=imperial
    LOG: City ID: 3461425, City Name: ilhabela,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ilhabela,br&units=imperial
    LOG: City ID: 779683, City Name: hammerfest,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hammerfest,no&units=imperial
    LOG: City ID: 3514843, City Name: emilio carranza,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=emilio carranza,mx&units=imperial
    LOG: City ID: 2352110, City Name: okitipupa,ng, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=okitipupa,ng&units=imperial
    LOG: City ID: 2177541, City Name: atherton,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=atherton,au&units=imperial
    LOG: City ID: 3641351, City Name: el tigre,ve, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=el tigre,ve&units=imperial
    LOG: City ID: 2191562, City Name: dunedin,nz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dunedin,nz&units=imperial
    LOG: City ID: 3178784, City Name: chioggia,it, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chioggia,it&units=imperial
    LOG: City ID: 3412093, City Name: vestmannaeyjar,is, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vestmannaeyjar,is&units=imperial
    LOG: City ID: 359783, City Name: asyut,eg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=asyut,eg&units=imperial
    LOG: City ID: 494304, City Name: shipitsyno,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shipitsyno,ru&units=imperial
    LOG: City ID: 1516048, City Name: hovd,mn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hovd,mn&units=imperial
    LOG: City ID: 2122605, City Name: okhotsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=okhotsk,ru&units=imperial
    LOG: City ID: 2123628, City Name: magadan,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=magadan,ru&units=imperial
    Missing key at nioro,ml
    LOG: City ID: 3865086, City Name: bahia blanca,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bahia blanca,ar&units=imperial
    LOG: City ID: 5401297, City Name: tehachapi,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tehachapi,us&units=imperial
    LOG: City ID: 556268, City Name: ostrovnoy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ostrovnoy,ru&units=imperial
    LOG: City ID: 3761664, City Name: higueron,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=higueron,mx&units=imperial
    LOG: City ID: 1078553, City Name: ampanihy,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ampanihy,mg&units=imperial
    Missing key at sakakah,sa
    LOG: City ID: 3665098, City Name: barcelos,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=barcelos,br&units=imperial
    LOG: City ID: 3382527, City Name: apatou,gf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=apatou,gf&units=imperial
    LOG: City ID: 6071900, City Name: melita,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=melita,ca&units=imperial
    LOG: City ID: 3924679, City Name: vilhena,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vilhena,br&units=imperial
    LOG: City ID: 2127060, City Name: arman,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=arman,ru&units=imperial
    Missing key at saint-georges,gf
    Missing key at viligili,mv
    LOG: City ID: 245669, City Name: adre,td, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=adre,td&units=imperial
    Missing key at ngukurr,au
    LOG: City ID: 4125388, City Name: paragould,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=paragould,us&units=imperial
    Missing key at andrelandia,br
    LOG: City ID: 4007812, City Name: eldorado,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=eldorado,mx&units=imperial
    LOG: City ID: 746881, City Name: giresun,tr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=giresun,tr&units=imperial
    LOG: City ID: 3456160, City Name: olinda,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=olinda,br&units=imperial
    LOG: City ID: 2643179, City Name: maidstone,gb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=maidstone,gb&units=imperial
    LOG: City ID: 5558953, City Name: arcata,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=arcata,us&units=imperial
    LOG: City ID: 1269943, City Name: hosdurga,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hosdurga,in&units=imperial
    LOG: City ID: 1065222, City Name: fandriana,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fandriana,mg&units=imperial
    Missing key at naftah,tn
    Missing key at tungkang,tw
    LOG: City ID: 2013216, City Name: vysokogornyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vysokogornyy,ru&units=imperial
    LOG: City ID: 3397851, City Name: itupiranga,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=itupiranga,br&units=imperial
    LOG: City ID: 2721259, City Name: boo,se, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=boo,se&units=imperial
    LOG: City ID: 2360372, City Name: gorom-gorom,bf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gorom-gorom,bf&units=imperial
    LOG: City ID: 5972762, City Name: hay river,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hay river,ca&units=imperial
    LOG: City ID: 4465088, City Name: elizabeth city,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=elizabeth city,us&units=imperial
    LOG: City ID: 333795, City Name: jijiga,et, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=jijiga,et&units=imperial
    LOG: City ID: 3016956, City Name: frontignan,fr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=frontignan,fr&units=imperial
    LOG: City ID: 107304, City Name: buraydah,sa, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=buraydah,sa&units=imperial
    LOG: City ID: 2128815, City Name: makubetsu,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=makubetsu,jp&units=imperial
    LOG: City ID: 3621607, City Name: santa cruz,cr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santa cruz,cr&units=imperial
    Missing key at ayan,ru
    Missing key at ribeira brava,cv
    LOG: City ID: 2023469, City Name: markova,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=markova,ru&units=imperial
    LOG: City ID: 2057087, City Name: kupang,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kupang,id&units=imperial
    LOG: City ID: 2037886, City Name: dandong,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dandong,cn&units=imperial
    LOG: City ID: 1510916, City Name: barabinsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=barabinsk,ru&units=imperial
    LOG: City ID: 5960603, City Name: geraldton,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=geraldton,ca&units=imperial
    LOG: City ID: 2015686, City Name: talakan,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=talakan,ru&units=imperial
    Missing key at emba,kz
    Missing key at faya,td
    LOG: City ID: 1490256, City Name: talnakh,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=talnakh,ru&units=imperial
    LOG: City ID: 1064980, City Name: fenoarivo atsinanana,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fenoarivo atsinanana,mg&units=imperial
    LOG: City ID: 3423146, City Name: ilulissat,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ilulissat,gl&units=imperial
    LOG: City ID: 1811720, City Name: enshi,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=enshi,cn&units=imperial
    LOG: City ID: 2123979, City Name: kurilsk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kurilsk,ru&units=imperial
    LOG: City ID: 5354943, City Name: half moon bay,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=half moon bay,us&units=imperial
    Missing key at tawkar,sd
    LOG: City ID: 1267776, City Name: kargil,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kargil,in&units=imperial
    LOG: City ID: 3354077, City Name: opuwo,na, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=opuwo,na&units=imperial
    Missing key at dolbeau,ca
    LOG: City ID: 1687186, City Name: sarangani,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sarangani,ph&units=imperial
    LOG: City ID: 3401225, City Name: amapa,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=amapa,br&units=imperial
    LOG: City ID: 1862505, City Name: hirara,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hirara,jp&units=imperial
    LOG: City ID: 1802204, City Name: luancheng,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=luancheng,cn&units=imperial
    LOG: City ID: 105299, City Name: jizan,sa, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=jizan,sa&units=imperial
    LOG: City ID: 1278551, City Name: ankola,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ankola,in&units=imperial
    Missing key at catamarca,ar
    LOG: City ID: 1513957, City Name: hazorasp,uz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hazorasp,uz&units=imperial
    LOG: City ID: 5915327, City Name: cap-aux-meules,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cap-aux-meules,ca&units=imperial
    LOG: City ID: 3899539, City Name: antofagasta,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=antofagasta,cl&units=imperial
    LOG: City ID: 909488, City Name: lukulu,zm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lukulu,zm&units=imperial
    LOG: City ID: 2122389, City Name: ossora,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ossora,ru&units=imperial
    LOG: City ID: 3686445, City Name: chivolo,co, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chivolo,co&units=imperial
    LOG: City ID: 2032614, City Name: baruun-urt,mn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=baruun-urt,mn&units=imperial
    LOG: City ID: 651951, City Name: kokkola,fi, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kokkola,fi&units=imperial
    LOG: City ID: 1810845, City Name: fuyang,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=fuyang,cn&units=imperial
    LOG: City ID: 2754681, City Name: heerde,nl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=heerde,nl&units=imperial
    LOG: City ID: 580676, City Name: asekeyevo,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=asekeyevo,ru&units=imperial
    LOG: City ID: 211647, City Name: lodja,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lodja,cd&units=imperial
    LOG: City ID: 1516589, City Name: zhezkazgan,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zhezkazgan,kz&units=imperial
    LOG: City ID: 2145214, City Name: victoria point,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=victoria point,au&units=imperial
    LOG: City ID: 2312895, City Name: mbandaka,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mbandaka,cd&units=imperial
    LOG: City ID: 6115187, City Name: quesnel,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=quesnel,ca&units=imperial
    LOG: City ID: 1504382, City Name: kargasok,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kargasok,ru&units=imperial
    Missing key at kamenskoye,ru
    LOG: City ID: 3946820, City Name: barranca,pe, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=barranca,pe&units=imperial
    LOG: City ID: 1498161, City Name: muzhi,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=muzhi,ru&units=imperial
    LOG: City ID: 359792, City Name: aswan,eg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=aswan,eg&units=imperial
    Missing key at galiwinku,au
    LOG: City ID: 5720495, City Name: coos bay,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=coos bay,us&units=imperial
    Missing key at teluk nibung,id
    LOG: City ID: 2028164, City Name: deputatskiy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=deputatskiy,ru&units=imperial
    LOG: City ID: 520552, City Name: nizhniy odes,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nizhniy odes,ru&units=imperial
    LOG: City ID: 1266397, City Name: kodinar,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kodinar,in&units=imperial
    Missing key at loiza,us
    LOG: City ID: 3402229, City Name: chapadinha,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=chapadinha,br&units=imperial
    LOG: City ID: 5574991, City Name: boulder,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=boulder,us&units=imperial
    LOG: City ID: 1067565, City Name: beloha,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=beloha,mg&units=imperial
    LOG: City ID: 215527, City Name: kabinda,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kabinda,cd&units=imperial
    LOG: City ID: 1791779, City Name: wanning,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=wanning,cn&units=imperial
    Missing key at jiroft,ir
    LOG: City ID: 5570160, City Name: redding,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=redding,us&units=imperial
    LOG: City ID: 5934709, City Name: dalmeny,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dalmeny,ca&units=imperial
    LOG: City ID: 2277060, City Name: gbarnga,lr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gbarnga,lr&units=imperial
    LOG: City ID: 1506938, City Name: erzin,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=erzin,ru&units=imperial
    LOG: City ID: 6156244, City Name: stephenville,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=stephenville,ca&units=imperial
    LOG: City ID: 3403127, City Name: capitao poco,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=capitao poco,br&units=imperial
    LOG: City ID: 2094027, City Name: kieta,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kieta,pg&units=imperial
    LOG: City ID: 1056899, City Name: sambava,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sambava,mg&units=imperial
    LOG: City ID: 2304548, City Name: anloga,gh, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=anloga,gh&units=imperial
    Missing key at kota bahru,my
    LOG: City ID: 2173125, City Name: burnie,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=burnie,au&units=imperial
    LOG: City ID: 3652567, City Name: san cristobal,ec, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=san cristobal,ec&units=imperial
    LOG: City ID: 3141667, City Name: roald,no, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=roald,no&units=imperial
    LOG: City ID: 3456248, City Name: nortelandia,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nortelandia,br&units=imperial
    LOG: City ID: 2146142, City Name: townsville,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=townsville,au&units=imperial
    LOG: City ID: 3422683, City Name: kangaatsiaq,gl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kangaatsiaq,gl&units=imperial
    LOG: City ID: 1520253, City Name: zharkent,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zharkent,kz&units=imperial
    LOG: City ID: 3595181, City Name: jocotan,gt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=jocotan,gt&units=imperial
    LOG: City ID: 3391889, City Name: pitimbu,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pitimbu,br&units=imperial
    LOG: City ID: 1490796, City Name: strezhevoy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=strezhevoy,ru&units=imperial
    LOG: City ID: 1715335, City Name: davila,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=davila,ph&units=imperial
    LOG: City ID: 2027042, City Name: batagay-alyta,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=batagay-alyta,ru&units=imperial
    LOG: City ID: 3179806, City Name: casoria,it, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=casoria,it&units=imperial
    LOG: City ID: 64013, City Name: bosaso,so, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bosaso,so&units=imperial
    LOG: City ID: 3456368, City Name: navirai,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=navirai,br&units=imperial
    LOG: City ID: 4145381, City Name: wilmington,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=wilmington,us&units=imperial
    Missing key at xadani,mx
    Missing key at bobonong,bw
    LOG: City ID: 3910094, City Name: monteagudo,bo, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=monteagudo,bo&units=imperial
    LOG: City ID: 2644688, City Name: leeds,gb, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=leeds,gb&units=imperial
    LOG: City ID: 5113142, City Name: cohoes,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cohoes,us&units=imperial
    LOG: City ID: 4829843, City Name: alexander city,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=alexander city,us&units=imperial
    LOG: City ID: 5954718, City Name: flin flon,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=flin flon,ca&units=imperial
    LOG: City ID: 1850144, City Name: nishihara,jp, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nishihara,jp&units=imperial
    LOG: City ID: 3171760, City Name: ozieri,it, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ozieri,it&units=imperial
    LOG: City ID: 2263905, City Name: ribeira brava,pt, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ribeira brava,pt&units=imperial
    LOG: City ID: 2416061, City Name: sangueya,gn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sangueya,gn&units=imperial
    LOG: City ID: 4588165, City Name: mount pleasant,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mount pleasant,us&units=imperial
    LOG: City ID: 253666, City Name: skhisma,gr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=skhisma,gr&units=imperial
    LOG: City ID: 897456, City Name: sinazongwe,zm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sinazongwe,zm&units=imperial
    LOG: City ID: 3855065, City Name: general roca,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=general roca,ar&units=imperial
    LOG: City ID: 2472431, City Name: bin qirdan,tn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bin qirdan,tn&units=imperial
    LOG: City ID: 921786, City Name: mitsamiouli,km, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mitsamiouli,km&units=imperial
    LOG: City ID: 2214433, City Name: nalut,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nalut,ly&units=imperial
    LOG: City ID: 2291087, City Name: bonoua,ci, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bonoua,ci&units=imperial
    LOG: City ID: 463355, City Name: zheleznodorozhnyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=zheleznodorozhnyy,ru&units=imperial
    Missing key at tarudant,ma
    LOG: City ID: 2171069, City Name: colac,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=colac,au&units=imperial
    LOG: City ID: 3982846, City Name: san jeronimo,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=san jeronimo,mx&units=imperial
    Missing key at pietarsaari,fi
    LOG: City ID: 1803560, City Name: lingao,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lingao,cn&units=imperial
    LOG: City ID: 4373554, City Name: bremerton,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bremerton,us&units=imperial
    LOG: City ID: 6062069, City Name: lunenburg,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lunenburg,ca&units=imperial
    LOG: City ID: 4673389, City Name: bellmead,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bellmead,us&units=imperial
    LOG: City ID: 964712, City Name: plettenberg bay,za, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=plettenberg bay,za&units=imperial
    LOG: City ID: 5978133, City Name: hudson bay,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hudson bay,ca&units=imperial
    LOG: City ID: 161901, City Name: kaka,tm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kaka,tm&units=imperial
    LOG: City ID: 1252783, City Name: yarada,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yarada,in&units=imperial
    Missing key at sonoita,mx
    LOG: City ID: 1807689, City Name: huaihua,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=huaihua,cn&units=imperial
    LOG: City ID: 338345, City Name: edd,er, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=edd,er&units=imperial
    LOG: City ID: 2509575, City Name: villamartin,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=villamartin,es&units=imperial
    LOG: City ID: 5509851, City Name: pahrump,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pahrump,us&units=imperial
    LOG: City ID: 3897347, City Name: calama,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=calama,cl&units=imperial
    LOG: City ID: 370481, City Name: marawi,sd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=marawi,sd&units=imperial
    Missing key at loyabad,in
    Missing key at karamken,ru
    LOG: City ID: 1835848, City Name: seoul,kr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=seoul,kr&units=imperial
    LOG: City ID: 2449893, City Name: tessalit,ml, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tessalit,ml&units=imperial
    LOG: City ID: 554318, City Name: kalevala,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kalevala,ru&units=imperial
    Missing key at doctor pedro p. pena,py
    LOG: City ID: 5223593, City Name: newport,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=newport,us&units=imperial
    LOG: City ID: 1510377, City Name: belyy yar,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=belyy yar,ru&units=imperial
    Missing key at sumbawa,id
    LOG: City ID: 2093846, City Name: kiunga,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kiunga,pg&units=imperial
    LOG: City ID: 548442, City Name: kirishi,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kirishi,ru&units=imperial
    LOG: City ID: 3408424, City Name: ipixuna,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ipixuna,br&units=imperial
    LOG: City ID: 1651103, City Name: atambua,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=atambua,id&units=imperial
    LOG: City ID: 1337612, City Name: dhidhdhoo,mv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dhidhdhoo,mv&units=imperial
    LOG: City ID: 2020584, City Name: magistralnyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=magistralnyy,ru&units=imperial
    LOG: City ID: 6050066, City Name: la ronge,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=la ronge,ca&units=imperial
    LOG: City ID: 1496511, City Name: novyy urengoy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=novyy urengoy,ru&units=imperial
    Missing key at marv dasht,ir
    LOG: City ID: 554549, City Name: beloye,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=beloye,ru&units=imperial
    LOG: City ID: 1054329, City Name: vangaindrano,mg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vangaindrano,mg&units=imperial
    LOG: City ID: 2295517, City Name: savelugu,gh, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=savelugu,gh&units=imperial
    LOG: City ID: 3472473, City Name: alto araguaia,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=alto araguaia,br&units=imperial
    LOG: City ID: 3893726, City Name: constitucion,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=constitucion,cl&units=imperial
    LOG: City ID: 1217907, City Name: olot,uz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=olot,uz&units=imperial
    LOG: City ID: 1804162, City Name: lengshuitan,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lengshuitan,cn&units=imperial
    LOG: City ID: 678886, City Name: draguseni,ro, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=draguseni,ro&units=imperial
    LOG: City ID: 553725, City Name: kamenka,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kamenka,ru&units=imperial
    LOG: City ID: 1485724, City Name: talaya,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=talaya,ru&units=imperial
    LOG: City ID: 1789065, City Name: ankang,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ankang,cn&units=imperial
    LOG: City ID: 2120612, City Name: tigil,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=tigil,ru&units=imperial
    LOG: City ID: 1803331, City Name: linxia,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=linxia,cn&units=imperial
    LOG: City ID: 3655673, City Name: salinas,ec, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=salinas,ec&units=imperial
    Missing key at raga,sd
    LOG: City ID: 2019135, City Name: nizhniy kuranakh,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nizhniy kuranakh,ru&units=imperial
    LOG: City ID: 1673820, City Name: kaohsiung,tw, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kaohsiung,tw&units=imperial
    LOG: City ID: 5856516, City Name: ahuimanu,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ahuimanu,us&units=imperial
    LOG: City ID: 699329, City Name: osypenko,ua, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=osypenko,ua&units=imperial
    LOG: City ID: 711527, City Name: nikita,ua, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nikita,ua&units=imperial
    LOG: City ID: 5606401, City Name: sandpoint,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sandpoint,us&units=imperial
    Missing key at dien bien,vn
    Missing key at candawaga,ph
    LOG: City ID: 5975034, City Name: high prairie,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=high prairie,ca&units=imperial
    LOG: City ID: 1267433, City Name: kattivakkam,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kattivakkam,in&units=imperial
    LOG: City ID: 2023360, City Name: izvestkovyy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=izvestkovyy,ru&units=imperial
    LOG: City ID: 2408582, City Name: hastings,sl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hastings,sl&units=imperial
    LOG: City ID: 2517750, City Name: felanitx,es, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=felanitx,es&units=imperial
    Missing key at kemijarvi,fi
    LOG: City ID: 1282898, City Name: pokhara,np, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=pokhara,np&units=imperial
    LOG: City ID: 5393052, City Name: santa cruz,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santa cruz,us&units=imperial
    LOG: City ID: 1337613, City Name: kulhudhuffushi,mv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kulhudhuffushi,mv&units=imperial
    LOG: City ID: 2212775, City Name: sabha,ly, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sabha,ly&units=imperial
    LOG: City ID: 3835994, City Name: santa rosa,ar, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santa rosa,ar&units=imperial
    LOG: City ID: 1488903, City Name: turukhansk,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=turukhansk,ru&units=imperial
    LOG: City ID: 3458479, City Name: loanda,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=loanda,br&units=imperial
    LOG: City ID: 2016477, City Name: sivaki,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sivaki,ru&units=imperial
    LOG: City ID: 2377450, City Name: nouakchott,mr, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nouakchott,mr&units=imperial
    Missing key at carikar,af
    LOG: City ID: 2018735, City Name: nyurba,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=nyurba,ru&units=imperial
    LOG: City ID: 4240782, City Name: hillsboro,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=hillsboro,us&units=imperial
    Missing key at shirgaon,in
    LOG: City ID: 2013727, City Name: vanavara,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=vanavara,ru&units=imperial
    LOG: City ID: 2453662, City Name: markala,ml, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=markala,ml&units=imperial
    LOG: City ID: 3871336, City Name: santiago,cl, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santiago,cl&units=imperial
    LOG: City ID: 2255542, City Name: owando,cg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=owando,cg&units=imperial
    LOG: City ID: 2394819, City Name: cotonou,bj, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cotonou,bj&units=imperial
    LOG: City ID: 3353540, City Name: rehoboth,na, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rehoboth,na&units=imperial
    LOG: City ID: 1586443, City Name: ca mau,vn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ca mau,vn&units=imperial
    LOG: City ID: 1273294, City Name: dwarka,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=dwarka,in&units=imperial
    LOG: City ID: 3450909, City Name: rondonopolis,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rondonopolis,br&units=imperial
    LOG: City ID: 3996234, City Name: lazaro cardenas,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lazaro cardenas,mx&units=imperial
    LOG: City ID: 1498919, City Name: lugovoy,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lugovoy,ru&units=imperial
    LOG: City ID: 2362909, City Name: banfora,bf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=banfora,bf&units=imperial
    LOG: City ID: 2953449, City Name: bad harzburg,de, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bad harzburg,de&units=imperial
    LOG: City ID: 116102, City Name: shadegan,ir, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shadegan,ir&units=imperial
    LOG: City ID: 2094144, City Name: kerema,pg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kerema,pg&units=imperial
    LOG: City ID: 1726977, City Name: bantogon,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bantogon,ph&units=imperial
    LOG: City ID: 6049403, City Name: langham,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=langham,ca&units=imperial
    LOG: City ID: 3382226, City Name: camopi,gf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=camopi,gf&units=imperial
    LOG: City ID: 1728675, City Name: balabac,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=balabac,ph&units=imperial
    Missing key at alappuzha,in
    LOG: City ID: 3424941, City Name: miquelon,pm, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=miquelon,pm&units=imperial
    LOG: City ID: 5905393, City Name: bonavista,ca, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bonavista,ca&units=imperial
    LOG: City ID: 1275572, City Name: bindki,in, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bindki,in&units=imperial
    LOG: City ID: 1170706, City Name: mastung,pk, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=mastung,pk&units=imperial
    LOG: City ID: 3451138, City Name: rio grande,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=rio grande,br&units=imperial
    LOG: City ID: 3671519, City Name: puerto carreno,co, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=puerto carreno,co&units=imperial
    LOG: City ID: 2425791, City Name: sarh,td, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sarh,td&units=imperial
    LOG: City ID: 1713030, City Name: general macarthur,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=general macarthur,ph&units=imperial
    LOG: City ID: 2025241, City Name: churapcha,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=churapcha,ru&units=imperial
    LOG: City ID: 358048, City Name: damietta,eg, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=damietta,eg&units=imperial
    LOG: City ID: 923058, City Name: kambove,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=kambove,cd&units=imperial
    LOG: City ID: 2961730, City Name: roscrea,ie, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=roscrea,ie&units=imperial
    LOG: City ID: 3380290, City Name: sinnamary,gf, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=sinnamary,gf&units=imperial
    LOG: City ID: 608271, City Name: shubarkuduk,kz, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=shubarkuduk,kz&units=imperial
    LOG: City ID: 3996069, City Name: santa isabel,mx, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=santa isabel,mx&units=imperial
    LOG: City ID: 3461370, City Name: imbituba,br, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=imbituba,br&units=imperial
    LOG: City ID: 2036581, City Name: jiamusi,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=jiamusi,cn&units=imperial
    Missing key at tumannyy,ru
    LOG: City ID: 2071059, City Name: gawler,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=gawler,au&units=imperial
    LOG: City ID: 3351663, City Name: benguela,ao, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=benguela,ao&units=imperial
    LOG: City ID: 1636308, City Name: manokwari,id, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=manokwari,id&units=imperial
    LOG: City ID: 1528998, City Name: yumen,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=yumen,cn&units=imperial
    Missing key at tawnat,ma
    LOG: City ID: 2035265, City Name: qiqihar,cn, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=qiqihar,cn&units=imperial
    LOG: City ID: 7522928, City Name: san andres,co, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=san andres,co&units=imperial
    LOG: City ID: 2303611, City Name: axim,gh, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=axim,gh&units=imperial
    Missing key at ojitlan,mx
    LOG: City ID: 1715348, City Name: panacan,ph, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=panacan,ph&units=imperial
    LOG: City ID: 2177413, City Name: ayr,au, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ayr,au&units=imperial
    Missing key at dujuma,so
    LOG: City ID: 4706057, City Name: lewisville,us, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=lewisville,us&units=imperial
    LOG: City ID: 219414, City Name: basoko,cd, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=basoko,cd&units=imperial
    LOG: City ID: 3713959, City Name: bocas del toro,pa, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=bocas del toro,pa&units=imperial
    LOG: City ID: 454310, City Name: ventspils,lv, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=ventspils,lv&units=imperial
    Missing key at bokspits,bw
    LOG: City ID: 1732945, City Name: cukai,my, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=cukai,my&units=imperial
    LOG: City ID: 1489401, City Name: toora-khem,ru, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=toora-khem,ru&units=imperial
    LOG: City ID: 2523920, City Name: palermo,it, URL: http://api.openweathermap.org/data/2.5/weather?&APPID=5e751c682b57a9bad7423672fbe44c1d&q=palermo,it&units=imperial





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
      <th>Temp</th>
      <th>Lat</th>
      <th>Humidity</th>
      <th>Clouds</th>
      <th>Wind</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>longyearbyen,sj</th>
      <td>53.60</td>
      <td>78.22</td>
      <td>81</td>
      <td>0</td>
      <td>3.36</td>
    </tr>
    <tr>
      <th>qaanaaq,gl</th>
      <td>39.37</td>
      <td>77.48</td>
      <td>89</td>
      <td>0</td>
      <td>3.76</td>
    </tr>
    <tr>
      <th>dikson,ru</th>
      <td>37.66</td>
      <td>73.51</td>
      <td>100</td>
      <td>88</td>
      <td>22.77</td>
    </tr>
    <tr>
      <th>upernavik,gl</th>
      <td>41.17</td>
      <td>72.79</td>
      <td>90</td>
      <td>36</td>
      <td>3.65</td>
    </tr>
    <tr>
      <th>khatanga,ru</th>
      <td>47.38</td>
      <td>71.98</td>
      <td>96</td>
      <td>88</td>
      <td>16.17</td>
    </tr>
    <tr>
      <th>saskylakh,ru</th>
      <td>50.17</td>
      <td>71.97</td>
      <td>77</td>
      <td>0</td>
      <td>11.92</td>
    </tr>
    <tr>
      <th>tiksi,ru</th>
      <td>49.36</td>
      <td>71.64</td>
      <td>81</td>
      <td>24</td>
      <td>8.46</td>
    </tr>
    <tr>
      <th>mehamn,no</th>
      <td>66.20</td>
      <td>71.03</td>
      <td>77</td>
      <td>0</td>
      <td>4.70</td>
    </tr>
    <tr>
      <th>havoysund,no</th>
      <td>59.00</td>
      <td>71.00</td>
      <td>87</td>
      <td>40</td>
      <td>8.05</td>
    </tr>
    <tr>
      <th>honningsvag,no</th>
      <td>60.16</td>
      <td>70.98</td>
      <td>89</td>
      <td>32</td>
      <td>20.98</td>
    </tr>
    <tr>
      <th>berlevag,no</th>
      <td>71.65</td>
      <td>70.86</td>
      <td>77</td>
      <td>0</td>
      <td>4.70</td>
    </tr>
    <tr>
      <th>hammerfest,no</th>
      <td>59.00</td>
      <td>70.66</td>
      <td>87</td>
      <td>40</td>
      <td>8.05</td>
    </tr>
    <tr>
      <th>chokurdakh,ru</th>
      <td>46.66</td>
      <td>70.62</td>
      <td>100</td>
      <td>88</td>
      <td>5.55</td>
    </tr>
    <tr>
      <th>clyde river,ca</th>
      <td>34.24</td>
      <td>70.47</td>
      <td>93</td>
      <td>92</td>
      <td>3.09</td>
    </tr>
    <tr>
      <th>vardo,no</th>
      <td>72.99</td>
      <td>70.37</td>
      <td>60</td>
      <td>20</td>
      <td>17.22</td>
    </tr>
    <tr>
      <th>pevek,ru</th>
      <td>54.67</td>
      <td>69.70</td>
      <td>75</td>
      <td>0</td>
      <td>2.98</td>
    </tr>
    <tr>
      <th>tromso,no</th>
      <td>59.00</td>
      <td>69.65</td>
      <td>87</td>
      <td>75</td>
      <td>21.92</td>
    </tr>
    <tr>
      <th>talnakh,ru</th>
      <td>42.61</td>
      <td>69.49</td>
      <td>79</td>
      <td>44</td>
      <td>14.61</td>
    </tr>
    <tr>
      <th>tuktoyaktuk,ca</th>
      <td>50.00</td>
      <td>69.44</td>
      <td>76</td>
      <td>75</td>
      <td>6.93</td>
    </tr>
    <tr>
      <th>zapolyarnyy,ru</th>
      <td>73.40</td>
      <td>69.43</td>
      <td>69</td>
      <td>0</td>
      <td>12.75</td>
    </tr>
    <tr>
      <th>dudinka,ru</th>
      <td>42.43</td>
      <td>69.41</td>
      <td>70</td>
      <td>88</td>
      <td>20.76</td>
    </tr>
    <tr>
      <th>leningradskiy,ru</th>
      <td>43.69</td>
      <td>69.38</td>
      <td>84</td>
      <td>8</td>
      <td>13.71</td>
    </tr>
    <tr>
      <th>deputatskiy,ru</th>
      <td>53.14</td>
      <td>69.30</td>
      <td>67</td>
      <td>0</td>
      <td>3.98</td>
    </tr>
    <tr>
      <th>ilulissat,gl</th>
      <td>41.00</td>
      <td>69.22</td>
      <td>86</td>
      <td>75</td>
      <td>8.05</td>
    </tr>
    <tr>
      <th>cherskiy,ru</th>
      <td>58.81</td>
      <td>68.75</td>
      <td>54</td>
      <td>8</td>
      <td>4.32</td>
    </tr>
    <tr>
      <th>aasiaat,gl</th>
      <td>41.53</td>
      <td>68.71</td>
      <td>100</td>
      <td>92</td>
      <td>12.82</td>
    </tr>
    <tr>
      <th>kangaatsiaq,gl</th>
      <td>40.99</td>
      <td>68.31</td>
      <td>99</td>
      <td>92</td>
      <td>20.31</td>
    </tr>
    <tr>
      <th>aklavik,ca</th>
      <td>55.40</td>
      <td>68.22</td>
      <td>66</td>
      <td>90</td>
      <td>2.24</td>
    </tr>
    <tr>
      <th>bilibino,ru</th>
      <td>59.26</td>
      <td>68.06</td>
      <td>64</td>
      <td>20</td>
      <td>4.43</td>
    </tr>
    <tr>
      <th>ostrovnoy,ru</th>
      <td>69.16</td>
      <td>68.05</td>
      <td>85</td>
      <td>36</td>
      <td>10.25</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>horsham,au</th>
      <td>47.92</td>
      <td>-36.71</td>
      <td>94</td>
      <td>0</td>
      <td>15.50</td>
    </tr>
    <tr>
      <th>lebu,cl</th>
      <td>49.99</td>
      <td>-37.62</td>
      <td>100</td>
      <td>0</td>
      <td>14.38</td>
    </tr>
    <tr>
      <th>mount gambier,au</th>
      <td>50.80</td>
      <td>-37.83</td>
      <td>83</td>
      <td>8</td>
      <td>11.92</td>
    </tr>
    <tr>
      <th>colac,au</th>
      <td>48.37</td>
      <td>-38.34</td>
      <td>91</td>
      <td>0</td>
      <td>7.45</td>
    </tr>
    <tr>
      <th>warrnambool,au</th>
      <td>51.70</td>
      <td>-38.38</td>
      <td>100</td>
      <td>0</td>
      <td>21.32</td>
    </tr>
    <tr>
      <th>tres arroyos,ar</th>
      <td>45.04</td>
      <td>-38.38</td>
      <td>55</td>
      <td>8</td>
      <td>7.90</td>
    </tr>
    <tr>
      <th>necochea,ar</th>
      <td>41.53</td>
      <td>-38.55</td>
      <td>74</td>
      <td>0</td>
      <td>9.46</td>
    </tr>
    <tr>
      <th>bahia blanca,ar</th>
      <td>43.24</td>
      <td>-38.72</td>
      <td>80</td>
      <td>0</td>
      <td>1.74</td>
    </tr>
    <tr>
      <th>neuquen,ar</th>
      <td>44.60</td>
      <td>-38.95</td>
      <td>72</td>
      <td>0</td>
      <td>3.31</td>
    </tr>
    <tr>
      <th>general roca,ar</th>
      <td>44.60</td>
      <td>-39.03</td>
      <td>72</td>
      <td>0</td>
      <td>3.31</td>
    </tr>
    <tr>
      <th>waipawa,nz</th>
      <td>57.37</td>
      <td>-39.94</td>
      <td>55</td>
      <td>0</td>
      <td>4.09</td>
    </tr>
    <tr>
      <th>viedma,ar</th>
      <td>35.23</td>
      <td>-40.81</td>
      <td>83</td>
      <td>0</td>
      <td>2.86</td>
    </tr>
    <tr>
      <th>burnie,au</th>
      <td>53.77</td>
      <td>-41.05</td>
      <td>96</td>
      <td>88</td>
      <td>16.51</td>
    </tr>
    <tr>
      <th>devonport,au</th>
      <td>41.26</td>
      <td>-41.18</td>
      <td>90</td>
      <td>92</td>
      <td>3.42</td>
    </tr>
    <tr>
      <th>westport,nz</th>
      <td>48.73</td>
      <td>-41.75</td>
      <td>100</td>
      <td>92</td>
      <td>3.98</td>
    </tr>
    <tr>
      <th>ancud,cl</th>
      <td>42.61</td>
      <td>-41.87</td>
      <td>97</td>
      <td>48</td>
      <td>1.74</td>
    </tr>
    <tr>
      <th>greymouth,nz</th>
      <td>51.34</td>
      <td>-42.45</td>
      <td>100</td>
      <td>92</td>
      <td>10.25</td>
    </tr>
    <tr>
      <th>castro,cl</th>
      <td>40.09</td>
      <td>-42.48</td>
      <td>100</td>
      <td>36</td>
      <td>2.64</td>
    </tr>
    <tr>
      <th>new norfolk,au</th>
      <td>41.00</td>
      <td>-42.78</td>
      <td>75</td>
      <td>0</td>
      <td>8.05</td>
    </tr>
    <tr>
      <th>hobart,au</th>
      <td>41.00</td>
      <td>-42.88</td>
      <td>75</td>
      <td>0</td>
      <td>8.05</td>
    </tr>
    <tr>
      <th>rawson,ar</th>
      <td>37.75</td>
      <td>-43.30</td>
      <td>72</td>
      <td>0</td>
      <td>7.00</td>
    </tr>
    <tr>
      <th>te anau,nz</th>
      <td>40.27</td>
      <td>-45.41</td>
      <td>99</td>
      <td>80</td>
      <td>2.98</td>
    </tr>
    <tr>
      <th>coihaique,cl</th>
      <td>41.41</td>
      <td>-45.58</td>
      <td>56</td>
      <td>20</td>
      <td>4.70</td>
    </tr>
    <tr>
      <th>dunedin,nz</th>
      <td>46.93</td>
      <td>-45.87</td>
      <td>90</td>
      <td>32</td>
      <td>3.65</td>
    </tr>
    <tr>
      <th>tuatapere,nz</th>
      <td>46.75</td>
      <td>-46.13</td>
      <td>100</td>
      <td>80</td>
      <td>6.22</td>
    </tr>
    <tr>
      <th>kaitangata,nz</th>
      <td>49.09</td>
      <td>-46.28</td>
      <td>90</td>
      <td>44</td>
      <td>8.79</td>
    </tr>
    <tr>
      <th>mar del plata,ar</th>
      <td>39.46</td>
      <td>-46.43</td>
      <td>82</td>
      <td>0</td>
      <td>5.99</td>
    </tr>
    <tr>
      <th>bluff,nz</th>
      <td>50.89</td>
      <td>-46.60</td>
      <td>95</td>
      <td>32</td>
      <td>20.20</td>
    </tr>
    <tr>
      <th>punta arenas,cl</th>
      <td>41.00</td>
      <td>-53.16</td>
      <td>80</td>
      <td>75</td>
      <td>14.99</td>
    </tr>
    <tr>
      <th>ushuaia,ar</th>
      <td>37.40</td>
      <td>-54.81</td>
      <td>93</td>
      <td>90</td>
      <td>11.41</td>
    </tr>
  </tbody>
</table>
<p>869 rows × 5 columns</p>
</div>




```python
# function for absolute value
def abs_val(num):
    abs_num = np.sqrt(num**2)
    return abs_num
```


```python
# apply absolute value function to DataFrame to create a "Distance from Equator" column named abs_Lat
summDF['abs_Lat'] = summDF['Lat'].apply(abs_val)
summDF.sample(10)
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
      <th>Temp</th>
      <th>Lat</th>
      <th>Humidity</th>
      <th>Clouds</th>
      <th>Wind</th>
      <th>abs_Lat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>wanning,cn</th>
      <td>82.93</td>
      <td>18.80</td>
      <td>96</td>
      <td>0</td>
      <td>7.90</td>
      <td>18.80</td>
    </tr>
    <tr>
      <th>carnarvon,au</th>
      <td>64.30</td>
      <td>-24.87</td>
      <td>88</td>
      <td>32</td>
      <td>22.77</td>
      <td>24.87</td>
    </tr>
    <tr>
      <th>atherton,au</th>
      <td>75.20</td>
      <td>-17.27</td>
      <td>69</td>
      <td>40</td>
      <td>11.41</td>
      <td>17.27</td>
    </tr>
    <tr>
      <th>sovetskiy,ru</th>
      <td>61.51</td>
      <td>56.76</td>
      <td>80</td>
      <td>0</td>
      <td>6.67</td>
      <td>56.76</td>
    </tr>
    <tr>
      <th>melita,ca</th>
      <td>66.46</td>
      <td>49.27</td>
      <td>76</td>
      <td>0</td>
      <td>3.42</td>
      <td>49.27</td>
    </tr>
    <tr>
      <th>shinpokh,pk</th>
      <td>86.00</td>
      <td>34.33</td>
      <td>58</td>
      <td>1</td>
      <td>1.12</td>
      <td>34.33</td>
    </tr>
    <tr>
      <th>bambous virieux,mu</th>
      <td>68.00</td>
      <td>-20.34</td>
      <td>88</td>
      <td>40</td>
      <td>5.82</td>
      <td>20.34</td>
    </tr>
    <tr>
      <th>calama,cl</th>
      <td>59.00</td>
      <td>-22.46</td>
      <td>5</td>
      <td>0</td>
      <td>11.41</td>
      <td>22.46</td>
    </tr>
    <tr>
      <th>yarada,in</th>
      <td>78.70</td>
      <td>17.65</td>
      <td>100</td>
      <td>76</td>
      <td>25.90</td>
      <td>17.65</td>
    </tr>
    <tr>
      <th>baykit,ru</th>
      <td>42.97</td>
      <td>61.68</td>
      <td>99</td>
      <td>44</td>
      <td>3.98</td>
      <td>61.68</td>
    </tr>
  </tbody>
</table>
</div>




```python
fig1 = sns.jointplot(x=summDF['Temp'], y=summDF['Lat'], kind='kde')
plt.title(f'Density and Distribution of Temp vs Latitude @ {today}', loc='left')
plt.show()
fig1.savefig('TempVLatKDE.png')
```


![png](output_5_0.png)



```python
fig2 = sns.regplot(x=summDF['Temp'], y=summDF['Lat'])
plt.title(f'Plot and Regression of Temp vs Latitude @ {today}')
plt.show()
fig2.figure.savefig('TempVLatScatter.png')
```


![png](output_6_0.png)



```python
fig3 = sns.jointplot(x=summDF['Temp'], y=summDF['abs_Lat'], kind='kde')
plt.title(f'Density and Distribution of Temp vs Equatorial Distance @ {today}', loc='left')
plt.show()
fig3.savefig('TempVAbsLatKDE.png')
```


![png](output_7_0.png)



```python
fig4 = sns.regplot(x=summDF['Temp'], y=summDF['abs_Lat'])
plt.title(f'Plot and Regression of Temp vs Equatorial Distance @ {today}')
plt.show()
fig4.figure.savefig('TempVAbsLatScatter.png')
```


![png](output_8_0.png)



```python
fig5 = sns.jointplot(x=summDF['Humidity'], y=summDF['Lat'], kind='kde')
plt.title(f'Density and Distribution of Humidity vs Latitude @ {today}', loc='left')
plt.show()
fig5.savefig('HumidityVLatKDE.png')
```


![png](output_9_0.png)



```python
fig6 = sns.regplot(x=summDF['Humidity'], y=summDF['Lat'])
plt.title(f'Plot and Regression of Humidity vs Latitude @ {today}')
plt.show()
fig6.figure.savefig('HumidityVLatScatter.png')
```


![png](output_10_0.png)



```python
fig7 = sns.jointplot(x=summDF['Clouds'], y=summDF['Lat'], kind='kde')
plt.title(f'Density and Distribution of Cloud Cover vs Latitude @ {today}', loc='left')
plt.show()
fig7.savefig('CloudVLatKDE.png')
```


![png](output_11_0.png)



```python
fig8 = sns.regplot(x=summDF['Clouds'], y=summDF['Lat'])
plt.title(f'Plot and Regression of Cloud Cover vs Latitude @ {today}')
plt.show()
fig8.figure.savefig('CloudVLatScatter.png')
```


![png](output_12_0.png)



```python
fig9 = sns.jointplot(x=summDF['Wind'], y=summDF['Lat'], kind='kde')
plt.title(f'Density and Distribution of Wind Speed vs Latitude @ {today}', loc='left')
plt.show()
fig9.savefig('WindVLatKDE.png')
```


![png](output_13_0.png)



```python
fig10 = sns.regplot(x=summDF['Wind'], y=summDF['Lat'])
plt.title(f'Plot and Regression of Wind Speed vs Latitude @ {today}')
plt.show()
fig10.figure.savefig('WindVLatScatter.png')
```


![png](output_14_0.png)



```python
fig11 = sns.pairplot(summDF)
plt.title(f'Correlation Matrix for Temp, Latitude, Humidity(%), Cloud Cover, Wind Speed, and Absolute Value of Latitude @ {today}',
          loc='right', 
          position=(0,5.6))
plt.show()
fig11.savefig('CorrelationMatrix.png')

```


![png](output_15_0.png)



```python
# write data to csv
summDF.to_csv('Weather_CSV.csv')
```
