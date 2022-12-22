import React from 'react'
import styled from 'styled-components/native'
import { dynamicColor } from '../../utils'
import { font } from '../../utils/font'
import { Skeleton } from '../skeleton/skeleton'

const Host = styled.SafeAreaView<{ noBorder: boolean }>`
  flex: 1;
  border-bottom-width: ${({ theme }) => theme.border.width.standard}px;
  border-bottom-color: ${dynamicColor(
    ({ theme, noBorder }) => ({
      light: noBorder ? 'transparent' : theme.color.blue100,
      dark: noBorder ? 'transparent' : theme.shades.dark.shade200,
    }),
    true,
  )};
  margin-left: ${({ theme }) => theme.spacing[2]}px;
  margin-right: ${({ theme }) => theme.spacing[2]}px;
`

const Content = styled.View<{ isCompact: boolean }>`
  padding-top: ${({ theme, isCompact }) => theme.spacing[isCompact ? 1 : 3]}px;
  padding-bottom: ${({ theme, isCompact }) => theme.spacing[isCompact ? 1 :3]}px;
`

const Label = styled.Text`
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;

  ${font({
    fontSize: 13,
    lineHeight: 17,
  })}
`

const Value = styled.Text<{ size?: 'normal' | 'big' }>`
  ${font({
    fontSize:({ size }) => size === 'big' ? 20 : 16,
    fontWeight: '600',
  })}
`

interface InputProps {
  label: string
  value?: string
  loading?: boolean
  error?: boolean
  valueTestID?: string
  noBorder?: boolean
  size?: 'normal' | 'big'
  isCompact?: boolean;
}

export function Input({
  label,
  value,
  loading,
  error,
  valueTestID,
  noBorder = false,
  size = 'normal',
  isCompact = false,
}: InputProps) {
  const tvalue = value !== undefined && typeof(value) === 'string' && value.trim();
  return (
    <Host noBorder={noBorder}>
      <Content isCompact={isCompact}>
        <Label>{label}</Label>
        {loading || error ? (
          <Skeleton active={loading} error={error} height={size === 'big' ? 26 : undefined} />
        ) : (
          <Value testID={valueTestID} size={size}>{tvalue === '' || !value ? '-' : value}</Value>
        )}
      </Content>
    </Host>
  )
}
