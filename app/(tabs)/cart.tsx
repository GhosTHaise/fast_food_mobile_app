import CustomHeader from '@/components/custom-heaader'
import { useCartStore } from '@/store/cart.store'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalProce = getTotalPrice();

  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={items}
        renderItem={({item}) => <Text>Cart Item</Text> }
        keyExtractor={(item) => item.id}
        contentContainerClassName='pb-28 px-5 pt-5'
        ListHeaderComponent={() => <CustomHeader title='Your Cart' />}
        ListEmptyComponent={() => <Text>No Items in Cart</Text>}
        ListFooterComponent={() => totalItems > 0 && (
          <View className='gap-5'>
            <View className='mt-6 border border-gray-200 p-5 rounded-2xl'>
              <Text className='h3-bold text-dark-100 mb-5'>
                Payment Summary
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Cart