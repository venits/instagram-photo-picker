import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import Preload from 'react-preloaded';
import Loading from '../../components/Loading';
import GridImage from './Grid/GridImage';
import Grid from './Grid';
import ButtonsPanel from './ButtonsPanel';
import InstagramAPI from '../../api/InstagramAPI';

const imagesToPreload = [
  'https://firebasestorage.googleapis.com/v0/b/instagram-photo-picker.appspot.com/o/cancel.svg?alt=media&token=ca5cc7e3-d1e8-411f-81e7-5b48c93d76d1',
  'https://firebasestorage.googleapis.com/v0/b/instagram-photo-picker.appspot.com/o/more.svg?alt=media&token=834853a5-7efc-494e-8a4f-8d485136ada2',
  'https://firebasestorage.googleapis.com/v0/b/instagram-photo-picker.appspot.com/o/select.svg?alt=media&token=a4845fdc-1428-45b0-8d8d-b5a7c8ca0107',
  'https://firebasestorage.googleapis.com/v0/b/instagram-photo-picker.appspot.com/o/select_transparent.svg?alt=media&token=8baf8253-c044-4ca0-af2d-4e0ef752e706',
];

export default class PhotoPicker extends Component {
  state = {
    pickedPhotos: [],
    instagramPhotos: [],
    isLoadingMore: false,
  };

  componentDidMount() {
    this.setState({
      instagramPhotos: this.createArrayOfInstagramPhotos(this.props.photos),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoadingMore: false,
      instagramPhotos: this.createArrayOfInstagramPhotos(nextProps.photos)
    });
  }

  selectImage = (url) => {
    if (this.state.pickedPhotos.filter(item => item === url).length > 0) {
      this.setState((prevState) => {
        return { pickedPhotos: prevState.pickedPhotos.filter(item => item !== url) };
      });
    } else {
      this.setState((prevState) => {
        return { pickedPhotos: [...prevState.pickedPhotos, url] };
      });
    }
  };

  createArrayOfInstagramPhotos = (imagesData) => {
    return imagesData.map(child =>
      (<GridImage
        onSelect={this.selectImage}
        key={child.images.standard_resolution.url}
        standard={child.images.standard_resolution.url}
        low={child.images.low_resolution.url}
      />)
    );
  };

  appendToArrayOfInstagramPhotos = (imagesData, paginationUrl) => {
    this.props.loadMore(imagesData, paginationUrl);
  };

  loadMorePictures = () => {
    this.setState({ isLoadingMore: true });
    InstagramAPI.loadMorePhotos(this.props.pagination)
      .then((images) => {
        this.appendToArrayOfInstagramPhotos(images.data, images.pagination.next_url);
      })
      .catch(() => {
        this.setState({ isLoadingMore: false });
        console.error('Instagram', 'There are no more photos left.');
      });
  };

  confirmSelect = () => {
    if (this.state.pickedPhotos.length > 0) {
      this.props.confirm(this.state.pickedPhotos);
      this.props.cancel();
    }
  };

  render() {
    return (
      <Preload
        loadingIndicator={<Loading/>}
        images={imagesToPreload}
        autoResolveDelay={3000}
        resolveOnError={true}
        mountChildren={true}
      >
        <div className={css(styles.container)}>
          <Grid
            photos={this.state.instagramPhotos}
            pickedCount={this.state.pickedPhotos.length}
          />
          <ButtonsPanel
            count={this.state.pickedPhotos.length}
            cancel={this.props.cancel}
            loadingMore={this.state.isLoadingMore}
            load={this.loadMorePictures}
            confirm={this.confirmSelect}
          />
        </div>
      </Preload>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomLeftRadius: '1em',
    borderBottomRightRadius: '1em',
    borderTopLeftRadius: '0.5em',
    borderTopRightRadius: '0.5em',
    padding: '0.75em',
    backgroundColor: '#f6f8fa',
  },
});

PhotoPicker.propTypes = {
  confirm: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  cancel: PropTypes.func.isRequired,
  pagination: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
};
