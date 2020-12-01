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
 *    2.0 Click expansion text 7x, do validation for each click
 *      2.1 Validate that expansion text does not re-occur
 */
describe('npmjs.com random expansion', () => {
  it('should not use previous expansion', async () => {

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

      // Find our expansion text element and store it in a variable
      const expansionElement = await driver.findElement(
        By.xpath(`//header/div[contains(@class, 'bg-white')]//span[contains(@class, 'nowrap')]`)
      )

      // Store our previous expansion texts here
      const previousExpansions = []

      // 2.0 Click expansion text 100x, do validation for each click
      for (_ of new Array(7)) {
        // 2.1 Validate that expansion text does not re-occur
        const currentExpansionText = await expansionElement.getText()
        expect(previousExpansions).not.toContain(currentExpansionText)

        // Store our current expansion text
        previousExpansions.push(currentExpansionText)

        // Click expansion text to reload a new one
        await expansionElement.click()
        await driver.sleep(200)
      }
    } finally {
      await driver.quit()
    }
  })
})
