import {
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'

import { CommentHotel } from '.'
import React from 'react'
import { WattanaTheme } from '@app/config'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    [WattanaTheme.breakpoints.up('sm')]: {
      height: 593
    }
  },
  media: {
    height: 593
  },
  title: {
    color: '#C99400'
  },
  border: {
    borderColor: '#C99400',
    marginTop: 20,
    marginBottom: 20
  }
}))

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      WattanaTheme.palette.grey[
        WattanaTheme.palette.mode === 'light' ? 200 : 700
      ]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff'
  }
}))(LinearProgress)

type ScoreViewProps = {
  title: string
  score: number
}

const ScoreView = (props: ScoreViewProps) => {
  return (
    <Grid container direction="column">
      <Grid item style={{ flexGrow: 1 }} xs={6}>
        <BorderLinearProgress variant="determinate" value={props.score} />
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item xs={10}>
          <Typography variant="body1" noWrap textOverflow="ellipsis">
            {props.title}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" align="right">
            {(props.score / 10).toFixed(1)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const ReviewHotel: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            รีวิวจากผู้เข้าพักจริง
          </Typography>
          <div style={{ margin: '10px 0' }}></div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ScoreView title="ความสะอาด" score={77} />
            </Grid>
            <Grid item xs={6}>
              <ScoreView title="การให้บริการ" score={77} />
            </Grid>
          </Grid>
          <div style={{ margin: '10px 0' }}></div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ScoreView title="สิ่งอำนวยความสะดวก" score={88} />
            </Grid>
            <Grid item xs={6}>
              <ScoreView title="คุ้มค่ากับเงินที่จ่าย" score={88} />
            </Grid>
          </Grid>
          <div style={{ margin: '10px 0' }}></div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ScoreView title="ทำเลที่ตั้ง" score={87} />
            </Grid>
            <Grid item xs={6}>
              <ScoreView title="อื่นๆ" score={87} />
            </Grid>
          </Grid>
          <div style={{ margin: '10px 0' }}></div>
          <Typography variant="body2">
            แสดง 337 รีวิวจากผู้เข้าพักจริง
          </Typography>
          <Divider style={{ marginBottom: '10px' }} />

          <CommentHotel />

          <CommentHotel />

          <CommentHotel lastColumn />
        </CardContent>
      </Card>
    </>
  )
}

export { ReviewHotel }
