import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
} from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Menu from '../constant/Menu'
import './style.css'
import { IMenuItemType } from './types'

type IOpenStateType = {
  [key: string]: boolean
}

const menu: IMenuItemType[] = Menu()

const APPSidebar = ({ isOpenSidebar }: { isOpenSidebar: boolean }) => {
  const [open, setOpen] = useState<IOpenStateType>({})
  const [hovered, setHovered] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (title: string) => {
    setOpen(prevOpen => ({
      ...prevOpen,
      [title]: !prevOpen[title],
    }))
  }

  const handleNavigate = (menuItem: IMenuItemType) => {

    if (
      menuItem.to === undefined &&
      menuItem.items &&
      menuItem.items.length > 0
    ) {
      handleClick(menuItem.title)
    } else {
      const path = menuItem.to
      if (path !== '') {
        navigate(`${path}`)
      }
    }
  }
  // console.log(' location.pathname', location.pathname)
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    title: string,
  ) => {
    setHovered(title)
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setHovered(null)
    setAnchorEl(null)
  }

  const openPopover = Boolean(anchorEl)

  const isSelected = (menuItem: IMenuItemType) =>
    location.pathname === menuItem.to

  const isSubItemSelected = (subItem: IMenuItemType) =>
    location.pathname === subItem.to

  return (
    <List sx={{ padding: '0px' }}>
      {menu.map((menuItem, index) => {
        return (
          <React.Fragment key={index}>
            <ListItemButton
              disableRipple
              sx={{
                minHeight: 48,
                justifyContent: isOpenSidebar ? 'initial' : 'center',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                color: theme =>
                  isSelected(menuItem) && isOpenSidebar
                    ? theme.palette.mode !== 'dark'
                      ? '#32976A'
                      : '#EA244E'
                    : 'inherit',
                borderRadius: isSelected(menuItem) ? '0px' : '0px',
                margin: isSelected(menuItem) ? '0 4px' : '0px',
                '& .MuiIconButton-root': {
                  filter: theme =>
                    isSelected(menuItem) && isOpenSidebar
                      ? theme.palette.mode !== 'dark'
                        ? ''
                        : ''
                      : 'inherit',
                },
                '& .MuiListItemText-primary': {
                  color: theme =>
                    isSelected(menuItem) && isOpenSidebar
                      ? theme.palette.mode !== 'dark'
                        ? '#32976A'
                        : '#EA244E'
                      : 'inherit',
                },
              }}
              onClick={() => handleNavigate(menuItem)}
              onMouseEnter={event =>
                !isOpenSidebar && handlePopoverOpen(event, menuItem.title)
              }
              onMouseLeave={() => {
                if (!openPopover) {
                  handlePopoverClose()
                }
              }}
            >
              <IconButton
                disableRipple
                sx={{
                  cursor: 'pointer',
                }}
              >
                {menuItem.icon}
              </IconButton>
              {isOpenSidebar && (
                <ListItemText
                  primary={menuItem.title}
                  sx={{
                    fontSize: '14px',
                    opacity: isOpenSidebar ? 1 : 0,
                    color: '#999999',
                  }}
                />
              )}
              {!isOpenSidebar &&
                menuItem.items &&
                menuItem.items.length > 0 && (
                  <ArrowDropDownIcon
                    sx={{
                      position: 'absolute',
                      right: 8,
                      bottom: 8,
                      fontSize: '16px',
                      opacity: 0.7,
                    }}
                  />
                )}
              {!isOpenSidebar &&
                menuItem.items &&
                menuItem.items.length > 0 && (
                  <Popover
                    sx={{
                      marginTop: '-20px',
                      marginLeft: '5px',
                    }}
                    open={openPopover && hovered === menuItem.title}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <List
                      component="div"
                      onMouseEnter={() => setHovered(menuItem.title)}
                      onMouseLeave={handlePopoverClose}
                    >
                      {menuItem.items.map((subItem, subIndex) => (
                        <ListItemButton
                          disableRipple
                          key={subIndex}
                          onClick={() => handleNavigate(subItem)}
                          sx={{
                            '&:hover': {
                              backgroundColor: theme =>
                                isSubItemSelected(subItem)
                                  ? theme.palette.mode !== 'dark'
                                    ? '#32976A'
                                    : '#EA244E'
                                  : 'inherit',
                            },
                            backgroundColor: theme =>
                              isSubItemSelected(subItem)
                                ? theme.palette.mode !== 'dark'
                                  ? '#32976A'
                                  : '#EA244E'
                                : 'inherit',
                            borderRadius: isSubItemSelected(subItem)
                              ? '15px'
                              : '0px',
                            margin: isSubItemSelected(subItem)
                              ? '0 4px'
                              : '0px',
                            '& .MuiIconButton-root': {
                              filter: isSubItemSelected(subItem)
                                ? 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(87deg) brightness(101%) contrast(101%)'
                                : 'none',
                            },
                            '& .MuiListItemText-primary': {
                              color: isSubItemSelected(subItem)
                                ? 'white'
                                : 'inherit',
                            },
                          }}
                        >
                          <ListItemText
                            sx={{ fontSize: '14px', color: '#999999' }}
                            primary={subItem.title}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Popover>
                )}
            </ListItemButton>
            {isOpenSidebar && menuItem.items && menuItem.items.length > 0 && (
              <Collapse in={open[menuItem.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menuItem.items.map((subItem, subIndex) => (
                    <ListItemButton
                      disableRipple
                      key={subIndex}
                      onClick={() => handleNavigate(subItem)}
                      style={{ paddingLeft: 55, cursor: 'pointer' }}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme =>
                            isSubItemSelected(subItem)
                              ? theme.palette.mode !== 'dark'
                                ? '#32976A'
                                : '#EA244E'
                              : 'inherit',
                        },
                        backgroundColor: theme =>
                          isSubItemSelected(subItem)
                            ? theme.palette.mode !== 'dark'
                              ? '#32976A'
                              : '#EA244E'
                            : 'inherit',
                        transition: 'backgroundColor 0.7s ease-in-out',
                        borderRadius: isSubItemSelected(subItem)
                          ? '15px'
                          : '0px',
                        margin: isSubItemSelected(subItem) ? '0 4px' : '0px',
                        '& .MuiIconButton-root': {
                          filter: isSubItemSelected(subItem)
                            ? 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(87deg) brightness(101%) contrast(101%)'
                            : 'none',
                        },
                        '& .MuiListItemText-primary': {
                          color: isSubItemSelected(subItem)
                            ? 'white'
                            : 'inherit',
                        },
                      }}
                    >
                      <ListItemText
                        sx={{ fontSize: '14px', color: '#999999' }}
                        primary={subItem.title}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default APPSidebar
