/**
 * @flow
 */

import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  CameraRoll,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import type {Anime} from '../../Type/Model';
import NavigationSlider from '../../Conponent/NavigationSlider';
import {windowWidth, windowHeight} from '../../Constaants';
import {NavigateContext} from '../../App';
import {GlobalStyles} from '../../Styles/GlobalStyles';
import {MyString} from '../../MyString';

const OpenImage = () => {
  const {view, navigateTo, bundle, putInBundle} = useContext(NavigateContext);
  const {url} = bundle;

  const openModal = () => {
    Alert.alert(
      MyString.downloadImageTitle,
      null,
      [
        {
          text: MyString.cancel,
          onPress: () => {},
          style: 'cancel',
        },
        {text: MyString.ok, onPress: saveToLocalStorage},
      ],
      {cancelable: true},
    );
  };

  const saveToLocalStorage = () => {
    let newImgUri = url.lastIndexOf('/');
    let imageName = url.substring(newImgUri);

    let dirs = RNFetchBlob.fs.dirs;
    let path =
      Platform.OS === 'ios'
        ? dirs.MainBundleDir + imageName
        : dirs.PictureDir + imageName;
    if (Platform.OS === 'android') {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image',
        },
      })
        .fetch('GET', url)
        .then((res) => {
          console.log(res, 'end downloaded');
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity activeOpacity={0.7} onLongPress={openModal}>
        <Image key={'openedImage'} source={{uri: url}} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default OpenImage;
