import React, { forwardRef, LegacyRef } from 'react'
import { TouchableOpacity, View, Image, StyleSheet, TouchableOpacityProps, Pressable } from 'react-native'
import { ThemedText } from './ThemedText'

export const ImageButton = forwardRef<LegacyRef<TouchableOpacity>, TouchableOpacityProps>(function ImageButton(props, ref) {
  const {onPress} = props

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <View style={styles.view}>
        <ThemedText style={styles.text}>{''}</ThemedText>
      </View>
      <Image
        source={require('@/assets/images/search-icon.png')}
        style={[styles.image]} 
        resizeMode='cover'/>
    </TouchableOpacity>
  )
})

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
    backgroundColor: 'white'
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