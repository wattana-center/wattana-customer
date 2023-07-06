import { InputBase, InputBaseProps } from '@mui/material'

import React from 'react'
import { WattanaTheme } from '@app/config'
import { withStyles } from '@mui/styles'

const BootstrapInput = withStyles(() => ({
  root: {
    'label + &': {
      marginTop: WattanaTheme.spacing(3)
    },
    backgroundColor: WattanaTheme.palette.common.white,
    border: '1px solid #ced4da',
    transition: WattanaTheme.transitions.create(['border-color', 'box-shadow']),
    borderRadius: 4,
    padding: 9.5
  },
  input: {
    position: 'relative',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px'
  }
}))(InputBase)

type TextFieldProps = InputBaseProps

const TextField: React.FC<TextFieldProps> = (props) => {
  const {} = props
  return (
    <>
      <BootstrapInput {...props} />
    </>
  )
}

export { TextField }
