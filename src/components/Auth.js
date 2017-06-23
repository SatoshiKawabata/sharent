import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreator from '../ActionCreator';

class Auth extends Component {

  static propTypes = {
  };

  constructor() {
    super();
  }

  componentWillMount() {
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
    } = state;
    return {
      accessToken,
      email,
      password,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
    };
  }
}

export default connect(Auth.mapStateToProps, Auth.mapDispatchToProps)(Auth);