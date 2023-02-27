import {
  VinnuvelaDto,
  VinnuvelaRettindiDto,
} from '@island.is/clients/adr-and-machine-license'

import isAfter from 'date-fns/isAfter'
import { Locale } from '@island.is/shared/types'
import {
  GenericLicenseLabels,
  GenericUserLicensePayload,
  GenericLicenseDataField,
  GenericLicenseDataFieldType,
  GenericLicenseMapper,
} from '../licenceService.type'
import { getLabel } from '../utils/translations'
import { Injectable } from '@nestjs/common'
@Injectable()
export class MachineLicensePayloadMapper
  implements GenericLicenseMapper<VinnuvelaDto> {
  private checkLicenseExpirationDate(license: VinnuvelaDto) {
    return license.vinnuvelaRettindi
      ? license.vinnuvelaRettindi
          .filter((field) => field.kenna || field.stjorna)
          .every(
            (field: VinnuvelaRettindiDto) =>
              field.kenna &&
              !isAfter(new Date(field.kenna), new Date()) &&
              field.stjorna &&
              !isAfter(new Date(field.stjorna), new Date()),
          )
      : null
  }

  parsePayload(
    payload?: VinnuvelaDto,
    locale: Locale = 'is',
    labels?: GenericLicenseLabels,
  ): GenericUserLicensePayload | null {
    if (!payload) return null

    const expired: boolean | null = this.checkLicenseExpirationDate(payload)

    const label = labels?.labels
    const data: Array<GenericLicenseDataField> = [
      {
        name: getLabel('basicInfoLicense', locale, label),
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('licenseNumber', locale, label),
        value: payload.skirteinisNumer?.toString(),
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('fullName', locale, label),
        value: payload?.fulltNafn ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('placeOfIssue', locale, label),
        value: payload.utgafuStadur ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('firstPublishedDate', locale, label),
        value: payload.fyrstiUtgafuDagur?.toString(),
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('validTo', locale, label),
        value: getLabel('seeRights', locale, label),
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('drivingLicenseNumber', locale, label),
        value: payload.okuskirteinisNumer ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Group,
        label: getLabel('classesOfRights', locale, label),
        fields: (payload.vinnuvelaRettindi ?? [])
          .filter((field) => field.kenna || field.stjorna)
          .map((field) => ({
            type: GenericLicenseDataFieldType.Category,
            name: field.flokkur ?? '',
            label: field.fulltHeiti ?? field.stuttHeiti ?? '',
            description: field.fulltHeiti ?? field.stuttHeiti ?? '',
            fields: this.parseVvrRights(field, locale, labels),
          })),
      },
    ]

    return {
      data,
      rawData: JSON.stringify(payload),
      metadata: {
        licenseNumber: payload.skirteinisNumer?.toString() ?? '',
        expired: expired,
      },
    }
  }

  parseVvrRights(
    rights: VinnuvelaRettindiDto,
    locale: Locale = 'is',
    labels?: GenericLicenseLabels,
  ): Array<GenericLicenseDataField> | undefined {
    const fields = new Array<GenericLicenseDataField>()
    const label = labels?.labels
    if (rights.stjorna) {
      fields.push({
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('control', locale, label),
        value: rights.stjorna,
      })
    }
    if (rights.kenna) {
      fields.push({
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('teach', locale, label),
        value: rights.kenna,
      })
    }

    return fields?.length ? fields : undefined
  }
}