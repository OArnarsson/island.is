import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { BoxProps, Box } from '@island.is/island-ui/core'
import { theme, Colors } from '@island.is/island-ui/theme'
import { useMountedState } from 'react-use'
import * as styles from './BackgroundImage.treat'

export type BackgroundImageProps = {
  image: { url: string; title: string }
  ratio?: string
  width?: number
  height?: number
  background?: typeof theme.color[Colors]
  boxProps?: BoxProps
  positionX?: 'left' | 'right'
  backgroundSize?: 'cover' | 'contain'
}

const useImageLoader = (url: string): boolean => {
  const isMounted = useMountedState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image(100)
    img.onload = img.onerror = () => {
      if (isMounted) {
        setLoaded(true)
      }
    }
    img.src = url
  }, [url])

  return loaded
}

export const BackgroundImage = ({
  image = null,
  ratio = '',
  width = 1000,
  height,
  background = theme.color.dark100,
  backgroundSize = 'cover',
  positionX,
  boxProps = {
    alignItems: 'center',
    width: 'full',
    display: 'inlineFlex',
    overflow: 'hidden',
    borderRadius: 'large',
  },
}: BackgroundImageProps) => {
  const src = `${image.url}?w=${width}`
  const thumbnail = image.url + '?w=50'
  const alt = image.title ?? ''
  const imageProps = alt
    ? {
        role: 'img',
        'aria-label': alt,
      }
    : {}

  const imageLoaded = useImageLoader(src)

  let paddingTop = '0px'

  if (ratio) {
    let r1 = 16
    let r2 = 9

    if (ratio.match(/[0-9]{1,2}:[0-9]{1,2}/g)) {
      const r = ratio.split(':')

      r1 = parseInt(r[0], 10)
      r2 = parseInt(r[1], 10)
    }

    paddingTop = `${(r2 / r1) * 100}%`
  } else {
    boxProps = {
      ...boxProps,
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
    }
  }

  let backgroundPosition = 'center center'

  switch (positionX) {
    case 'left':
      backgroundPosition = 'center left'
      break
    case 'right':
      backgroundPosition = 'center right'
      break
    default:
      break
  }

  return (
    <Box {...boxProps}>
      <div className={styles.container} style={{ paddingTop, background }}>
        <div
          className={cn(styles.thumbnail, styles.bgImage, {
            [styles.thumbnailHide]: imageLoaded,
          })}
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize,
            backgroundPosition,
            height,
          }}
        />
        <div
          {...imageProps}
          className={cn(styles.image, styles.bgImage, {
            [styles.imageShow]: imageLoaded,
          })}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize,
            backgroundPosition,
            height,
          }}
        />
      </div>
    </Box>
  )
}

export default BackgroundImage
