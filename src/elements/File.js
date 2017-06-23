import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreator from '../ActionCreator';
import { FILE_TYPE } from '../consts';
import { GridTile } from 'material-ui/GridList';
import PermMediaIcon from 'material-ui/svg-icons/action/perm-media';
import './File.css';

/**
 * Fileを表示する
 */
class File extends Component {

  static propTypes = {
    file: PropTypes.object.isRequired,
    thumbnail: PropTypes.object,
    filesGetThumbnail: PropTypes.func,
    filesDownload: PropTypes.func,
    filesListFolder: PropTypes.func,
    startLoading: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      thumbnailUrl: null,
      type: null,
    };
    this._onMouseOverThumbnail = this._onMouseOverThumbnail.bind(this);
    this._onMouseOutThumbnail = this._onMouseOutThumbnail.bind(this);
  }

  componentDidMount() {
    // request thumbnail
    const { file } = this.props;
    if (!this._isFolder(file)) {
      this.setState({ type: FILE_TYPE.FILE });
      this.props.filesGetThumbnail(file.path_display);
    } else {
      this.setState({ type: FILE_TYPE.FOLDER });
    }
  }

  componentWillReceiveProps(nextProps) {
    // create thumbnail
    const { thumbnails, file } = nextProps;
    if (thumbnails && thumbnails[file.path_display]) {
      const thumbnail = thumbnails[file.path_display];
      const thumbnailUrl = window.URL.createObjectURL(thumbnail.fileBlob);
      this.setState({ thumbnailUrl });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;
    const { file } = this.props;
    const { file: nextFile } = nextProps;
    shouldUpdate = file.path_display !== nextFile.path_display;
    const { thumbnailUrl, type, hoverStyle } = this.state;
    const { thumbnailUrl: nextUrl, type: nextType, hoverStyle: nextHoverStyle } = nextState;
    shouldUpdate = shouldUpdate || thumbnailUrl !== nextUrl;
    shouldUpdate = shouldUpdate || type !== nextType;
    shouldUpdate = shouldUpdate || hoverStyle !== nextHoverStyle;
    return shouldUpdate;
  }

  render() {
    const { file } = this.props;
    return (
      <div
        onClick={this._onClickFile.bind(this)}
        className='file__container'>
        <GridTile
          title={<a>{file.name}</a>}
          subtitle={file.server_modified}
          key={file.path_display}
          titlePosition='bottom'
          style={{ height: 300 }}>
          {this._renderThumbnail()}
        </GridTile>
      </div>
    );
  }

  _renderThumbnail() {
    if (this.state.thumbnailUrl) {
      return <img
        src={this.state.thumbnailUrl}
        onMouseOver={this._onMouseOverThumbnail}
        onMouseOut={this._onMouseOutThumbnail}
        style={this.state.hoverStyle}
        className='file__thumbnail' />;
    } else {
      return <PermMediaIcon viewBox='50 50 100 100' />;
    }
  }

  _isFolder(file) {
    return file['.tag'] === FILE_TYPE.FOLDER;
  }

  _onMouseOverThumbnail(e:Event) {
    this.setState({
      hoverStyle: { transform: `${e.currentTarget.style.transform} scale(0.9)` },
    });
  }

  _onMouseOutThumbnail(e:Event) {
    this.setState({
      hoverStyle: null,
    });
  }

  _onClickFile(e) {
    const { path_display: path, rev } = this.props.file;
    const { type } = this.state;
    if (type === FILE_TYPE.FILE) {
      this.props.startLoading();
      this.props.filesDownload(path, rev);
    } else {
      this.props.filesListFolder(path);
    }
  }

  static mapStateToProps(state) {
    const { thumbnails } = state;
    return {
      thumbnails,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      startLoading: () => {
        dispatch(ActionCreator.startLoading());
      },
      filesGetThumbnail: (path:string) => {
        dispatch(ActionCreator.filesGetThumbnail(path));
      },
      filesDownload: (path:string, rev:string) => {
        dispatch(ActionCreator.filesDownload(path, rev));
      },
      filesListFolder: (path:string) => {
        dispatch(ActionCreator.filesListFolder(path));
      },
    }
  }
}

export default connect(File.mapStateToProps, File.mapDispatchToProps)(File);