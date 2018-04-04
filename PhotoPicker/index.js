import React from 'react';
import ReactDOM from 'react-dom';
import InstagramPhotoPicker from './screens/InstagramPhotoPicker';

var s = document.getElementsByTagName('head')[0];

if(!window.InstAuth) {
  const ig = document.createElement('script');
  ig.type = 'text/javascript';
  ig.async = true;
  ig.src = 'https://instagram-web-auth.firebaseapp.com/instauth.min.js';
  ig.onload = () => {
    if(window.InstAuth) {
      window.InstAuth.init(window.instagramPhotoPicker.clientId);
    }
  };
  s.parentNode.insertBefore(ig, s);
}

var font = document.createElement('link');
font.rel  = 'stylesheet';font.type = 'text/css';font.media = 'all';
font.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
s.parentNode.appendChild(font);

var featureRequest = document.createElement('div');
featureRequest.id = 'instagramPhotoPicker';
s.parentNode.appendChild(featureRequest);

ReactDOM.render(<InstagramPhotoPicker ref={ref => { window.instagramPhotoPicker = ref; }}/>,
  document.getElementById('instagramPhotoPicker'));

window.instagramPhotoPicker.onPhotosPicked = (photos) => {
  console.warn('picked photos', photos);
};
