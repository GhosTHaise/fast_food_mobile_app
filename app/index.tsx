import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
   <SafeAreaView>
      <FlatList
      data={["a", "b", "c", "d" , "h"]}
      renderItem={({ item }) => <Text>{item}</Text>}
      />
   </SafeAreaView>
  );
}
