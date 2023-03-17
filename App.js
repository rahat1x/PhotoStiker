import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';

export default function App() {
  const PlaceholderImage = require('./assets/images/background-image.png')
  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageViewer PlaceholderImageSource={PlaceholderImage}/>

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

});
