import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmojiStiker = ({imageSize, stikerSource}) => {
  return (
    <View style={{top:-350}}>
        <Image
            source={stikerSource}
            resizeMode='contain'
            style={{width:imageSize,  height:imageSize}}
        />
    </View>
  )
}

export default EmojiStiker

const styles = StyleSheet.create({})