import React from 'react'

import { Link } from 'react-router-dom'

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'

export const SideMenu = ({
  styles,
  onToggle
}) => {
  return (
    <SideNav onToggle={onToggle}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected='registration'>
        <NavItem eventKey='registration'>
          <NavIcon>
            <Link to='registration'>
              <i className='glyphicon glyphicon-user' style={styles.icons} />
            </Link>
          </NavIcon>
          <NavText>
            Customer Registration
          </NavText>
        </NavItem>
        <NavItem eventKey='resorts'>
          <NavIcon>
            <Link to='resorts-list'>
              <i className='glyphicon glyphicon-list-alt' style={styles.icons} />
            </Link>
          </NavIcon>
          <NavText>
            Resorts List
          </NavText>
        </NavItem>
        <NavItem eventKey='resorts'>
          <NavIcon>
            <Link to='users'>
              <i className='glyphicon glyphicon-stats' style={styles.icons} />
            </Link>
          </NavIcon>
          <NavText>
            Users
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  )
}
