# Instagram Photo Picker

Allow users to pick photos from their Instagram profile in easy way.

## Introduction

Implementing **Instagram API** may be difficult for some developers, that is why I have created this module.

It is *clear and fast way* to implement nice looking **(and working)** photo picker for Instagram photos in your React application.

Component is using [instagram-web-oauth](https://github.com/venits/instagram-web-oauth) module for authorization.


## Requirements

First of all go to [Instagram Developer Console](https://www.instagram.com/developer/) and create your app.

After creating app go to: **Manage Clients -> Manage -> Security.**

*Some important notes:*
1. **Disable implicit OAuth** - must be unchecked, otherwise we will not be able to use Implicit flow!

2. **Valid redirect URIs** - add URI from where you are calling instagram authorization.

*For example your redirect URI can look like this: `http://localhost:3000/`.*

![Demo](https://raw.githubusercontent.com/venits/instagram-web-oauth/master/instauth.png)

## Preview

![Preview](https://raw.githubusercontent.com/venits/react-instagram-photo-picker/master/preview.png)
![Preview](https://raw.githubusercontent.com/venits/react-instagram-photo-picker/master/preview2.png)

## Usage

Place this code in your `</head>` tag:

```js
<script src="https://instagram-photo-picker.firebaseapp.com/instagram.min.js"></script>
<script>
  window.instagramPhotoPicker.clientId = instagram_client_id;
  window.instagramPhotoPicker.onPhotosPicked = (photos) => {
    console.warn('picked photos', photos);
  };
</script>
```

To show dialog, simply call:
```js
window.instagramPhotoPicker.show();
// or if you want to hide:
window.instagramPhotoPicker.hide();
```
You can also get all downloaded images:
```js
window.instagramPhotoPicker.getInstagramImages();
```

## Summary

I hope that you will find this module useful, also if you have any problems or questions please let me know, I will be more than happy to help you :)

My email: tomasz.przybyl.it@gmail.com

