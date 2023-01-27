import { spacing, theme } from '@island.is/island-ui/theme'
import {
  SERVICE_PORTAL_HEADER_HEIGHT_SM,
  zIndex,
} from '@island.is/service-portal/constants'
import { keyframes, style } from '@vanilla-extract/css'

const wrapperAnimation = keyframes({
  '0%': {
    transform: 'scale(1.05)',
    opacity: 0,
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
})

export const wrapper = style({
  width: 405,
  height: '100vh',
  zIndex: zIndex.mobileMenu + 1,
  overflowY: 'auto',
  animation: `${wrapperAnimation} ease-in 200ms forwards`,
  right: 0,
})

export const navItems = style({})
export const link = style({
  display: 'block',
  height: '100%',
  paddingBottom: theme.spacing['1'],
})

export const closeButton = style({
  justifyContent: 'center',
  alignItems: 'center',

  width: 40,
  height: 40,

  cursor: 'pointer',
  border: '1px solid transparent',
  backgroundColor: theme.color.white,

  borderRadius: '100%',
  transition: 'background-color 250ms, border-color 250ms',

  ':hover': {
    backgroundColor: theme.color.blue200,
  },

  ':focus': {
    outline: 'none',
    borderColor: theme.color.mint200,
  },
})

export const keyItems = style({
  maxHeight: 219,
  flexGrow: 1,
})

export const categories = style({
  flexGrow: 2,
})