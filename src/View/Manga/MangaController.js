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
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import type {AnimeImage} from '../../Type/Model';
import {BlurView} from '@react-native-community/blur';
import {Grey} from '../../Styles/Color';
import {NavigateContext} from '../../App';
import {windowWidth} from '../../Constaants';

const MangaController = () => {
  const [animeList, setAnimeList] = useState([]);
  const {view, navigateTo, bundle, putInBundle} = useContext(NavigateContext);
  const {id, title} = bundle;

  useEffect(() => {
    fetch(`https://api.jikan.moe/v3/anime/${id}/pictures`)
      .then((res) => res.json())
      .then(handleAnime);
  }, [id]);

  const handleAnime = (response: {pictures: AnimeImage[]}) => {
    setAnimeList(response.pictures);
  };

  const openImageView = (url: string) => {
    putInBundle({...bundle, url});
    navigateTo('OpenImage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
      {(animeList && animeList.length > 0) && (
        <Image
          key={'blurryImage'}
          source={{uri: animeList[0].large}}
          style={styles.absolute}
        />
      )}
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <ScrollView style={styles.lists} contentContainerStyle={styles.listInner}>
        {(animeList && animeList.length > 0) &&
          animeList.map((anim, index) => (
            <TouchableOpacity onPress={() => openImageView(anim.large)}>
              <Image
                source={{uri: anim.large}}
                style={styles.image}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Grey,
  },
  lists: {
    width: '100%',
  },
  listInner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  image: {
    width: windowWidth - 40,
    height: windowWidth / 2,
    resizeMode: 'cover',
    marginTop: 20,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  navBar: {
    width: '100%',
    height: 60,
    shadowColor: '#000',
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingLeft: 10,
    opacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});

export default MangaController;
