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

    it('Navigate the google page title', async () => {
        //Open the Browser
        await driver.get('https://www.google.com/')

        // Wait until browser loads completely
        await driver.sleep(2000)
        await driver.wait(() => {
          return driver.executeScript('return document.readyState').then(state => {
            return state === 'complete'
          })
        }, 120000)

            //Validate that the title matcthes expected to homepage title
            const homepageTitle = await driver.getTitle()
                expect(homepageTitle).toEqual('Google')

            console.log(homepageTitle);
    })

    it('Navigate the search page title', async () => {
        // Fill up the search field and click the enter key
        await driver.findElement(By.xpath("//body/div[@id='viewport']/div[@id='searchform']/form[@id='tsf']/div[2]/div[1]/div[1]/div[1]/div[2]/input[1]"))
        .sendKeys('selenium bootcamp', Key.ENTER)

            // Validate that the searched value match to the search page title
            const searchpageTitle = await driver.getTitle()
                expect(searchpageTitle).toEqual('selenium bootcamp - Google Search')

            console.log(searchpageTitle)
    })

    it('Navigate the search result', async () => { 
    // Validate that this package matches our search criteria
     const test = await driver.findElement(By.xpath("//span[contains(text(),'Selenium Bootcamp - Chapter 1 | Sauce Labs')]"))
        expect(test).toBeTruthy();
    
    // Close the Browser
     await driver.quit()
    })    
})