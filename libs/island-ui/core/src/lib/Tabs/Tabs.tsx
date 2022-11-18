import React, { FC, ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import { useWindowSize } from 'react-use'
import { useTabState, Tab, TabList, TabPanel } from 'reakit/Tab'
import { ValueType } from 'react-select'

import { Colors, theme } from '@island.is/island-ui/theme'
import { Box } from '../Box/Box'
import { Select, Option } from '../Select/Select'
import { FocusableBox } from '../FocusableBox/FocusableBox'
import { isDefined } from '@island.is/shared/utils'

import * as styles from './Tabs.css'

type TabType = {
  label: string
  content: ReactNode
  disabled?: boolean
}

interface TabInterface {
  label: string
  selected?: string
  tabs: TabType[]
  contentBackground?: Colors
  size?: 'xs' | 'sm' | 'md'
  onChange?(id: string): void
}

export const Tabs: FC<TabInterface> = ({
  label,
  selected = '0',
  tabs,
  contentBackground = 'purple100',
  size = 'md',
  onChange: onChangeHandler,
}) => {
  const { loop, wrap, ...tab } = useTabState({
    selectedId: selected,
  })

  const [prevCurrentId, setPrevCurrentId] = useState(tab.currentId)

  const selectOptions = tabs.map(({ label, disabled }, index) => {
    return {
      label,
      disabled: disabled,
      value: index.toString(),
    }
  })

  const onSelect = (option: ValueType<Option>) => {
    const tabOption = option as Option
    tab.setCurrentId(tabOption?.value as string)
    tab.move(tabOption?.value as string)
  }

  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (width < theme.breakpoints.md) {
      return setIsMobile(true)
    }
    setIsMobile(false)
  }, [width])

  if (isDefined(tab?.currentId) && prevCurrentId !== tab.currentId) {
    onChangeHandler?.(tab?.currentId)
    setPrevCurrentId(tab.currentId)
  }

  return (
    <Box position="relative">
      <Box background={contentBackground} className={styles.bg} />
      <Box position="relative" paddingY="none">
        {isMobile && (
          <div className={styles.select}>
            <Select
              size={size}
              name={label}
              label={label}
              onChange={onSelect}
              options={selectOptions}
              defaultValue={selectOptions[parseInt(selected)]}
              isSearchable={false}
            />
          </div>
        )}
        <TabList
          className={styles.tabList}
          {...tab}
          wrap={wrap}
          aria-label={label}
        >
          {tabs.map(({ label, disabled }, index) => (
            <FocusableBox
              {...tab}
              component={Tab}
              key={index}
              disabled={disabled}
              id={`${index}`}
              justifyContent="center"
              aria-label={label}
              className={cn(styles.tab, {
                [styles.tabSelected]: index.toString() === tab.selectedId,
                [styles.tabDisabled]: disabled,
              })}
            >
              {label}
            </FocusableBox>
          ))}
        </TabList>
        {tabs.map(({ content }, index) => (
          <TabPanel {...tab} key={index} className={styles.tabPanel}>
            <Box>{content}</Box>
          </TabPanel>
        ))}
      </Box>
    </Box>
  )
}
