// import {
//   Checkbox,
//   Divider,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemSecondaryAction,
//   ListItemText,
//   Theme,
//   createStyles,
//   makeStyles
// } from '@mui/material'
// import { Delete as DeleteIcon, SearchSharp } from '@mui/icons-material'

// import Link from 'next/link'
// import ROUTESPATH from '@app/config/routes-path'
import React from 'react'
// import { parseTime } from '@app/libs/dateTime'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//       maxWidth: '100%'
//     },
//     demo: {
//       backgroundColor: theme.palette.background.paper
//     },
//     title: {
//       margin: theme.spacing(4, 0, 2)
//     }
//   })
// )

// interface INewsList {
//   // data: IAdmNews[]
//   handleDelete: (value: number) => () => void
// }

// export default function NewsList(props: INewsList) {
//   const { data, handleDelete } = props
//   const classes = useStyles()
//   const [checked, setChecked] = React.useState([0])

//   const handleToggle = (value: number) => () => {
//     const currentIndex = checked.indexOf(value)
//     const newChecked = [...checked]

//     if (currentIndex === -1) {
//       newChecked.push(value)
//     } else {
//       newChecked.splice(currentIndex, 1)
//     }

//     setChecked(newChecked)
//   }

//   return (
//     <>
//       <div className={classes.demo}>
//         <List className={classes.root}>
//           {/* {data.map((value, key) => {
//             const labelId = `checkbox-list-label-${value.id}`

//             return (
//               <div key={key}>
//                 <ListItem role={undefined} dense button onClick={handleToggle(value.id)}>
//                   <ListItemIcon>
//                     <Checkbox
//                       edge="start"
//                       checked={checked.indexOf(value.id) !== -1}
//                       tabIndex={-1}
//                       disableRipple
//                       inputProps={{ 'aria-labelledby': labelId }}
//                     />
//                   </ListItemIcon>
//                   <ListItemText
//                     id={labelId}
//                     primary={value.title}
//                     secondary={`${parseTime(value.create_at)}`}
//                   />
//                   <ListItemSecondaryAction>
//                     <Grid container spacing={1}>
//                       <Grid item>
//                         <Link
//                           href={ROUTESPATH.ADMIN.NEWS.DETAIL.replace(':id', value.id.toString())}>
//                           <IconButton edge="end" aria-label="comments">
//                             <SearchSharp />
//                           </IconButton>
//                         </Link>
//                       </Grid>
//                       <Grid item>
//                         <IconButton
//                           edge="end"
//                           aria-label="comments"
//                           onClick={handleDelete(value.id)}>
//                           <DeleteIcon />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </ListItemSecondaryAction>
//                 </ListItem>
//                 <Divider />
//               </div>
//             )
//           })} */}
//         </List>
//       </div>
//     </>
//   )
// }

const NewsList: React.FC = () => {
  return <></>
}

export { NewsList }
