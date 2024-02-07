import Colors from '@/constants/Colors'
import { View, Text } from './Themed'
import { GraphPoint, LineGraph } from 'react-native-graph'
import timeseries from '@/assets/data/timeseries.json'
import { MonoText } from './StyledText'
import { useState } from 'react'
import { point } from '@shopify/react-native-skia'
import { useQuery, gql } from '@apollo/client'
import { ActivityIndicator } from 'react-native'

const query = gql`
    query MyQuery($interval: String!, $symbol: String!) {
    time_series(symbol: $symbol, interval: $interval) {
        values {
        close
        datetime
        }
    }
}`

const Graph = ({ symbol }: { symbol: string }) => {
    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>()

    const { data, loading, error } = useQuery(query, { variables: { symbol, interval: '1day' } })

    if (loading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Error</Text>
    }

    const points: GraphPoint[] = data.time_series.values.map((value) => ({
        date: new Date(value.datetime),
        value: Number
            .parseFloat(value.close),
    }))


    const onPointSelected = (point: GraphPoint) => {
        setSelectedPoint(point)
    }

    return (
        <View>
            <MonoText style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>
                ${selectedPoint?.value.toFixed(1)}
            </MonoText>
            <Text style={{ color: 'gray' }}>{selectedPoint?.date.toDateString()}</Text>

            <LineGraph
                points={points}
                animated={true}
                color="#017560"
                style={{ height: 300, width: '100%' }}
                gradientFillColors={["#0175605D", '#7476df00']}
                enablePanGesture
                onPointSelected={onPointSelected}
                enableIndicator
                indicatorPulsating
                enableFadeInMask />
        </View>
    )
}

export default Graph