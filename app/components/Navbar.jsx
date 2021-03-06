import React from 'react'
import { connect } from 'react-redux'
import { removeCurrentSong } from 'APP/app/reducers/player'
import { fetchPlaylists, restartRender } from 'APP/app/reducers/userLibrary'
import { login, logout } from 'APP/app/reducers/auth'

const Navbar = ({ currentPlaylist, fetchPlaylists, login, logout, playlists, restartRender, user, userPlaylist }) => {

  function renderLogout() {
    return <li>
      <a
        href="/"
        onClick={() => {
          restartRender()
          logout()
        }}
      >
        Logout
      </a>
    </li>
  }

  function renderLogin() {
    return (
        <li>
          <a
            target="_self"
            href="api/auth/login/spotify"
            onClick={login}
          >
            Spotify Login
          </a>
      </li>
    )
  }

  function getFeaturedPlaylists() {
    return (
      <li><a onClick={() => {restartRender(); fetchPlaylists(true)}}>Load Featured Playlists</a></li>
    )
  }

  function getUserPlaylists() {
    return (
      <li><a onClick={() => {restartRender(); fetchPlaylists()}}>Load Your Playlists</a></li>
    )
  }

  function isLoggedIn() {
    return userPlaylist ? getFeaturedPlaylists() : getUserPlaylists()
  }

  return (
  <nav className="transparent" id="top-nav">
    <div className="wrapper nav-wrapper">
      <a href="#" data-activates="slide-out" className="button-collapse left"><i className="material-icons">menu</i></a>
      <ul id="nav-mobile" className="right" style={{marginRight: '20px'}}>
        {user && playlists.length > 0 ? isLoggedIn() : null}
        {user ? renderLogout() : renderLogin()}
        <li><a style={{target: '_blank;'}} href="https://github.com/kskkido/Audiosphere">Source Code</a></li>
      </ul>
    </div>
  </nav>
  )
}

const mapStateToProps = state => ({
  user: state.auth,
  userPlaylist: state.userLibrary.userPlaylist,
  playlists: state.userLibrary.playlists
})

const mapDispatchToProps = dispatch => ({
  fetchPlaylists: (featured = false) => {
    dispatch(removeCurrentSong())
    dispatch(fetchPlaylists(featured))
  },
  logout: () => dispatch(logout()),
  login: () => dispatch(login()),
  restartRender: () => dispatch(restartRender()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
