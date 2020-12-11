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

    it('Navigate the cambridge page title', async() => {
        //Open the Broswer
        await driver.get('https://www.cambridge.org/core')

        //Wait until browser loads completely
        await driver.sleep(2000)
        await driver.wait(() => {
          return driver.executeScript('return document.readyState').then(state => {
            return state === 'complete'
          })
        }, 120000)

        // Validate that tab title is Cambridge
        const homepageTitle = await driver.getTitle()
            expect(homepageTitle).toEqual('Cambridge Core - Journals & Books Online | Cambridge University Press')
    })

    it('Navitage the cambridge core facebook', async() => {
        //Open the Facebook page
        await driver.findElement(By.xpath("//a[@href='https://www.facebook.com/CambridgeCore']")).click()
        
        await driver.sleep(5000)
        await driver.wait(() => {
            return driver.executeScript('return document.readyState').then(state => {
              return state === 'complete'
            })
          }, 120000)

          const mainHandle = await (await driver).getWindowHandle()

          // Load and focus to new tab 
          const allHandles = await (await driver).getAllWindowHandles()
          for (handle of allHandles) {
            if (handle !== mainHandle) {
              await (await driver).switchTo().window(handle);
            }
          }
         
          // Verify that every social media accessed is under Cambridge University Press 
          const fbAccName = await (await driver.findElement(By.xpath(`//span[@class='_kao']//h1//a//span`))).getText()
            expect(fbAccName).toEqual('Cambridge Core');
          
          await (await driver).close()
          await (await driver).switchTo().window(mainHandle)
    })

    it('Navigate the cambridge core twitter', async() => {
      // Open the Twitter page
      await driver.findElement(By.xpath("//a[@href='https://twitter.com/CambridgeCore']")).click()
  
      await driver.sleep(5000)
      await driver.wait(() => {
          return driver.executeScript('return document.readyState').then(state => {
            return state === 'complete'
          })
        }, 120000)

        const mainHandle = await (await driver).getWindowHandle()

        // Load and focus to new tab 
        const allHandles = await (await driver).getAllWindowHandles()
        for (handle of allHandles) {
          if (handle !== mainHandle) {
            await (await driver).switchTo().window(handle);
          }
        }

        // Verify that every social media accessed is under Cambridge University Press
        const twitterAccName = await driver.findElement(By.xpath(`//div[@class='css-1dbjc4n r-15d164r r-1g94qm0']//span//span`)).getText()
          expect(twitterAccName).toEqual('Cambridge Core');

          await (await driver).close()
          await (await driver).switchTo().window(mainHandle)
    })

    it('Navigate the cambridge core linkedin', async() => {
     // Scroll down the page to visible the link
     await driver.executeScript("window.scrollBy(0,250)")

     // Open the LinkedIn page
     await driver.findElement(By.xpath("//a[@href='https://www.linkedin.com/showcase/11096649']")).click()

     await driver.sleep(5000)
      await driver.wait(() => {
          return driver.executeScript('return document.readyState').then(state => {
            return state === 'complete'
          })
        }, 120000)

        const mainHandle = await (await driver).getWindowHandle()

        // Load and focus to new tab
        const allHandles = await (await driver).getAllWindowHandles()
        for (handle of allHandles) {
          if (handle !== mainHandle) {
            await (await driver).switchTo().window(handle);
          }
        }

        // Verify that every social media accessed is under Cambridge University Press
        const linkedinAccName = await driver.findElement(By.xpath(`//div[@class='top-card-layout__entity-info-container']//h1`)).getText()
           expect(linkedinAccName).toEqual('Cambridge University Press – Academic');

           await (await driver).close()
           await (await driver).switchTo().window(mainHandle)
    })

    it('Navigate the cambridge core youtube', async() => {
      // Open the Youtube page
      await driver.findElement(By.xpath("//a[@href='https://www.youtube.com/playlist?list=PLTK8KRW19hUVucVRHbIx73oLKUro8HXt0']")).click()

      await driver.sleep(5000)
      await driver.wait(() => {
          return driver.executeScript('return document.readyState').then(state => {
            return state === 'complete'
          })
        }, 120000)

        const mainHandle = await (await driver).getWindowHandle()

        // Load and focus to new tab 
        const allHandles = await (await driver).getAllWindowHandles()
        for (handle of allHandles) {
          if (handle !== mainHandle) {
            await (await driver).switchTo().window(handle);
          }
        }

        // Verify that every social media accessed is under Cambridge University Press
        const ytAccName = await driver.findElement(By.xpath(`//div[@class='style-scope ytd-playlist-sidebar-renderer']//h1//a`)).getText()
          expect(ytAccName).toEqual('Cambridge Core');

           await (await driver).close()
           await (await driver).switchTo().window(mainHandle)
    })

    it('Navigate the cambridge instagram', async() => {
      // Open the Instagram page
      await driver.findElement(By.xpath("//a[@href='https://www.instagram.com/cupacademic ']")).click()

      await driver.sleep(5000)
      await driver.wait(() => {
          return driver.executeScript('return document.readyState').then(state => {
            return state === 'complete'
          })
        }, 120000)

        const mainHandle = await (await driver).getWindowHandle()

        // Load and focus to new tab
        const allHandles = await (await driver).getAllWindowHandles()
        for (handle of allHandles) {
          if (handle !== mainHandle) {
            await (await driver).switchTo().window(handle);
          }
        }

        // Verify that every social media accessed is under Cambridge University Press
        const instaAccName = await driver.findElement(By.xpath(`//div[@class='nZSzR']//h2`)).getText()
          expect(instaAccName).toEqual('cupacademic');

           await (await driver).close()
           await (await driver).switchTo().window(mainHandle)

          // Close the Browser
          await (await driver).close()
    })
})