import React, { useEffect, useState, useContext } from 'react'
import { Text } from '@island.is/island-ui/core'

import {
  FormContentContainer,
  FormFooter,
  FormLayout,
  RadioButtonContainer,
} from '@island.is/financial-aid-web/osk/src/components'

import { FormContext } from '@island.is/financial-aid-web/osk/src/components/FormProvider/FormProvider'
import { useRouter } from 'next/router'
import * as styles from './incomeForm.treat'
import useFormNavigation from '@island.is/financial-aid-web/osk/src/utils/useFormNavigation'
import cn from 'classnames'
import { NavigationProps } from '@island.is/financial-aid/shared'

const IncomeForm = () => {
  const router = useRouter()

  const { form, updateForm } = useContext(FormContext)
  const [error, setError] = useState(false)

  const navigation: NavigationProps = useFormNavigation(
    router.pathname,
  ) as NavigationProps

  const incomeOptions = [
    {
      label: 'Já, ég hef fengið tekjur',
      value: 0,
    },
    {
      label: 'Nei, engar tekjur',
      value: 1,
    },
  ]

  return (
    <FormLayout
      activeSection={navigation?.activeSectionIndex}
      activeSubSection={navigation?.activeSubSectionIndex}
    >
      <FormContentContainer>
        <Text as="h1" variant="h2" marginBottom={2}>
          Hefur þú fengið tekjur í þessum eða síðasta mánuði?
        </Text>

        <Text marginBottom={[3, 3, 4]}>
          Til dæmis launatekjur eða hvers konar greiðslur eða styrkir frá
          stofnunum fyrir utan fjárhagsaðstoð Hafnarfjarðar.
        </Text>

        <RadioButtonContainer
          className={styles.container}
          options={incomeOptions}
          error={error && !form?.hasIncome}
          isChecked={(value: string | number | boolean) => {
            return value === form?.hasIncome
          }}
          onChange={(value: string | number | boolean) => {
            updateForm({ ...form, hasIncome: value })
            if (error) {
              setError(false)
            }
          }}
        />

        <div
          className={cn({
            [`errorMessage`]: true,
            [`showErrorMessage`]: error && form?.hasIncome === undefined,
          })}
        >
          <Text color="red600" fontWeight="semiBold" variant="small">
            Þú þarft að svara
          </Text>
        </div>
      </FormContentContainer>

      <FormFooter
        previousUrl={navigation?.prevUrl ?? '/'}
        onNextButtonClick={() => {
          if (form?.hasIncome !== undefined) {
            router.push(navigation?.nextUrl ?? '/')
          } else {
            setError(true)
          }
        }}
      />
    </FormLayout>
  )
}

export default IncomeForm
