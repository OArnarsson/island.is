import React, { ElementType, FC, ReactElement } from 'react'
import cn from 'classnames'
import {
  Tooltip as ReakitTooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from 'reakit'
import * as styles from './Tooltip.css'
import { Icon, Size } from '../IconRC/Icon'
import { Colors } from '@island.is/island-ui/theme'

type Placement = 'top' | 'right' | 'bottom' | 'left'

interface ArrowIconProps {
  placement: string
}

const ArrowIcon: FC<ArrowIconProps> = ({ placement }) => {
  let deg = 0

  if (placement.startsWith('left')) {
    deg = -90
  } else if (placement.startsWith('right')) {
    deg = 90
  } else if (placement.startsWith('bottom')) {
    deg = 180
  }

  const transform = `rotate(${deg}deg)`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      style={{ transform }}
    >
      <path fill="#F2F7FF" d="M7 12l6.928-12H.072L7 12z"></path>
      <path
        fill="#CCDFFF"
        fillRule="evenodd"
        d="M6.998 12L.07 0h13.856L6.998 12zm0-2L1.22 0h11.56L6.998 10z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

interface TooltipProps {
  placement?: Placement
  text: React.ReactNode
  iconSize?: Size
  color?: Colors
  children?: ReactElement
  preserveWhiteSpace?: boolean
  as?: ElementType
}

export const Tooltip: FC<TooltipProps> = ({
  placement,
  text,
  iconSize = 'small',
  color = 'dark200',
  children,
  as = 'span',
  preserveWhiteSpace = false,
}) => {
  const tooltip = useTooltipState({
    animated: 250,
    ...(placement && { placement }),
  })

  return (
    <>
      {children ? (
        <TooltipReference {...tooltip} {...children.props}>
          {(referenceProps) => React.cloneElement(children, referenceProps)}
        </TooltipReference>
      ) : (
        <TooltipReference {...tooltip} as={as} className={cn(styles.icon)}>
          <Icon icon="informationCircle" color={color} size={iconSize} />
        </TooltipReference>
      )}
      <ReakitTooltip {...tooltip}>
        <div
          className={cn(styles.tooltip, {
            [styles.whiteSpace]: preserveWhiteSpace,
          })}
        >
          <TooltipArrow {...tooltip}>
            <ArrowIcon placement={tooltip.placement} />
          </TooltipArrow>
          {text}
          {children}
        </div>
      </ReakitTooltip>
    </>
  )
}
