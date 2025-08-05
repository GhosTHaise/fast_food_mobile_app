import seed from '@/lib/seed'
import React from 'react'
import { Button, Text, View } from 'react-native'

const Search = () => {
  return (
    <View>
      <Text>Search</Text>
      <Button title='Seed' onPress={() => seed().catch(error => console.log(error))} />
    </View>
  )
}

export default Search