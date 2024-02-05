import { View, Text } from '@/components/Themed'
import { Stack, useLocalSearchParams } from 'expo-router'
import top5 from '@/assets/data/top5.json'
import StockListItem from '@/components/StockListItem'
import Graph from '@/components/Graph'

const StockDetails = () => {
    const { symbol } = useLocalSearchParams()

    const stock = top5[symbol]

    if (!stock) {
        return <Text>Stock with symbol {symbol} not found</Text>
    }

    return (
        <View>
            <Stack.Screen options={{ title: stock.name, headerBackTitleVisible: false }} />
            <StockListItem stock={stock} />
            <Graph />
        </View>
    )
}

export default StockDetails