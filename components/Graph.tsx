import Colors from '@/constants/Colors'
import { View, Text } from './Themed'
import { GraphPoint, LineGraph } from 'react-native-graph'
import timeseries from '@/assets/data/timeseries.json'
import { MonoText } from './StyledText'
import { useState } from 'react'
import { point } from '@shopify/react-native-skia'

const Graph = () => {
    const points: GraphPoint[] = timeseries.values.map((point) => ({
        date: new Date(point.datetime),
        value: Number
            .parseFloat(point.close),
    }))

    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(points[points.length - 1])

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