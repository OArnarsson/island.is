import React, { useState } from 'react'
import { useDrivingLicense } from '@island.is/service-portal/graphql'
import { useLocale, useNamespaces } from '@island.is/localization'
import {
  Box,
  Divider,
  GridColumn,
  GridRow,
  Icon,
  Stack,
  Text,
  Button,
  AlertBanner,
} from '@island.is/island-ui/core'
import {
  PlausiblePageviewDetail,
  ServicePortalModuleComponent,
  ServicePortalPath,
  UserInfoLine,
} from '@island.is/service-portal/core'
import { defineMessage } from 'react-intl'
import { isExpired, toDate } from '../../utils/dateUtils'
import { mapCategory } from '../../utils/dataMapper'
import ReactHtmlParser from 'react-html-parser'
import ExpandableLine from './ExpandableLine'
import * as styles from '../../components/DrivingLicense/DrivingLicense.css'
import QRCodeModal from '../../components/QRCodeModal/QRCodeModal'
import { info } from 'kennitala'
import { m } from '../../lib/messages'

const DrivingLicenseDetail: ServicePortalModuleComponent = ({ userInfo }) => {
  useNamespaces('sp.license')
  const { formatMessage } = useLocale()
  const [modalOpen, setModalOpen] = useState(false)
  const { data, loading, error } = useDrivingLicense()

  PlausiblePageviewDetail(
    ServicePortalPath.LicensesDrivingDetail.replace(':id', 'detail'),
  )
  const licenseExpired = data && isExpired(new Date(), new Date(data.gildirTil))

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const { age } = info(data?.kennitala ?? userInfo.profile.nationalId)

  const renewalLink =
    age >= 70
      ? 'https://island.is/endurnyjun-oekuskirteina-fyrir-70-ara-og-eldri'
      : 'https://island.is/endurnyjun-okuskirteina'

  return (
    <>
      {error && !loading && (
        <Box>
          <AlertBanner
            description={formatMessage(m.errorFetchingDrivingLicense)}
            variant="error"
          />
        </Box>
      )}
      <Box marginBottom={5}>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '6/8', '6/8']}>
            <Stack space={1}>
              <Text variant="h3" as="h1" paddingTop={0}>
                {formatMessage(m.yourDrivingLicense)}
              </Text>
              <Text as="p" variant="default">
                {formatMessage(m.drivingLicenseDescription)}
              </Text>
            </Stack>
          </GridColumn>
        </GridRow>
      </Box>
      {data && (
        <>
          <Stack space={2}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Button
                variant="text"
                size="small"
                icon="QRCode"
                iconType="outline"
                onClick={toggleModal}
              >
                {formatMessage(m.sendToPhone)}
              </Button>
              <Box className={styles.line} marginX={3} />
              <Box
                display="flex"
                cursor="pointer"
                color="blue400"
                className={styles.QRCode}
              >
                <a
                  href={renewalLink}
                  className={styles.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Box display="flex" flexDirection="row">
                    {formatMessage(m.renewDrivingLicense)}
                    <Box marginLeft={1} className={styles.icon}>
                      <Icon
                        icon="open"
                        type="outline"
                        color="blue400"
                        size="small"
                      />
                    </Box>
                  </Box>
                </a>
              </Box>
            </Box>
            <UserInfoLine
              title={formatMessage(m.drivingLicenseBaseInfo)}
              label={defineMessage(m.number)}
              content={data?.id.toString()}
              loading={loading}
              titlePadding={3}
              paddingBottom={1}
              labelColumnSpan={['1/1', '6/12']}
              valueColumnSpan={['1/1', '6/12']}
            />
            <Divider />
            <UserInfoLine
              label={m.issueDate}
              content={
                data &&
                toDate(new Date(data.utgafuDagsetning).getTime().toString())
              }
              loading={loading}
              paddingBottom={1}
              labelColumnSpan={['1/1', '6/12']}
              valueColumnSpan={['1/1', '6/12']}
            />
            <Divider />
            <UserInfoLine
              label={m.expireDate}
              renderContent={() => (
                <Box display="flex" alignItems="center">
                  <Text>
                    {toDate(
                      loading
                        ? ''
                        : new Date(data.gildirTil).getTime().toString(),
                    )}
                  </Text>
                  <Box
                    marginLeft={2}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Box
                      marginRight={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <Icon
                        icon={
                          licenseExpired ? 'closeCircle' : 'checkmarkCircle'
                        }
                        color={licenseExpired ? 'red600' : 'mint600'}
                        type="filled"
                      />
                    </Box>
                    <Text variant="eyebrow">
                      {licenseExpired
                        ? formatMessage(m.isExpired)
                        : formatMessage(m.isValid)}
                    </Text>
                  </Box>
                </Box>
              )}
              loading={loading}
              paddingBottom={1}
              labelColumnSpan={['1/1', '6/12']}
              valueColumnSpan={['1/1', '6/12']}
            />
            <Divider />
            <UserInfoLine
              label={formatMessage(m.issuedBy)}
              content={data.nafnUtgafustadur}
              loading={loading}
              paddingBottom={1}
              labelColumnSpan={['1/1', '6/12']}
              valueColumnSpan={['1/1', '6/12']}
            />
            <Divider />
            <Box marginY={3} />
            <Box position="relative" paddingTop={1} paddingRight={4}>
              <Text variant="eyebrow">
                {formatMessage(m.licenseCategories)}
              </Text>
            </Box>

            {data?.rettindi.map(
              (item: {
                id: React.Key | null | undefined
                utgafuDags: string | number | Date
                gildirTil: string | number | Date
                nr: string | undefined
              }) => {
                return (
                  <ExpandableLine
                    key={item.nr}
                    licenseIssued={formatMessage(m.issueDate)}
                    licenseExpire={formatMessage(m.expireDate)}
                    issuedDate={toDate(
                      new Date(item.utgafuDags).getTime().toString(),
                    )}
                    expireDate={toDate(
                      new Date(item.gildirTil).getTime().toString(),
                    )}
                    category={item.nr?.trim()}
                  >
                    {item.nr &&
                      ReactHtmlParser(mapCategory(item.nr.trim()).text ?? '')}
                  </ExpandableLine>
                )
              },
            )}
          </Stack>
          {modalOpen && (
            <QRCodeModal
              id="qr-code-modal"
              toggleClose={modalOpen}
              onCloseModal={toggleModal}
              expires={toDate(
                loading ? '' : new Date(data.gildirTil).getTime().toString(),
              )}
            />
          )}
        </>
      )}
    </>
  )
}

export default DrivingLicenseDetail