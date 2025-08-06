import { getCategories, getMenu } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  const { category, query } = useLocalSearchParams<{ query: string, category: string }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6
    }
  })

  const { data: categories } = useAppwrite({
    fn: getCategories,
    skip: true
  })

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query])

  console.log(data)

  return (
    <SafeAreaView className='bg-white h-full'>

    </SafeAreaView>
  )
}

export default Search