import { axe, goToComponent } from '@govuk-frontend/helpers/puppeteer'
import { getExamples } from '@govuk-frontend/lib/components'

describe('/components/accordion', () => {
  let axeRules

  beforeAll(() => {
    axeRules = {
      /**
       * Ignore 'aria-labelledby attribute cannot be used on a div with
       * no valid role attribute'
       *
       * {@link https://github.com/CautionYourBlast/govuk-frontend/issues/2472}
       */
      'aria-prohibited-attr': { enabled: false }
    }
  })

  describe('component examples', () => {
    let exampleNames

    beforeAll(async () => {
      exampleNames = Object.keys(await getExamples('accordion'))
    })

    it('passes accessibility tests', async () => {
      for (const exampleName of exampleNames) {
        // Navigation to example, create report
        await goToComponent(page, 'accordion', { exampleName })
        await expect(axe(page, axeRules)).resolves.toHaveNoViolations()
      }
    }, 120000)
  })
})
