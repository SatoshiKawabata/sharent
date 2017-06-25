import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Files from '../elements/Files';
import Content from '../elements/Content';
import Loading from '../elements/Loading';
import Header from '../elements/Header';

class Container extends Component {

  static propTypes = {
  };

  render() {
    return (
    <div>
      <Header />
      <Files />
      <Content />
      <Loading />
    </div>
    );
  }

  static mapStateToProps(state) {
    const { loading } = state;
    return {
      loading,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {};
  }
}

export default connect(Container.mapStateToProps, Container.mapDispatchToProps)(Container);