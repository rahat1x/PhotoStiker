import { Image, StyleSheet } from 'react-native'
import React from 'react'

const ImageViewer = ({PlaceholderImageSource}) => {
  return (
    <Image source={PlaceholderImageSource} style={styles.image} />
  )
}

export default ImageViewer

const styles = StyleSheet.create({
    image:{
        width:320,
        height:440,
        borderRadius:17
      }
})