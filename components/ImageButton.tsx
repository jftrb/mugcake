import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'

export default class ImageButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.touchable}>
        <View style={styles.view}>
          <ThemedText style={styles.text}>{''}</ThemedText>
        </View>
        <Image
          source={require('@/assets/images/icon.png')}
          style={[styles.image]} 
          resizeMode='cover'/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: 32,
    height: 0,
    borderRadius: 16,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  }
})