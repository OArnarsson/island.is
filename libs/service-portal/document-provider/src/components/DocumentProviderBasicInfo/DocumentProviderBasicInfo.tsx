import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  getErrorViaPath,
  ServicePortalPath,
} from '@island.is/service-portal/core'
import {
  Box,
  Text,
  Input,
  Button,
  SkeletonLoader,
} from '@island.is/island-ui/core'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useLocale } from '@island.is/localization'
import { m } from '../../lib/messages'

//Interface will be deleted, when graphql is ready.
interface Applicant {
  name: string
  email: string
  phoneNumber: string
  nationalId: string
  address: string
  zipCode: string
}

interface AdministrativeContact {
  name: string
  email: string
  phoneNumber: string
}

interface TechnicalContact {
  name: string
  email: string
  phoneNumber: string
}

interface HelpDeskContact {
  email: string
  phoneNumber: string
}

export interface FormData {
  organisation: Applicant
  administrativeContact: AdministrativeContact
  technicalContact: TechnicalContact
  helpDeskContact: HelpDeskContact
  id: string
}

interface Props {
  data: FormData
  onSubmit: SubmitHandler<any>
  isFetching: boolean
}

export const DocumentProviderBasicInfo: FC<Props> = ({
  data,
  onSubmit,
  isFetching,
}) => {
  const { formatMessage } = useLocale()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  return (
    <Box marginY={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginBottom={4}>
          <Box marginBottom={4}>
            <Text variant="h3" as="h3">
              {formatMessage(m.SingleProviderInstitutionHeading)}
            </Text>
          </Box>
          <Box marginBottom={2}>
            {isFetching ? (
              <SkeletonLoader borderRadius="large" height={80} />
            ) : (
              <Controller
                control={control}
                name="applicant.name"
                defaultValue={data?.organisation?.name}
                rules={{
                  required: {
                    value: true,
                    message: formatMessage(
                      m.SingleProviderInstitutionNameError,
                    ),
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    size="xs"
                    name={name}
                    value={value}
                    onChange={onChange}
                    label={formatMessage(m.SingleProviderInstitutionNameLabel)}
                    placeholder={formatMessage(
                      m.SingleProviderInstitutionNamePlaceholder,
                    )}
                    hasError={
                      getErrorViaPath(errors, 'applicant.name') !== undefined
                    }
                    errorMessage={getErrorViaPath(
                      errors,
                      'applicant.name.message',
                    )}
                  />
                )}
              />
            )}
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="applicant.nationalId"
              defaultValue={data?.organisation?.nationalId}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderInstitutionNationalIdError,
                  ),
                },
                pattern: {
                  value: /([0-9]){6}-?([0-9]){4}/,
                  message: formatMessage(
                    m.SingleProviderInstitutionNationalIdFormatError,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderInstitutionNationalIdLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderInstitutionNationalIdPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'applicant.nationalId') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'applicant.nationalId.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="applicant.email"
              defaultValue={data?.organisation?.email}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(m.SingleProviderInstitutionEmailError),
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: formatMessage(
                    m.SingleProviderInstitutionEmailFormatError,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(m.SingleProviderInstitutionEmailLabel)}
                  placeholder={formatMessage(
                    m.SingleProviderInstitutionEmailPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'applicant.email') !== undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'applicant.email.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="applicant.phoneNumber"
              defaultValue={data?.organisation?.phoneNumber}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderInstitutionPhonenumberError,
                  ),
                },
                minLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderInstitutionPhonenumberErrorLength,
                  ),
                },
                maxLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderInstitutionPhonenumberErrorLength,
                  ),
                },
                pattern: {
                  value: /^\d+$/,
                  message: formatMessage(
                    m.SingleProviderInstitutionPhonenumberErrorOnlyNumbers,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderInstitutionPhonenumberLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderInstitutionPhonenumberPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'applicant.phoneNumber') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'applicant.phoneNumber.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="applicant.address"
              defaultValue={data?.organisation?.address}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderInstitutionAddressError,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(m.SingleProviderInstitutionAddressLabel)}
                  placeholder={formatMessage(
                    m.SingleProviderInstitutionAddressPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'applicant.address') !== undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'applicant.address.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="applicant.zipCode"
              defaultValue={data?.organisation?.zipCode}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(m.DashBoardDescription),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(m.DashBoardDescription)}
                  placeholder={formatMessage(m.DashBoardDescription)}
                  hasError={
                    getErrorViaPath(errors, 'applicant.zipCode') !== undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'applicant.zipCode.message',
                  )}
                />
              )}
            />
          </Box>
        </Box>
        <Box marginBottom={4}>
          <Box marginBottom={4}>
            <Text variant="h3" as="h3">
              {formatMessage(m.SingleProviderResponsibleContactHeading)}
            </Text>
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="administrativeContact.name"
              defaultValue={data?.administrativeContact?.name}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderResponsibleContactNameError,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderResponsibleContactNameLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderResponsibleContactNamePlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'administrativeContact.name') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'administrativeContact.name.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="administrativeContact.email"
              defaultValue={data?.administrativeContact?.email}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(m.SingleProviderInstitutionEmailError),
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: formatMessage(
                    m.SingleProviderInstitutionEmailFormatError,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderResponsibleContactEmailLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderResponsibleContactEmailPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'administrativeContact.email') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'administrativeContact.email.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="administrativeContact.phoneNumber"
              defaultValue={data?.administrativeContact?.phoneNumber}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderResponsibleContactPhonenumberError,
                  ),
                },
                minLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderResponsibleContactPhonenumberErrorLength,
                  ),
                },
                maxLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderResponsibleContactPhonenumberErrorLength,
                  ),
                },
                pattern: {
                  value: /^\d+$/,
                  message: formatMessage(
                    m.SingleProviderResponsibleContactPhonenumberErrorOnlyNumbers,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderResponsibleContactPhoneNumberLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderResponsibleContactPhoneNumberPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(
                      errors,
                      'administrativeContact.phoneNumber',
                    ) !== undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'administrativeContact.phoneNumber.message',
                  )}
                />
              )}
            />
          </Box>
        </Box>
        <Box marginBottom={4}>
          <Box marginBottom={4}>
            <Text variant="h3" as="h3">
              {formatMessage(m.SingleProviderTechnicalContactHeading)}
            </Text>
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="technicalContact.name"
              defaultValue={data?.technicalContact?.name}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderTechnicalContactNameError,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderTechnicalContactNameLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderTechnicalContactNamePlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'technicalContact.name') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'technicalContact.name.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="technicalContact.email"
              defaultValue={data?.technicalContact?.email}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderTechnicalContactEmailError,
                  ),
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: formatMessage(
                    m.SingleProviderTechnicalContactEmailErrorFormat,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderTechnicalContactEmailLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderTechnicalContactEmailPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'technicalContact.email') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'technicalContact.email.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="technicalContact.phoneNumber"
              defaultValue={data?.technicalContact?.phoneNumber}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderTechnicalContactPhonenumberError,
                  ),
                },
                minLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderTechnicalContactPhonenumberErrorLength,
                  ),
                },
                maxLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderTechnicalContactPhonenumberErrorLength,
                  ),
                },
                pattern: {
                  value: /^\d+$/,
                  message: formatMessage(
                    m.SingleProviderTechnicalContactPhonenumberErrorOnlyNumbers,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderTechnicalContactPhoneNumberLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderTechnicalContactPhoneNumberPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'technicalContact.phoneNumber') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'technicalContact.phoneNumber.message',
                  )}
                />
              )}
            />
          </Box>
        </Box>
        <Box marginBottom={4}>
          <Box marginBottom={4}>
            <Text variant="h3" as="h3">
              {formatMessage(m.SingleProviderUserHelpContactHeading)}
            </Text>
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="helpDeskContact.email"
              defaultValue={data?.helpDeskContact?.email}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(m.SingleProviderUserHelpEmailError),
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: formatMessage(
                    m.SingleProviderUserHelpEmailErrorFormat,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderUserHelpContactEmailLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderUserHelpContactEmailPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'helpDeskContact.email') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'helpDeskContact.email.message',
                  )}
                />
              )}
            />
          </Box>
          <Box marginBottom={2}>
            <Controller
              control={control}
              name="helpDeskContact.phoneNumber"
              defaultValue={data?.helpDeskContact?.phoneNumber}
              rules={{
                required: {
                  value: true,
                  message: formatMessage(
                    m.SingleProviderUserHelpPhonenumberError,
                  ),
                },
                minLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderUserHelpPhonenumberErrorLength,
                  ),
                },
                maxLength: {
                  value: 7,
                  message: formatMessage(
                    m.SingleProviderUserHelpPhonenumberErrorLength,
                  ),
                },
                pattern: {
                  value: /^\d+$/,
                  message: formatMessage(
                    m.SingleProviderUserHelpPhonenumberErrorOnlyNumbers,
                  ),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  size="xs"
                  name={name}
                  value={value}
                  onChange={onChange}
                  label={formatMessage(
                    m.SingleProviderUserHelpContactPhoneNumberLabel,
                  )}
                  placeholder={formatMessage(
                    m.SingleProviderUserHelpContactPhoneNumberPlaceholder,
                  )}
                  hasError={
                    getErrorViaPath(errors, 'helpDeskContact.phoneNumber') !==
                    undefined
                  }
                  errorMessage={getErrorViaPath(
                    errors,
                    'helpDeskContact.phoneNumber.message',
                  )}
                />
              )}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="spaceBetween"
          alignItems="center"
          flexDirection={['columnReverse', 'row']}
          marginTop={4}
        >
          <Box marginTop={[1, 0]}>
            <Link to={ServicePortalPath.DocumentProviderDocumentProviders}>
              <Button variant="ghost">
                {formatMessage(m.SingleProviderBackButton)}
              </Button>
            </Link>
          </Box>
          <Button type="submit" variant="primary" icon="arrowForward">
            {formatMessage(m.SingleProviderSaveButton)}
          </Button>
        </Box>
      </form>
    </Box>
  )
}
