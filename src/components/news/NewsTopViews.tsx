// import {
//   Grid,
//   Paper,
//   Typography,
//   createStyles,
//   makeStyles
// } from '@mui/material'

// import { IWNewsGetAll } from '@app/apis/w-news.api'
import React from 'react'

// interface INewsTopViews {
//   newsTopView: IWNewsGetAll
// }

// const useStyles = makeStyles(() =>
//   createStyles({
//     paper: {
//       backgroundColor: '#F3F3F3',
//       maxHeight: 1315,
//       display: 'flex',
//       flexWrap: 'wrap',
//       justifyContent: 'space-around',
//       overflow: 'hidden'
//     },
//     container: {
//       padding: 10

//       // backgroundColor: theme.palette.background.paper,
//     },
//     textWebkitBox: {
//       display: '-webkit-box',
//       WebkitLineClamp: 1,
//       WebkitBoxOrient: 'vertical',
//       overflow: 'hidden'
//     }
//   })
// )

// export default function NewsTopViews() {
//   const classes = useStyles()
//   return (
//     <>
//       <Paper className={classes.paper} variant="outlined">
//         <Grid
//           container
//           spacing={2}
//           direction="column"
//           className={classes.container}>
//           <Grid item>
//             <Typography
//               variant="h4"
//               color="secondary"
//               className={classes.textWebkitBox}>
//               <b>Topview</b> 5 คนอ่านเยอะที่สุด
//             </Typography>
//           </Grid>
//           <Grid item container>
//             {/* <ImageList cellHeight={180} spacing={10}>
//               {newsTopView?.data.map((v, k) => {
//                 if (k === 0) {
//                   return (
//                     <ImageListItem
//                       cols={2}
//                       style={{ height: 'auto' }}
//                       key={`top-view-${k}`}>
//                       <NewsCardTopview number={k + 1} {...v} />
//                     </ImageListItem>
//                   )
//                 }

//                 return (
//                   <ImageListItem
//                     cols={2}
//                     style={{ height: 'auto' }}
//                     key={`top-view-${k}`}>
//                     <NewsCardTopviewSlim number={k + 1} {...v} />
//                   </ImageListItem>
//                 )
//               })}
//             </ImageList> */}
//           </Grid>
//         </Grid>
//       </Paper>
//     </>
//   )
// }
const NewsTopViews: React.FC = () => {
  return <></>
}

export { NewsTopViews }
