// flow
import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {windowWidth} from '../Constaants';

interface Props {
  mal_id: number;
  image_url: string;
  index: number;
  onPress: (mal_id: number, index: number) => void;
}

export default ({mal_id, image_url, onPress, index}: Props) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => onPress(mal_id, index)}>
    <Image source={{uri: image_url, image_url}} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});
