import { BrowserContext, expect, test, Page } from '@playwright/test'
import {
  BaseAuthority,
  env,
  getEnvironmentBaseUrl,
  TestEnvironment,
  urls,
} from '../../../../support/urls'
import {
  disableI18n,
  disablePreviousApplications,
} from '../../../../support/disablers'
import {
  employerFormMessages,
  parentalLeaveFormMessages,
} from '@island.is/application/templates/parental-leave/messages'
import { coreMessages } from '@island.is/application/core/messages'
import { label } from '../../../../support/i18n'
import {
  EmailAccount,
  makeEmailAccount,
} from '../../../../support/email-account'
import { helpers } from '../../../../support/locator-helpers'
import { session } from '../../../../support/session'
import { setupXroadMocks } from './setup-xroad.mocks'

test.use({ baseURL: urls.islandisBaseUrl })

async function getEmployerEmailAndApprove(employer: EmailAccount, page: Page) {
  const { proceed } = helpers(page)

  const email = await employer.getLastEmail(6)

  if (email && typeof email.html === 'string') {
    const employerUrlMatch = email.html.match(/>(http?:.*)<\/p>/)
    if (employerUrlMatch?.length != 2)
      throw new Error(
        'Email does not contain the url to approve the parental leave application',
      )
    const employerUrl = employerUrlMatch[1]
    if (!employerUrl)
      throw new Error(`Could not find url for employer in email: ${email.html}`)
    await page.goto(employerUrl)

    await page
      .getByRole('region', {
        name: label(employerFormMessages.employerNationalRegistryIdSection),
      })
      .getByRole('textbox')
      // eslint-disable-next-line local-rules/disallow-kennitalas
      .type('5402696029')
    await proceed()

    await page
      .getByRole('button', {
        name: label(coreMessages.buttonApprove),
      })
      .click()

    await expect(
      page.getByRole('heading', { name: label(coreMessages.thanks) }),
    ).toBeVisible()
  } else {
    throw new Error('Email not found, test incomplete')
  }
}

const applicationSystemApi: { [env in TestEnvironment]: string } = {
  dev: getEnvironmentBaseUrl(BaseAuthority.dev),
  staging: getEnvironmentBaseUrl(BaseAuthority.staging),
  prod: getEnvironmentBaseUrl(BaseAuthority.prod),
  local: 'http://localhost:9456',
}

test.describe('Parental leave', () => {
  let context: BrowserContext
  let applicant: EmailAccount
  let employer: EmailAccount
  let applicationID: string
  let submitApplicationSuccess: boolean

  test.beforeAll(async () => {
    applicant = await makeEmailAccount('applicant')
    employer = await makeEmailAccount('employer')
    submitApplicationSuccess = false
  })
  test.beforeEach(async ({ browser }) => {
    context = await session({
      browser: browser,
      homeUrl: `${urls.islandisBaseUrl}/umsoknir/faedingarorlof`,
      phoneNumber: submitApplicationSuccess ? '0102989' : '0103019',
      idsLoginOn: true,
    })
  })
  test.afterAll(async () => {
    await context.close()
  })

  test('Primary parent should be able to create application', async () => {
    const page = await context.newPage()
    await disablePreviousApplications(page)
    await disableI18n(page)
    await setupXroadMocks()

    const apiUrl = applicationSystemApi[env]

    await page.goto('/umsoknir/faedingarorlof', { waitUntil: 'networkidle' })
    const { proceed } = helpers(page)

    applicationID = page.url().split('/').slice(-1)[0]

    // Mock data
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.mockDataUse),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.noOptionLabel),
      })
      .click()
    await proceed()

    // Type of application
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.applicationTypeTitle),
      }),
    ).toBeVisible()
    await page.getByTestId('parental-leave').click()
    await proceed()

    // External Data
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.externalDataSubSection),
      }),
    ).toBeVisible()
    await page.getByTestId('agree-to-data-providers').click()
    await proceed()

    // Child information
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.selectChild.screenTitle),
      }),
    ).toBeVisible()
    await page.getByTestId('child-0').click()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.noOptionLabel),
      })
      .click()
    await page.getByTestId('select-child').click()

    // Email address and telephone number
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.applicant.title),
      }),
    ).toBeVisible()
    const emailBox = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.applicant.email),
    })
    await emailBox.selectText()
    await emailBox.type(`${applicant.email}`)

    const phoneNumber = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.applicant.phoneNumber),
    })
    await phoneNumber.selectText()
    await phoneNumber.type('6555555')
    await proceed()

    // Child's parents
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.otherParentTitle),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.otherParentOption),
      })
      .click()

    const otherParentName = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.shared.otherParentName),
    })
    await otherParentName.selectText()
    await otherParentName.type('Gervimaður Ameríku')

    const otherParentKt = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.shared.otherParentID),
    })
    await otherParentKt.selectText()
    // eslint-disable-next-line local-rules/disallow-kennitalas
    await otherParentKt.type('0101302989')
    await proceed()

    // Confirmation of right of access to a non-custodial parent
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.rightOfAccess.title),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.rightOfAccess.yesOption),
      })
      .click()
    await proceed()

    // Payment information
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.paymentInformationName),
      }),
    ).toBeVisible()

    const paymentBank = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.shared.paymentInformationBank),
    })
    await paymentBank.selectText()
    await paymentBank.type('051226054678')

    await page.waitForResponse(`${apiUrl}/api/graphql?op=GetPensionFunds`)
    const pensionFund = page.getByRole('combobox', {
      name: `${label(parentalLeaveFormMessages.shared.pensionFund)} ${label(
        parentalLeaveFormMessages.shared.asyncSelectSearchableHint,
      )}`,
    })
    await pensionFund.focus()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    await page.getByTestId('use-union').click()
    await page.waitForResponse(`${apiUrl}/api/graphql?op=GetUnions`)
    const paymentUnion = page.getByTestId('payments-union')
    await paymentUnion.focus()
    await page.keyboard.type('VR')
    await page.keyboard.press('Enter')

    await page.getByTestId('use-private-pension-fund').click()
    const privatePensionFund = page.getByTestId('private-pension-fund')
    await privatePensionFund.focus()
    await privatePensionFund.press('ArrowDown')
    await page
      .locator('#react-select-payments\\.privatePensionFund-option-0')
      .click()
    await page.getByTestId('private-pension-fund-ratio').press('ArrowDown')
    await page
      .locator('#react-select-payments\\.privatePensionFundPercentage-option-0')
      .click()
    await proceed()

    // Personal Allowance
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.personalAllowance.title),
      }),
    ).toBeVisible()
    await page.getByTestId('use-personal-finance').click()
    await page.getByTestId('use-as-much-as-possible').click()
    await proceed()

    // Are you self employed?
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.selfEmployed.title),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.noOptionLabel),
      })
      .click()
    await expect(
      page.getByRole('heading', {
        name: label(
          parentalLeaveFormMessages.employer
            .isReceivingUnemploymentBenefitsTitle,
        ),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.noOptionLabel),
      })
      .nth(1)
      .click()
    await proceed()

    // Register an employer
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.employer.registration),
      }),
    ).toBeVisible()
    await page.getByTestId('employer-email').type(employer.email)
    await page.getByTestId('employer-phone-number').type('6555555')
    const employmentRatio = page.getByTestId('employment-ratio')
    await employmentRatio.type('100%')
    await employmentRatio.press('Enter')
    await proceed()

    // Who is your employer?
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.employer.title),
      }),
    ).toBeVisible()
    await proceed()

    // Additional documentation for application
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.attachmentScreen.title),
      }),
    ).toBeVisible()
    await proceed()

    // These are your rights
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.theseAreYourRights),
      }),
    ).toBeVisible()
    await proceed()

    // Transferal of rights
    await page
      .getByRole('region', {
        name: label(parentalLeaveFormMessages.shared.transferRightsTitle),
      })
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.transferRightsNone),
      })
      .click()
    await proceed()

    // Now it is time to select the parental leave periods
    await expect(
      page.getByRole('region', {
        name: label(parentalLeaveFormMessages.shared.periodsImageTitle),
      }),
    ).toBeVisible()
    await proceed()

    // Start of parental leave
    await page
      .getByRole('region', {
        name: label(parentalLeaveFormMessages.firstPeriodStart.title),
      })
      .getByRole('radio', {
        name: label(
          parentalLeaveFormMessages.firstPeriodStart.dateOfBirthOption,
        ),
      })
      .click()
    await proceed()

    // Leave duration
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.duration.title),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.duration.monthsOption),
      })
      .click()
    await proceed()

    await expect(
      page.getByRole('region', {
        name: label(parentalLeaveFormMessages.duration.title),
      }),
    ).toBeVisible()
    await page
      .getByRole('button', {
        name: '6 months',
        exact: true,
      })
      .click()
    await proceed()

    // What percent off your employment ratio will you take for the leave?
    const selectPercentageUse = page.getByTestId('select-percentage-use')
    await selectPercentageUse.focus()
    await page.keyboard.type('50%')
    await page.keyboard.press('Enter')
    await proceed()

    // Here is your current leave plan
    await expect(
      page.getByRole('button', {
        name: label(parentalLeaveFormMessages.leavePlan.addAnother),
      }),
    ).toBeVisible()
    await proceed()

    // Submit application
    await page
      .getByRole('button', {
        name: label(parentalLeaveFormMessages.confirmation.title),
      })
      .click()

    await page.waitForResponse(`${apiUrl}/api/graphql?op=SubmitApplication`)
    const applicationSubmitSuccess = page.getByRole('heading', {
      name: label(parentalLeaveFormMessages.finalScreen.title),
    })
    if (await applicationSubmitSuccess.isVisible()) {
      submitApplicationSuccess = true
      await getEmployerEmailAndApprove(employer, page)
    } else {
      submitApplicationSuccess = false
      throw new Error(
        'Unable to submit primary parent application, test incomplete',
      )
    }
  })

  test('Other parent should be able to create application', async () => {
    // Skip this test if primary parent was unable to submit application
    test.skip(
      submitApplicationSuccess !== true,
      'Primary parent unable to submit application',
    )
    const page = await context.newPage()
    await disablePreviousApplications(page)
    await disableI18n(page)
    await setupXroadMocks()

    const apiUrl = applicationSystemApi[env]

    await page.goto('/umsoknir/faedingarorlof', { waitUntil: 'networkidle' })
    const { proceed } = helpers(page)

    // Mock data
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.mockDataUse),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.yesOptionLabel),
      })
      .click()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.mockDataOtherParent),
      })
      .click()
    await page
      .getByRole('region', {
        name: label(
          parentalLeaveFormMessages.shared.mockDataExistingApplication,
        ),
      })
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.yesOptionLabel),
      })
      .click()

    const mockDataApplicationID = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.shared.mockDataApplicationID),
    })
    await mockDataApplicationID.selectText()
    await mockDataApplicationID.type(applicationID)
    await proceed()

    // Type of application
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.applicationTypeTitle),
      }),
    ).toBeVisible()
    await page.getByTestId('parental-leave').click()
    await proceed()

    // External Data
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.externalDataSubSection),
      }),
    ).toBeVisible()
    await page.getByTestId('agree-to-data-providers').click()
    await proceed()

    // Child information
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.selectChild.screenTitle),
      }),
    ).toBeVisible()
    await page.getByTestId('child-0').click()
    await page.getByTestId('select-child').click()

    // Email address and telephone number
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.applicant.title),
      }),
    ).toBeVisible()
    const emailBox = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.applicant.email),
    })
    await emailBox.selectText()
    await emailBox.type(`${applicant.email}`)

    const phoneNumber = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.applicant.phoneNumber),
    })
    await phoneNumber.selectText()
    await phoneNumber.type('6555555')
    await proceed()

    // Payment information
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.shared.paymentInformationName),
      }),
    ).toBeVisible()

    const paymentBank = page.getByRole('textbox', {
      name: label(parentalLeaveFormMessages.shared.paymentInformationBank),
    })
    await paymentBank.selectText()
    await paymentBank.type('051226054678')

    await page.waitForResponse(`${apiUrl}/api/graphql?op=GetPensionFunds`)
    const pensionFund = page.getByRole('combobox', {
      name: `${label(parentalLeaveFormMessages.shared.pensionFund)} ${label(
        parentalLeaveFormMessages.shared.asyncSelectSearchableHint,
      )}`,
    })
    await pensionFund.focus()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    await page.getByTestId('use-union').click()
    await page.waitForResponse(`${apiUrl}/api/graphql?op=GetUnions`)
    const paymentUnion = page.getByTestId('payments-union')
    await paymentUnion.focus()
    await page.keyboard.type('VR')
    await page.keyboard.press('Enter')

    await page.getByTestId('use-private-pension-fund').click()
    const privatePensionFund = page.getByTestId('private-pension-fund')
    await privatePensionFund.focus()
    await privatePensionFund.press('ArrowDown')
    await page
      .locator('#react-select-payments\\.privatePensionFund-option-0')
      .click()
    await page.getByTestId('private-pension-fund-ratio').press('ArrowDown')
    await page
      .locator('#react-select-payments\\.privatePensionFundPercentage-option-0')
      .click()
    await proceed()

    // Personal Allowance
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.personalAllowance.title),
      }),
    ).toBeVisible()
    await page.getByTestId('use-personal-finance').click()
    await page.getByTestId('use-as-much-as-possible').click()
    await proceed()

    // Are you self employed?
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.selfEmployed.title),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.noOptionLabel),
      })
      .click()
    await expect(
      page.getByRole('heading', {
        name: label(
          parentalLeaveFormMessages.employer
            .isReceivingUnemploymentBenefitsTitle,
        ),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.shared.noOptionLabel),
      })
      .nth(1)
      .click()
    await proceed()

    // Register an employer
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.employer.registration),
      }),
    ).toBeVisible()
    await page.getByTestId('employer-email').type(employer.email)
    await page.getByTestId('employer-phone-number').type('6555555')
    const employmentRatio = page.getByTestId('employment-ratio')
    await employmentRatio.type('100%')
    await employmentRatio.press('Enter')
    await proceed()

    // Who is your employer?
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.employer.title),
      }),
    ).toBeVisible()
    await proceed()

    // Additional documentation for application
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.attachmentScreen.title),
      }),
    ).toBeVisible()
    await proceed()

    // Now it is time to select the parental leave periods
    await expect(
      page.getByRole('region', {
        name: label(parentalLeaveFormMessages.shared.periodsImageTitle),
      }),
    ).toBeVisible()
    await proceed()

    // Start of parental leave
    await page
      .getByRole('region', {
        name: label(parentalLeaveFormMessages.firstPeriodStart.title),
      })
      .getByRole('radio', {
        name: label(
          parentalLeaveFormMessages.firstPeriodStart.dateOfBirthOption,
        ),
      })
      .click()
    await proceed()

    // Leave duration
    await expect(
      page.getByRole('heading', {
        name: label(parentalLeaveFormMessages.duration.title),
      }),
    ).toBeVisible()
    await page
      .getByRole('radio', {
        name: label(parentalLeaveFormMessages.duration.monthsOption),
      })
      .click()
    await proceed()

    await expect(
      page.getByRole('region', {
        name: label(parentalLeaveFormMessages.duration.title),
      }),
    ).toBeVisible()
    await page
      .getByRole('button', {
        name: '3 months',
        exact: true,
      })
      .click()
    await proceed()

    // What percent off your employment ratio will you take for the leave?
    const selectPercentageUse = page.getByTestId('select-percentage-use')
    await selectPercentageUse.focus()
    await page.keyboard.type('50%')
    await page.keyboard.press('Enter')
    await proceed()

    // Here is your current leave plan
    await expect(
      page.getByRole('button', {
        name: label(parentalLeaveFormMessages.leavePlan.addAnother),
      }),
    ).toBeVisible()
    await proceed()

    // Submit application
    await page
      .getByRole('button', {
        name: label(parentalLeaveFormMessages.confirmation.title),
      })
      .click()

    await page.waitForResponse(`${apiUrl}/api/graphql?op=SubmitApplication`)
    const applicationSubmitSuccess = page.getByRole('heading', {
      name: label(parentalLeaveFormMessages.finalScreen.title),
    })
    if (await applicationSubmitSuccess.isVisible()) {
      await getEmployerEmailAndApprove(employer, page)
    } else {
      throw new Error(
        'Unable to submit other parent application, test incomplete',
      )
    }
  })
})
