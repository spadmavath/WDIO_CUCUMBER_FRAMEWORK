import { Before, After, BeforeAll, AfterAll } from '@wdio/cucumber-framework'

BeforeAll(async () => {
  console.log('\n🚀 Starting Test Suite...\n')
})

AfterAll(async () => {
  console.log('\n✅ Test Suite Complete.\n')
})

Before(async () => {
  await browser.setWindowSize(1440, 900)
})

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    try {
      await browser.saveScreenshot(`./screenshots/failure_${timestamp}.png`)
    } catch {
      // screenshot directory may not exist — safe to ignore
    }
  }
})
