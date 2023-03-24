import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiStiker from './components/EmojiStiker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';



export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staus, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
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

  const onSaveImageAsync = async () => { 
    try {
      const localUri = await captureRef(imageRef,{
        height:440,
        quality:1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved")
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  if (staus === null) {
    requestPermission();
  }


  const PlaceholderImage = require('./assets/images/background-image.png')
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>

          <ImageViewer PlaceholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji !== null ? <EmojiStiker imageSize={40} stikerSource={pickedEmoji} /> : null}

        </View>
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
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView >
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
