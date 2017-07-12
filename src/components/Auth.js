import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreator from '../ActionCreator';

class Auth extends Component {

  static propTypes = {
    getAuthenticationUrl: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }
  componentWillReceiveProps(nextProps) {
    const { authUrl } = nextProps;
    if (authUrl) {
      window.location.href = authUrl;
    }
  }

  componentWillMount() {
    this.props.getAuthenticationUrl();
  }

  render() {
    return (
      <div>Auth</div>
    );
  }

  static mapStateToProps(state) {
    const {
      accessToken,
      email,
      password,
      authUrl,
    } = state;
    return {
      accessToken,
      email,
      password,
      authUrl,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      getAuthenticationUrl: () => {
        dispatch(ActionCreator.getAuthenticationUrl());
      },
    };
  }
}

export default connect(Auth.mapStateToProps, Auth.mapDispatchToProps)(Auth);