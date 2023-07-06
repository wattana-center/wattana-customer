import { FormControl, InputBase, MenuItem, Select, Theme } from '@mui/material'
import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@mui/styles'

import { WattanaTheme } from '@app/config'

const BootstrapInput = withStyles(() => ({
  root: {
    'label + &': {
      marginTop: WattanaTheme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: WattanaTheme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '18.5px 14px;',
    transition: WattanaTheme.transitions.create(['border-color', 'box-shadow']),
    height: '56 px'
    // Use the system font instead of the default Roboto font.
  }
}))(InputBase)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: WattanaTheme.spacing(3)
  }
}))

function getStyles(name: string, personName: number[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(parseInt(name)) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

interface ISelectMultiple {
  value?: selected[]
  items: { id: number; name: string }[]
  onChange?: (data: { id: number; name: string }[]) => void
}

interface selected {
  id: number
  name: string
}

const SelectMultiple: React.FC<ISelectMultiple> = (props) => {
  const { items, value } = props
  const classes = useStyles()

  const [personName, setPersonName] = React.useState<number[]>([])

  const [selected, setSelected] = React.useState<selected[]>([])
  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   const select: selected[] = []
  //   for (const curr of event.target.value as number[]) {
  //     const f = items.find((v) => v.id === curr)
  //     if (f) select.push(f)
  //   }

  //   const filteredArr = select.reduce((acc: selected[], current) => {
  //     const x = acc.find((item) => item.id === current.id)
  //     if (!x) {
  //       return acc.concat([current])
  //     } else {
  //       return acc
  //     }
  //   }, [])

  //   if (onChange) onChange(filteredArr)

  //   setSelected(filteredArr)
  // }

  useEffect(() => {
    if (value) {
      const ids = []
      for (const v of value) {
        ids.push(v.id)
      }
      setPersonName(ids)
      setSelected(value)
    } else {
      setPersonName([])
      setSelected([])
    }
  }, [value])

  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          variant="outlined"
          displayEmpty
          multiple
          value={personName}
          // onChange={handleChange}
          input={<BootstrapInput id="select-multiple-chip" />}
          renderValue={() => {
            if ((selected as selected[]).length === 0) {
              return (
                <em
                  style={{
                    font: 'inherit',
                    color: 'currentColor',
                    opacity: 0.4
                  }}>
                  แท็ก
                </em>
              )
            }

            return (selected as selected[])
              .map((ele) => '#' + ele.name)
              .join(', ')
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem disabled value="">
            <em>เลือกแท็ก</em>
          </MenuItem>
          {items.map((item, k) => (
            <MenuItem
              key={k}
              value={item.id}
              style={getStyles(item.name, personName, WattanaTheme)}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export { SelectMultiple }
