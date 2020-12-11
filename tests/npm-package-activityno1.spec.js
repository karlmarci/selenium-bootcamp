// chromedriver reference: https://www.npmjs.com/package/chromedriver#running-with-selenium-webdriver
require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')

// test timeout 5 minutes
jest.setTimeout(300000)

describe('npmjs.com package search', () => {
  // generate options for chrome
  const chromeOptions = new Options()
  // detailed info for these args: https://peter.sh/experiments/chromium-command-line-switches/
  chromeOptions.addArguments('--no-sandbox')
  chromeOptions.addArguments('--disable-gpu')
  chromeOptions.addArguments('--disable-dev-shm-usage')
  // turn off headless by removing this
  // chromeOptions.addArguments('--headless')
  chromeOptions.windowSize({ width: 1500, height: 1080 })

  // selenium webdriver
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build()

    it('Navigate the google page title', async() => {
        //Open the Browser
        await driver.get('https://www.google.com/')

        // Wait until browser loads completely
        await driver.sleep(2000)
        await driver.wait(() => {
          return driver.executeScript('return document.readyState').then(state => {
            return state === 'complete'
          })
        }, 120000)

            // Validate that the title matcthes expected to homepage title
            const homepageTitle = await driver.getTitle()
                expect(homepageTitle).toEqual('Google')
    })

    it('Navigate the search page title', async() => {
        // Fill up the search field and click the enter key
        await driver.findElement(By.xpath("//input[@name='q']"))
        .sendKeys('selenium bootcamp', Key.ENTER)

            // Validate the search page title contains search criteria -"selenium bootcamp-Google Search
            const searchpageTitle = await driver.getTitle()
                expect(searchpageTitle).toEqual('selenium bootcamp - Google Search')
    })

    it('Navigate the search result', async() => { 
        // Validate the first search result contains words from our search criteria: "selenium“ or "bootcamp“
        const test = await (await driver.findElement(By.xpath(`//div[@class='rc']//h3//span`)))
          expect(test).toBeTruthy()
        for(testing in test)
        {
          const arraytest = await test.getText()
            expect(/selenium|bootcamp/ig.test(arraytest)).toBeTruthy()
        }
        
        //Close the Browser
        await driver.quit()
  })    
})