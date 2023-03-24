import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiStiker from './components/EmojiStiker';


export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
    else {
      alert('You did not selete and image')
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
    // setSelectedImage(null)
   };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = () => { };

  const onModalClose = () => {
    setIsModalVisible(false);
  };


  const PlaceholderImage = require('./assets/images/background-image.png')
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer PlaceholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji !==null ? <EmojiStiker imageSize={40} stikerSource={pickedEmoji}/>:null  }
      </View>


      {showAppOptions ?

        (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton label="Reset" icon="refresh" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton label="Save" icon="save-alt" onPress={onSaveImageAsync} />

            </View>


          </View>
        )
        :
        (
          <View style={styles.footerContainer}>
            <Button theme="primary" label='Choose a photo' onPress={pickImageAsync} />
            <Button label='Use this photo' onPress={() => { setShowAppOptions(true) }} />
          </View>
        )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
        <EmojiList onSelect={setPickedEmoji} onCloseModal={ onModalClose }/>
      </EmojiPicker>
      <StatusBar style="auto" />
    </View >
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
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row"
  },

});
