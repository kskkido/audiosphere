import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import { Login } from './Login'
import Navbar from './Navbar'
import SideBar from './sidebar'

const Main = ({children, currentSong, user}) => {
  return (
    <div id='home'>
      {/* <h1>YO</h1> */}
        {/*!user && <Login />*/}
        <Navbar />
        <div className="non-across">
  		    <SideBar />
  	      { children }
        </div>
        <div className="song-card">
          <div className="song-snippet z-depth-2">
            <div className="snippet-text">{currentSong.name ? currentSong.name : null}</div><i className="material-icons">hearing</i>
          </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth,
  currentSong: state.player.currentSong
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)