// @flow

import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {windowWidth} from '../Constaants';

const ITEM_WIDTH = 127;

const styles = StyleSheet.create({
  root: {
    marginTop: 30,
    width: windowWidth,
  },
  container: {
    height: 130,
    paddingLeft: 20,
  },
  itemWrap: {
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    width: ITEM_WIDTH,
    height: 115,
  },
  gradient: {
    paddingLeft: 24,
    width: ITEM_WIDTH,
    height: 115,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#534',
  },
  iconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 7,
    backgroundColor: 'rgba(51, 51, 51, 0.13)',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const data = [
  {
    title: 'Добавить\nдоход',
    icon: 'plus',
    value: 0,
    actionPath: 'SelfEmployment/Income',
    colors: ['#FF9A8C', '#FFD2B1'],
  },
  {
    TODO: '>>>заменить иконку',
    title: 'Выставить\nсчёт',
    icon: 'debt',
    value: 1,
    actionPath: 'SelfEmployment/Bill',
    colors: ['#FFAD61', '#FFE86F'],
  },
  {
    title: 'Источники\nдохода',
    icon: 'requisites',
    value: 2,
    actionPath: 'SelfEmployment/SourcesIncome',
    colors: ['#83C5FF', '#A5E7FF'],
  },
  {
    title: 'Справки\nи выписки',
    icon: 'reference',
    value: 3,
    actionPath: 'SelfEmployment/Documents',
    colors: ['#C4BAFF', '#E7CEFF'],
  },
  {
    title: 'Настройки\nрежима',
    icon: 'filter',
    value: 4,
    actionPath: 'SelfEmployment/Settings',
    colors: ['#C1C2DC', '#D9DDEE'],
  },
];

export default function NavigationSlider() {
  const onPress = (actionPath) => () => {};

  return (
    <ScrollView
      horizontal
      style={styles.root}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={ITEM_WIDTH + 15}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {data.map((item) => {
        const {colors, actionPath, icon, title} = item;

        return (
          <TouchableOpacity
            key={item.value}
            onPress={onPress(actionPath)}
            style={styles.itemWrap}
            activeOpacity={0.8}>
            <View style={styles.gradient} colors={colors}>
              <View style={styles.iconWrap}>

              </View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
