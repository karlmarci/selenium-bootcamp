// chromedriver reference: https://www.npmjs.com/package/chromedriver#running-with-selenium-webdriver
require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')

// test timeout 5 minutes
jest.setTimeout(300000)

/**
 * Scenario:
 *    1.0 Navigate to npm homepage - https://www.npmjs.com/
 *      1.1 Validate that the title matches expected homepage title
 *    2.0 Fill up search field using my search criteria (selenium-webdriver), then hit enter key
 *      2.1 Validate that the title matches expected search page title
 *      2.2 Validate that we have a result that matches our search criteria
 *      2.3 Validate that result matches our keywords
 *    3.0 Click on the package that matches our criteria
 *      3.1 Validate that the title matches expected package page title
 *      3.2 Validate that this package matches our search criteria
 */
describe('npmjs.com package search', () => {
  it('basic package search', async () => {

    // generate options for chrome
    const chromeOptions = new Options()
    // detailed info for these args: https://peter.sh/experiments/chromium-command-line-switches/
    chromeOptions.addArguments('--no-sandbox')
    chromeOptions.addArguments('--disable-gpu')
    chromeOptions.addArguments('--disable-dev-shm-usage')
    // turn off headless by removing this
    // chromeOptions.addArguments('--headless')
    chromeOptions.windowSize({ width: 1920, height: 1080 })

    // selenium webdriver
    const driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build()


    try {
      // 1.0 Navigate to npm homepage - https://www.npmjs.com/
      await driver.get(`https://www.npmjs.com/`)

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // 1.1 Validate that the title matches expected homepage title
      const homepageTitle = await driver.getTitle()
      expect(homepageTitle).toEqual('npm | build amazing things')

      // 2.0 Fill up search field using my search criteria (selenium-webdriver), then hit enter key
      await driver
        .wait(until.elementLocated(By.xpath(`//input[@name='q']`)))
        .sendKeys('selenium-webdriver', Key.ENTER)

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // 2.1 Validate that the title matches expected search page title
      const searchPageTitle = await driver.getTitle()
      expect(searchPageTitle).toEqual('selenium-webdriver - npm search')

      // 2.2 Validate that we have a result that matches our search criteria
      const listingMatch = await driver.findElement(By.xpath(`//section//a[.//h3[.='selenium-webdriver']]`))
      expect(listingMatch).toBeTruthy()

      // 2.3 Validate that result matches our keywords
      const keywords = ['automation', 'selenium', 'testing', 'webdriver', 'webdriverjs']
      for (keyword of keywords) {
        const keywordMatch = await driver.findElement(
          By.xpath(`//section//a[.//h3[.='selenium-webdriver']]/ancestor::div[contains(@class, 'items-end')]/following-sibling::ul/li/a[.='${keyword}']`)
        )
        expect(keywordMatch).toBeTruthy()
      }

      // 3.0 Click on the package that matches our criteria
      await listingMatch.click()

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // 3.1 Validate that the title matches expected package page title
      const packagePageTitle = await driver.getTitle()
      expect(packagePageTitle).toEqual('selenium-webdriver - npm')

      // 3.2 Validate that this package matches our search criteria
      const packageTitle = await driver.findElement(By.xpath(`//h2//span[.='selenium-webdriver']`))
      expect(packageTitle).toBeTruthy()
    } finally {
      await driver.quit()
    }
  })
})
