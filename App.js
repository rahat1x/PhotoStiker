import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';

export default function App() {
  const PlaceholderImage = require('./assets/images/background-image.png')
  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageViewer PlaceholderImageSource={PlaceholderImage}/>
    </View>
    <View style={styles.footerContainer}>
      <Button theme="primary" label='Choose a photo' />
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
  imageContainer:{
    flex:1,
    paddingTop:50
  },
  footerContainer:{
    flex: 1/3,
    alignItems:'center'
  }

});
