import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

class AppNavbar extends Component {
  state = {
    isAuthenticated: false,
  };

  onLogoutClick = (e) => {
    e.preventDefault();

    const { firebase } = this.props;

    firebase.logout();
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  render() {
    const { allowRegistration } = this.props;
    const { isAuthenticated } = this.state;
    const auth = this.props.auth;

    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-primary mb-4'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            ClientPanel
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarMain'>
            <span className='navbar-toggler-icon'> </span>
          </button>
          <div className='collapse navbar-collapse' id='navbarMain'>
            <ul className='navbar-nav mr-auto'>
              {isAuthenticated ? (
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuthenticated ? (
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <a href='#!' className='nav-link'>
                    {auth.email}
                  </a>
                </li>
                <li className='nav-item'>
                  <Link to='/settings' className='nav-link'>
                    Settings
                  </Link>
                </li>
                <li className='nav-item'>
                  <a
                    href='#!'
                    className='nav-link'
                    onClick={this.onLogoutClick}>
                    Logout
                  </a>
                </li>
              </ul>
            ) : null}
            {isAuthenticated === false && allowRegistration === false ? (
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                </li>
              </ul>
            ) : null}
            {isAuthenticated === false && allowRegistration === true ? (
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/register' className='nav-link'>
                    Register
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}
export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    allowRegistration: state.settings.allowRegistration,
  }))
)(AppNavbar);
