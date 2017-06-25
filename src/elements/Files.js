import PropTypes from 'prop-types';
import React, { Component } from 'react';
import File from './File';
import { connect } from 'react-redux';
import ActionCreator from '../ActionCreator';
import { GridList } from 'material-ui/GridList';
import './Files.css';

/**
 * Fileのリストを表示する
 */
class Files extends Component {

  static propTypes = {
    files: PropTypes.array,
    filesListFolder: PropTypes.func,
    startLoading: PropTypes.func,
  };

  componentDidMount() {
    console.log('files', this.props.files);
    if (!this.props.files) {
      this.props.startLoading();
      this.props.filesListFolder();
    }
  }

  render() {
    return (
    <div className='files__root'>
      <GridList
        cols={4}
        cellHeight='auto'
      >
      { this._renderFiles() }
    </GridList>
    </div>
    );
  }

  _renderFiles() {
    const { files } = this.props;
    if (files) {
      return files.map(this._renderFile.bind(this));
    } else {
      return null;
    }
  }

  _renderFile(file) {
    return (<File file={file} key={file.path_display} />);
  }

  static mapStateToProps(state) {
    const { files } = state;
    return {
      files,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      filesListFolder: () => {
        dispatch(ActionCreator.filesListFolder());
      },
      startLoading: () => {
        dispatch(ActionCreator.startLoading());
      },
    };
  }
}

export default connect(Files.mapStateToProps, Files.mapDispatchToProps)(Files);