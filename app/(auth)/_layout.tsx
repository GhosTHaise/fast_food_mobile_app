import { images } from '@/constants'
import { Slot } from 'expo-router'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

export default function AuthLayout() {
  const isIos = Platform.OS === 'ios'
  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : "height"}>
      <ScrollView
        className='bg-white h-full'
        keyboardShouldPersistTaps='handled'
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className='size-full rounded-b-lg'
            resizeMode='stretch'
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16 z-10"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}