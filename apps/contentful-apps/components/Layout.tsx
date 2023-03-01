import { FC, useEffect, useState } from 'react'
import { SDKProvider } from '@contentful/react-apps-toolkit'
import { GlobalStyles } from '@contentful/f36-components'
import LocalhostWarning from './LocalhostWarning'

export const Layout: FC = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  if (process.env.NODE_ENV === 'development' && window.self === window.top)
    return <LocalhostWarning />

  return (
    <SDKProvider>
      <GlobalStyles />
      {children}
    </SDKProvider>
  )
}
