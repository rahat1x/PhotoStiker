import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
    else {
      alert('You did not selete and image')
    }
  }

  const PlaceholderImage = require('./assets/images/background-image.png')
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer PlaceholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label='Choose a photo' onPress={pickImageAsync} />
        <Button label='Use this photo' />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252346',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  }

});
