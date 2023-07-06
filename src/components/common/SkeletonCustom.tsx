import React from 'react'
import { Skeleton } from '@mui/material'
import { useResize } from '@app/helpers/useResize'

type SkeletonCustomProps = {
  formHeight: number
  formRef: React.RefObject<HTMLInputElement>
  plus?: number
}

const SkeletonCustom: React.FC<SkeletonCustomProps> = (props) => {
  const { formHeight, formRef, plus } = props
  const resize = useResize(formRef)

  let totalHeight = 0
  if (formRef) {
    const newsFormHeight = resize.height
    totalHeight = newsFormHeight + (plus ? plus : 0)
  }

  return (
    <>
      <Skeleton
        animation="wave"
        style={{
          width: '100%',
          borderRadius: 5,
          height: `${totalHeight > formHeight ? totalHeight : formHeight}px`
        }}
      />
    </>
  )
}

export { SkeletonCustom }
