import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import lang from '../lang/lang';
import ImageUtil from '../utils/ImageUtil';
import RotateRightIcon from 'material-ui/svg-icons/image/rotate-right';
import './ContentImage.css';

class ContentImage extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      rotatedImageUrls: [],
      rotateCount: 0,
      isLandscape: true,
    };
    this._onClickRotate = this._onClickRotate.bind(this);
    this._onLoadImage = this._onLoadImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { src = '' } = this.props;
    if (src !== nextProps.src) {
      this.setState({
        rotatedImageUrls: [ src ],
        rotateCount: 0,
      });
    }
  }

  componentWillMount() {
    const { src = '' } = this.props;
    this.setState({
      rotatedImageUrls: [ src ],
      rotateCount: 0,
    });
  }

  render() {
    const { isLandscape } = this.state;
    const src = this.state.rotatedImageUrls[this.state.rotateCount];
    return (
      <div className='content-image'>
        <img
          className={`content-image__image content-image__image--${isLandscape ? 'landscape' : 'portrait'}`}
          src={src}
          onLoad={this._onLoadImage} />
        {this.props.src ? <FlatButton
          onClick={this._onClickRotate}
          label={lang.get('rotate')}
          icon={<RotateRightIcon />}
        /> : null}
      </div>
    );
  }

  _onLoadImage(e:Event) {
    const { target } = e;
    const isLandscape:boolean = target.width > target.height;
    this.setState({
      isLandscape,
    });
  }

  _onClickRotate() {
    console.log('rotate');
    const { rotateCount, rotatedImageUrls } = this.state;
    const next = rotateCount < 3 ? rotateCount + 1 : 0;
    if (rotatedImageUrls[next]) {
      this.setState({ rotateCount: next });
    } else {
      const current = rotatedImageUrls[rotateCount];
      ImageUtil.loadImg(current)
        .then(ImageUtil.img2canvasWithRotation)
        .then(ImageUtil.canvas2imgUrl)
        .then(rotatedUrl => {
          rotatedImageUrls.push(rotatedUrl);
          this.setState({
            rotatedImageUrls,
            rotateCount: next,
          });
        });
    }
  }
}

export default ContentImage;