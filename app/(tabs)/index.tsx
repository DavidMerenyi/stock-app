import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Stack } from 'expo-router';
import top5 from '@/assets/data/top5.json';
import StockListItem from '@/components/StockListItem';

import { gql, useQuery } from '@apollo/client';

const query = gql`
  query MyQuery($symbol: String) {
    quotes(symbol: $symbol) {
      value {
        name
        symbol
        close
        percent_change
      }
    }
}
`

export default function TabOneScreen() {
  const { data, loading, error } = useQuery(query, { variables: { symbol: 'AAPL,IBM,META,NVDA,TSLA,AMD' } })

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch stocks</Text>
  }

  const stocks = data.quotes.map(q => q.value)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Stocks' }} />
      <FlatList
        data={stocks}
        renderItem={({ item }) => (
          <StockListItem stock={item} />
        )}
        contentContainerStyle={{ gap: 20, padding: 10 }}
        keyExtractor={item => item.symbol} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
