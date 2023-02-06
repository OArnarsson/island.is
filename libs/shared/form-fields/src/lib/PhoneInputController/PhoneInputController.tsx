import React, { useState, forwardRef } from 'react'
import {
  InputBackgroundColor,
  Option,
  PhoneInput,
} from '@island.is/island-ui/core'
import {
  Controller,
  Control,
  ValidationRules,
  useFormContext,
} from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { TestSupport } from '@island.is/island-ui/utils'
import { ValueType } from 'react-select'
import { countryCodes as countryCodesJSON } from './countryCodes'

interface Props {
  autoFocus?: boolean
  defaultValue?: string
  disabled?: boolean
  control?: Control
  rules?: ValidationRules
  error?: string
  id: string
  label?: string
  name?: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  placeholder?: string
  backgroundColor?: InputBackgroundColor
  currency?: boolean
  required?: boolean
  readOnly?: boolean
  rightAlign?: boolean
  loading?: boolean
  size?: 'xs' | 'sm' | 'md'
  autoComplete?: 'off' | 'on'
}

const countryCodes = countryCodesJSON.map((x) => ({
  label: `${x.name} ${x.dial_code}`,
  value: x.dial_code,
  description: x.flag,
}))

interface ChildParams {
  value?: string
  onBlur: () => void
  onChange: (...event: any[]) => void
  name: string
}

const DEFAULT_COUNTRY_CODE = '+354'

const getDefaultCountryCode = (phoneNumber?: string) => {
  if (!phoneNumber) return DEFAULT_COUNTRY_CODE
  const countryCode = phoneNumber.slice(0, -7) || DEFAULT_COUNTRY_CODE
  return countryCode
}

export const PhoneInputController = forwardRef(
  (
    props: Props & TestSupport,
    ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      autoFocus,
      defaultValue,
      disabled = false,
      error,
      id,
      label,
      name = id,
      placeholder,
      control,
      rules,
      backgroundColor,
      onChange: onInputChange,
      required,
      rightAlign,
      readOnly,
      loading,
      size = 'md',
      dataTestId,
      autoComplete,
    } = props

    const { watch, setValue } = useFormContext()
    const formValue = watch(name) as string

    const defaultCountryCode = getDefaultCountryCode(defaultValue)

    const [countryCode, setCountryCode] = useState<ValueType<Option>>(
      countryCodes.find((x) => x.value === defaultCountryCode),
    )

    const cc = (countryCode as Option).value.toString()

    const handleCountryCodeChange = (value: ValueType<Option>) => {
      // Update the form value with country code prefix
      if (!formValue.startsWith('+')) {
        setValue(name, `${(value as Option).value.toString()}${formValue}`)
      } else if (formValue.startsWith(cc)) {
        const updatedValue = formValue.replace(
          cc,
          (value as Option).value.toString(),
        )
        setValue(name, updatedValue)
      }

      setCountryCode(value)
    }

    function renderChildInput(c: ChildParams & TestSupport) {
      const { value, onChange, ...props } = c

      return (
        <>
          <NumberFormat
            size={size}
            customInput={PhoneInput}
            id={id}
            autoFocus={autoFocus}
            disabled={disabled}
            readOnly={readOnly}
            rightAlign={rightAlign}
            countryCodes={countryCodes}
            backgroundColor={backgroundColor}
            data-testid={dataTestId}
            placeholder={placeholder}
            label={label}
            type="tel"
            value={value?.replace(cc, '')}
            format="###-####"
            autoComplete={autoComplete}
            loading={loading}
            countryCodeValue={countryCode}
            onCountryCodeChange={handleCountryCodeChange}
            hasError={error !== undefined}
            errorMessage={error}
            required={required}
            getInputRef={ref}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              if (onInputChange) {
                onInputChange(e)
              }
            }}
            onValueChange={({ value }) => {
              value ? onChange(cc + value) : onChange(value)
            }}
            {...props}
          />
          {formValue}
        </>
      )
    }

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        {...(defaultValue !== undefined && {
          defaultValue: `${defaultCountryCode}${defaultValue}`,
        })}
        render={renderChildInput}
      />
    )
  },
)

export default PhoneInputController
