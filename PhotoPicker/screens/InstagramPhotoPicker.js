import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import States from '../states/index';
import InstagramAPI from '../api/InstagramAPI';
import LoginToInstagram from './LoginToInstagram/index';
import Loading from '../components/Loading';
import NoPhotos from './NoPhotos/index';
import PhotoPicker from './PhotoPicker/index';

export default class InstagramPhotoPicker extends Component {
  state = {
    showDialog: false,
    instagramImages: [],
    isDownloadingImages: false,
    paginationUrl: '',
  };

  show = () => {
    if(window.InstAuth) {
      this.setState({ showDialog: true });
      this.checkIfNeedToDownload();
    } else {
      window.InstAuth.init(window.instagramPhotoPicker.clientId);
      console.error('Instagram authorization module is loading.');
    }
  };

  hide = () => {
    this.setState({ showDialog: false });
  };

  checkIfNeedToDownload = () => {
    if (window.InstAuth.accessToken && this.state.instagramImages.length === 0) {
      this.setState({ isDownloadingImages: true });
      InstagramAPI.getUserMedia(window.InstAuth.accessToken, 6)
        .then((images) => {
          this.setState({
            instagramImages: images.data,
            isDownloadingImages: false,
            paginationUrl: images.pagination
              ? images.pagination.next_url
              : null,
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ isDownloadingImages: false });
        });
    }
  };

  onNewPhotosLoaded = (newPhotos = [], paginationUrl = '') => {
    this.setState((prevState) => {
      return { paginationUrl, instagramImages: [...prevState.instagramImages, ...newPhotos] };
    });
  };

  getInstagramImages = () => this.state.instagramImages;

  onFocusLost = (event) => {
    if (event.target === this.dialog) this.hide();
  };

  calculateModuleState = () => {
    return window.InstAuth.accessToken
      ? !this.state.isDownloadingImages
        ? this.state.instagramImages.length > 0
          ? States.PHOTO_PICKER
          : States.NO_INSTAGRAM_PHOTOS
        : States.APP_IS_LOADING
      : States.LOGIN_TO_INSTAGRAM;
  };

  render() {
    if (this.state.showDialog) {
      switch (this.calculateModuleState()) {
        case States.PHOTO_PICKER:
          this.body = (<PhotoPicker
            photos={this.state.instagramImages}
            cancel={this.hide}
            confirm={this.onPhotosPicked}
            pagination={this.state.paginationUrl}
            loadMore={this.onNewPhotosLoaded}
          />);
          break;
        case States.NO_INSTAGRAM_PHOTOS:
          this.body = <NoPhotos reload={this.checkIfNeedToDownload} />;
          break;
        case States.LOGIN_TO_INSTAGRAM:
          this.body = <LoginToInstagram success={this.checkIfNeedToDownload} />;
          break;
        default:
          this.body = <Loading/>;
      }

      return (
        <div
          ref={(ref) => { this.dialog = ref; }}
          className={css(styles.dialog)}
          onClick={this.onFocusLost}
        >
          {this.body}
        </div>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  dialog: {
    position: 'fixed',
    display: 'flex',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000055',
  },
});
