import { images } from '@/constants';
import { useCartStore } from '@/store/cart.store';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CardButton = () => {
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();
    
    return (
        <TouchableOpacity className='cart-btn' onPress={() => { }}>
            <Image
                source={images.bag}
                className='size-5'
                resizeMode='contain'
            />
            {
                totalItems > 0 && (
                    <View className='cart-badge'>
                        <Text className='small-bold text-white'>{totalItems}</Text>
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

export default CardButton