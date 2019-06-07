def scrapeMars():
    # coding: utf-8

    # In[1]:

    from splinter import Browser
    from bs4 import BeautifulSoup
    import pandas as pd

    # In[2]:

    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)

    # In[20]:

    url = 'https://mars.nasa.gov/news/'
    browser.visit(url)

    # In[21]:

    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')
    # Retrieve all elements that contain article information
    articles = soup.find_all('div', class_='list_text')

    # In[22]:

    articleList = []
    for article in articles:
        title = article.find('div', class_='content_title')
        titleText = title.find('a').contents[0]
        bodyText = article.find(
            'div', class_='article_teaser_body').contents[0]
        articleList.append({titleText: bodyText})
    #     print(titleText)
    #     print(bodyText)

    # In[23]:

    # articleList

    # In[6]:

    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url)

    # In[7]:

    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')
    # click on the picture button
    browser.find_by_id('full_image').first.click()
    # Rerun soup
    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')
    # Retrieve image element
    div = soup.find('div', class_='carousel_items')
    image = div.article["style"]

    # In[8]:

    # image

    # In[9]:

    imgHref = image.split('\'')
    baseUrl = url.split('spaceimages')
    baseUrl = baseUrl[0][:-1]

    # In[24]:

    featureImg = baseUrl + imgHref[1]
    featureImg

    # In[11]:

    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)

    # In[12]:

    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')

    # In[13]:

    # this mars weather has been tweeting a lot of non-weather things
    mars_weather = soup.find('p', class_='tweet-text').text

    # In[25]:

    # mars_weather

    # In[14]:

    url = 'https://space-facts.com/mars/'
    browser.visit(url)
    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')

    # In[15]:

    # <table id="tablepress-mars" class="tablepress tablepress-id-mars">
    table = soup.find('table', class_='tablepress-id-mars')
    page = pd.read_html(str(table), flavor='html5lib')
    marsDF = page[0]
    marsDF.columns = ['Data', 'Value']

    # In[30]:

    # marsDF

    # In[29]:

    # can't tell if this is what the homework wants, which is odd, or the DF
    marsTableStr = str(table)
    # marsTableStr

    # In[17]:

    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)
    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html, 'html.parser')

    # In[18]:

    # scrape list of links
    div = soup.find('div', class_='collapsible results')
    links = div.findAll('a', class_='itemLink')
    hemiList = []
    # loop through the list
    for n, link in enumerate(links, start=1):
        if n % 2 == 0:
            # click on link
            browser.find_by_text(link.text).first.click()
            # HTML object
            html = browser.html
            # Parse HTML with Beautiful Soup
            soup = BeautifulSoup(html, 'html.parser')
            # scrape full sized url and title
            title = link.text
            imgFull = soup.find('a', text='Original')
            imgLink = imgFull["href"]
            # add url and title to dict
            hemiDict = {title: imgLink}
            # append dict to list
            hemiList.append(hemiDict)
            # return browser to base url page
            browser.visit(url)
        else:
            next

    # In[31]:

    marsFullData = {
        "articles": articleList,
        "big_image": featureImg,
        "weather": mars_weather,
        "table": marsTableStr,
        "hemispheres": hemiList
    }

    return (marsFullData)
