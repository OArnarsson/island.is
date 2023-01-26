import * as React from 'react'
import { SvgProps as SVGRProps } from '../Icon'

const SvgEN = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="en_svg__ionicon"
    viewBox="0 0 24 24"
    aria-labelledby={titleId}
    fill="none"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M1.76513 18V6.832H9.12513V8.704H3.87713V11.408H8.51713V13.28H3.87713V16.128H9.12513V18H1.76513ZM14.5589 12.272L13.4069 9.952H13.3589V18H11.3589V6.832H13.6789L17.0389 12.56L18.1909 14.88H18.2389V6.832H20.2389V18H17.9189L14.5589 12.272Z"
      fill="currentcolor"
    />
  </svg>
)

export default SvgEN
