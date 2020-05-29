/**
 * @flow
 */

import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Animated,
  FlatList,
} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import type {Anime} from '../../Type/Model';
import NavigationSlider from '../../Conponent/NavigationSlider';
import {windowWidth} from '../../Constaants';
import Card from '../../Conponent/Card';
import {NavigateContext} from '../../App';

const HEADER_EXPANDED_HEIGHT = 170;
const HEADER_COLLAPSED_HEIGHT = 0;

const TopController = () => {
  const [y, setY] = useState(new Animated.Value(0));
  const [topAnimeList, setTopAnimeList] = useState([]);
  const {view, navigateTo, bundle, putInBundle} = useContext(NavigateContext);

  useEffect(() => {
    if (topAnimeList.length === 0) {
      fetch('https://api.jikan.moe/v3/top/anime/1/upcoming')
        .then((res) => res.json())
        .then(handleTop);
    }
  }, []);

  const handleTop = (response: {top: Anime[]}) => {
    setTopAnimeList(response.top);
  };

  const openManga = (mal_id: number, index) => {
    putInBundle({id: mal_id, title: topAnimeList[index].title});
    navigateTo('Manga');
  };

  const renderBody = () => (
    <>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={2}
        reducedTransparencyFallbackColor="white"
      />
      <Animated.View
        style={[
          {
            height: y.interpolate({
              inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
              outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
              extrapolate: 'clamp',
              useNativeDriver: true,
            }),
          },
          styles.header,
        ]}>
        <NavigationSlider />
      </Animated.View>
      {topAnimeList.length > 0 && (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listInner}
          data={topAnimeList}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: y}}}], {
            useNativeDriver: false,
          })}
          renderItem={({item, index}) => (
            <Card
              onPress={openManga}
              image_url={item.image_url}
              mal_id={item.mal_id}
              index={index}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {topAnimeList.length > 0 && (
        <Image
          key={'blurryImage'}
          source={{uri: topAnimeList[0].image_url}}
          style={styles.absolute}
        />
      )}
      {renderBody()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#123',
  },
  image: {
    width: '100%',
    height: windowWidth / 3,
    resizeMode: 'cover',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 15,
    shadowColor: '#000',
    marginHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  list: {paddingTop: HEADER_EXPANDED_HEIGHT},
  header: {
    width: windowWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  listInner: {
    paddingBottom: 300,
  },
});

export default TopController;
