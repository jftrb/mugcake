import React, { forwardRef, LegacyRef } from 'react'
import { Pressable, View, Image, StyleSheet, PressableProps, ImageSourcePropType, ImageStyle, ViewStyle } from 'react-native'
import { ThemedText } from './ThemedText'

type ImageButtonProps = PressableProps & {
  source: ImageSourcePropType
  imageStyle?: ImageStyle
}

export const ImageButton = forwardRef<LegacyRef<View>, ImageButtonProps>(function ImageButton(props, ref) {
  const {onPress, style, source, imageStyle} = props

  return (
    <Pressable style={[styles.touchable, style as ViewStyle]} onPress={onPress}>
      <View style={styles.view}>
        <ThemedText style={styles.text}>{''}</ThemedText>
      </View>
      <Image
        source={source}
        style={[styles.image, imageStyle]} 
        resizeMode='cover'/>
    </Pressable>
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