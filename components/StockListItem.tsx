import { Text, View } from './Themed';
import { StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { MonoText } from './StyledText';
import { Link } from 'expo-router';

import { useMutation, gql } from '@apollo/client';

const mutation = gql`
    mutation MyMutation($symbol: String!, $user_id: String!) {
    insertFavorites(symbol: $symbol, user_id: $user_id) {
        id
        symbol
        user_id
    }
}`

type Stock = {
    name: string
    symbol: string
    close: string
    percent_change: string
}

type StockListItem = {
    stock: Stock
}

export default function StockListItem({ stock }: StockListItem) {
    const [insertFavorites] = useMutation(mutation, { variables: { symbol: stock.symbol, user_id: 'davidm' } })

    const change = Number.parseFloat(stock.percent_change)

    const onFavoritePressed = () => {
        insertFavorites()
    }

    return (
        <Link href={`/${stock.symbol}`} asChild>
            <Pressable style={styles.constainer}>
                {/*left side*/}
                <View style={{ flex: 1, gap: 5 }}>
                    <Text style={styles.symbol}>
                        {stock.symbol}{' '}
                        <AntDesign name="staro" size={18} color="black" onPress={onFavoritePressed} />
                    </Text>
                    <Text style={{ color: 'gray' }}>{stock.name}</Text>
                </View>

                {/*right side*/}
                <View>
                    <MonoText>{Number.parseFloat(stock.close).toFixed(1)}</MonoText>
                    <MonoText style={{ color: change > 0 ? 'green' : 'red' }}>{change > 0 ? '+' : ''}{change.toFixed(1)}%</MonoText>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
    },
    symbol: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.tint
    }
})