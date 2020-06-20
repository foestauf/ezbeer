import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
  onLogoutClick = (e) => {
    const { logoutUser: logout } = this.props;
    e.preventDefault();
    logout();
  };

  render() {
    const { auth } = this.props;
    const { user } = auth;
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(' ')[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{' '}
                <span style={{ fontFamily: 'monospace' }}>MERN</span> app 👏
              </p>
            </h4>
            <Button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </Button>
          </div>
          <LinkContainer to="/recipelist">
            <Nav.Link>
              <Button>Recipe Manager</Button>
            </Nav.Link>
          </LinkContainer>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
