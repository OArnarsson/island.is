import { NationalRegistryModule } from './national-registry/national-registry.module'
import { NationalRegistryService } from './national-registry/national-registry.service'
import { PaymentCatalogModule } from './payment-catalog/payment-catalog.module'
import { PaymentCatalogService } from './payment-catalog/payment-catalog.service'
import { UserProfileModule } from './user-profile/user-profile.module'
import { UserProfileService } from './user-profile/user-profile.service'

export const modules = [
  NationalRegistryModule,
  PaymentCatalogModule,
  UserProfileModule,
]

export const services = [
  NationalRegistryService,
  PaymentCatalogService,
  UserProfileService,
]