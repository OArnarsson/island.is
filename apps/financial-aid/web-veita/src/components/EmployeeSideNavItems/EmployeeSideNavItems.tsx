import React from 'react'
import { Text, Box } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'

import * as styles from './EmployeeSideNavItems.css'
import cn from 'classnames'

import {
  ApplicationFilters,
  ApplicationFiltersEnum,
  StaffRole,
} from '@island.is/financial-aid/shared/lib'

import { navigationItems } from '@island.is/financial-aid-web/veita/src/utils/navigation'

interface Props {
  roles?: StaffRole[]
  applicationFilters: ApplicationFilters
}

const EmployeeSideNavItems = ({ roles, applicationFilters }: Props) => {
  const router = useRouter()

  if (roles === undefined || roles.includes(StaffRole.EMPLOYEE) === false) {
    return null
  }

  return (
    <>
      {navigationItems.map((item, index) => {
        return (
          <div key={'NavigationLinks-' + index}>
            {item.group && <p className={styles.group}>{item.group}</p>}
            <Link href={item.link}>
              <a
                aria-label={item.label}
                className={cn({
                  [`${styles.link}`]: true,
                  [`${styles.activeLink}`]: router.pathname === item.link,
                  [`${styles.linkHoverEffect}`]: router.pathname !== item.link,
                })}
              >
                <Box display="flex" justifyContent="spaceBetween">
                  <Text fontWeight="semiBold">{item.label}</Text>
                  <Text fontWeight="semiBold" color="dark300">
                    {item.applicationState
                      .map((state: ApplicationFiltersEnum) => {
                        if (applicationFilters) {
                          return applicationFilters[state]
                        }
                      })
                      .reduce((a?: number, b?: number) => {
                        return (a || 0) + (b || 0)
                      })}
                  </Text>
                </Box>
              </a>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default EmployeeSideNavItems
