import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated,
{
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);


const EmojiStiker = ({ imageSize, stikerSource }) => {

  const scaleImage = useSharedValue(imageSize);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDrag = useAnimatedGestureHandler({

    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },

    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },


  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY : translateY.value,
        },
      ],
    }
  })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  });


  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
    
        if (scaleImage.value) {
          scaleImage.value = scaleImage.value * 2;
        }
      

    },
  })


  return (
    <PanGestureHandler onGestureEvent={onDrag}>

      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>

          <AnimatedImage
            source={stikerSource}
            resizeMode='contain'
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  )
}

export default EmojiStiker

const styles = StyleSheet.create({})