import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import Preload from 'react-preloaded';
import Loading from '../../components/Loading';

const imagesToPreload = [
  'https://firebasestorage.googleapis.com/v0/b/instagram-photo-picker.appspot.com/o/visibility_off.svg?alt=media&token=fae7f4bc-4774-469d-bb24-8af9346088b7',
];

export default class NoPhotos extends Component {
  state = {
    isReloading: false,
  };

  componentWillReceiveProps() {
    this.setState({ isReloading: false });
  }

  reloadPhotos = () => {
    if (!this.state.isReloading) {
      this.setState({ isReloading: true });
      this.props.reload();
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
          <img alt="" className={css(styles.icon)} src="https://firebasestorage.googleapis.com/v0/b/instagram-photo-picker.appspot.com/o/visibility_off.svg?alt=media&token=fae7f4bc-4774-469d-bb24-8af9346088b7"/>
          <p className={css(styles.text)}>You don't have any photos</p>
          <button className={css(styles.reload)} onClick={this.reloadPhotos}>
            {this.state.isReloading
              ? <div className={css(styles.spinner)} />
              : <span className={css(styles.reloadText)}>RELOAD</span>}
          </button>
        </div>
      </Preload>
    );
  }
}

const spin = {
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '1.5em',
    paddingRight: '1.5em',
    borderRadius: '1em',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '4em',
    height: '4em',
    marginTop: '0.75em',
    marginBottom: '0.5em',
  },
  text: {
    color: '#888',
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  reload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #2196F3',
    backgroundColor: 'white',
    marginBottom: '1em',
    marginTop: '1.5vh',
    width: '10em',
    borderRadius: '5em',
    ':hover': { backgroundColor: '#E3F2FD' },
    ':active': {
      outline: 0,
      backgroundColor: '#BBDEFB',
    },
    ':focus': { outline: 0 },
  },
  reloadText: {
    color: '#2196F3',
    fontSize: '120%',
    fontFamily: 'Roboto',
    paddingTop: '0.55em',
    paddingBottom: '0.55em',
    fontWeight: '500',
  },
  spinner: {
    border: '0.4em solid #BBDEFB',
    borderTop: '0.4em solid #2196F3',
    borderRadius: '50%',
    width: '2em',
    height: '2em',
    animationName: [spin],
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});

NoPhotos.propTypes = {
  reload: PropTypes.func.isRequired,
};
