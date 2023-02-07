import { FirearmProperty } from '@island.is/clients/firearm-license'
import isAfter from 'date-fns/isAfter'
import { Locale } from '@island.is/shared/types'
import {
  ExcludesFalse,
  GenericLicenseDataField,
  GenericLicenseDataFieldType,
  GenericLicenseLabels,
  GenericLicenseMapper,
  GenericUserLicensePayload,
} from '../licenceService.type'
import { getLabel } from '../utils/translations'
import { FirearmLicenseDto } from '@island.is/clients/license-client'
import { Injectable } from '@nestjs/common'
@Injectable()
export class FirearmLicensePayloadMapper
  implements GenericLicenseMapper<FirearmLicenseDto> {
  public parsePayload = (
    payload?: FirearmLicenseDto,
    locale: Locale = 'is',
    labels?: GenericLicenseLabels,
  ): GenericUserLicensePayload | null => {
    if (!payload) return null

    const { licenseInfo, properties, categories } = payload

    const expired = licenseInfo?.expirationDate
      ? !isAfter(new Date(licenseInfo.expirationDate), new Date())
      : null
    if (!licenseInfo) return null

    const label = labels?.labels
    const data: Array<GenericLicenseDataField> = [
      licenseInfo.licenseNumber && {
        name: getLabel('basicInfoLicense', locale, label),
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('licenseNumber', locale, label),
        value: licenseInfo.licenseNumber,
      },
      licenseInfo.name && {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('fullName', locale, label),
        value: licenseInfo.name,
      },
      licenseInfo.issueDate && {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('publishedDate', locale, label),
        value: licenseInfo.issueDate ?? '',
      },
      licenseInfo.expirationDate && {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('validTo', locale, label),
        value: licenseInfo.expirationDate ?? '',
      },
      licenseInfo.collectorLicenseExpirationDate && {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('collectorLicenseValidTo', locale, label),
        value: licenseInfo.collectorLicenseExpirationDate ?? '',
      },

      licenseInfo.qualifications && {
        type: GenericLicenseDataFieldType.Group,
        label: getLabel('classesOfRights', locale, label),
        fields: licenseInfo.qualifications.split('').map((qualification) => ({
          type: GenericLicenseDataFieldType.Category,
          name: qualification,
          label:
            categories?.[
              `${getLabel('category', locale, label)} ${qualification}`
            ] ?? '',
          description:
            categories?.[
              `${getLabel('category', locale, label)} ${qualification}`
            ] ?? '',
        })),
      },
      properties && {
        type: GenericLicenseDataFieldType.Group,
        hideFromServicePortal: true,
        label: getLabel('firearmProperties', locale, label),
        fields: (properties.properties ?? []).map((property) => ({
          type: GenericLicenseDataFieldType.Category,
          fields: this.parseProperties(labels, property, locale)?.filter(
            (Boolean as unknown) as ExcludesFalse,
          ),
        })),
      },
      properties && {
        type: GenericLicenseDataFieldType.Table,
        label: getLabel('firearmProperties', locale, label),
        fields: (properties.properties ?? []).map((property) => ({
          type: GenericLicenseDataFieldType.Category,
          fields: this.parseProperties(labels, property, locale)?.filter(
            (Boolean as unknown) as ExcludesFalse,
          ),
        })),
      },
    ].filter((Boolean as unknown) as ExcludesFalse)

    return {
      data,
      rawData: JSON.stringify(payload),
      metadata: {
        licenseNumber: payload.licenseInfo?.licenseNumber?.toString() ?? '',
        expired,
        expireDate: payload.licenseInfo?.expirationDate ?? undefined,
        links: [
          {
            label: getLabel('renewFirearmLicense', locale, label),
            value: 'https://island.is/skotvopnaleyfi',
          },
        ],
      },
    }
  }

  private parseProperties = (
    labels?: GenericLicenseLabels,
    property?: FirearmProperty,
    locale: Locale = 'is',
  ): Array<GenericLicenseDataField> | null => {
    if (!property) return null
    const label = labels?.labels

    const mappedProperty = [
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('firearmStatus', locale, label),
        value: property.category ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('type', locale, label),
        value: property.typeOfFirearm ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('name', locale, label),
        value: property.name ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('number', locale, label),
        value: property.serialNumber ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('countryNumber', locale, label),
        value: property.landsnumer ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('caliber', locale, label),
        value: property.caliber ?? '',
      },
      {
        type: GenericLicenseDataFieldType.Value,
        label: getLabel('limitation', locale, label),
        value: property.limitation ?? '',
      },
    ]
    return mappedProperty
  }
}
