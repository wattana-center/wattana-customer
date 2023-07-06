import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'

import InboxIcon from '@mui/icons-material/MoveToInbox'
import React from 'react'
import { RoutesPath } from '@app/config'
import SendIcon from '@mui/icons-material/Send'
import { Widgets } from '@mui/icons-material'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import { withStyles } from '@mui/styles'

const StyledMenu = withStyles({
  paper: {
    minWidth: 300,
    border: '1px solid #d3d4d5'
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    // getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem)

interface IMenuProfile {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  anchorEl: null | HTMLElement
}

export const MenuProfileBar: React.FC<IMenuProfile> = (props) => {
  const { setAnchorEl, anchorEl } = props

  const router = useRouter()
  const profile = useAuthUser()
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onhandleSignOut = () => {
    setAnchorEl(null)
  }

  const IsAdmin = (): JSX.Element => {
    return <></>
    // return resultToken?.claims['is_admin'] === true ? (
    //   <>
    //     <StyledMenuItem
    //       onClick={() => {
    //         setAnchorEl(null)
    //         router.push(ROUTESPATH.ADMIN.INDEX)
    //       }}>
    //       <ListItemIcon>
    //         <Dashboard fontSize="small" />
    //       </ListItemIcon>
    //       <ListItemText primary="เข้าหน้าผู้จัดการ" />
    //     </StyledMenuItem>
    //   </>
    // ) : (
    //   <></>
    // )
  }

  // useEffect(() => {
  //   if (resultToken === undefined)
  //     (profile as firebase.User)?.getIdTokenResult().then((value) => {
  //       setResultToken(value)
  //     })
  // }, [profile])

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <StyledMenuItem
        onClick={() => {
          setAnchorEl(null)
          router.push(RoutesPath.PROFILE.INDEX)
        }}>
        <ListItemIcon>
          <SendIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="ข้อมูลส่วนตัว" />
      </StyledMenuItem>
      <StyledMenuItem
        onClick={() => {
          router.push(RoutesPath.BLOG.MANAGE)
          setAnchorEl(null)
        }}>
        <ListItemIcon>
          <Widgets fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="รายการการจอง" />
      </StyledMenuItem>
      <IsAdmin />
      <StyledMenuItem onClick={onhandleSignOut}>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary="ออกจากระบบ"
          onClick={async () => {
            profile.signOut()
          }}
        />
      </StyledMenuItem>
    </StyledMenu>
  )
}
