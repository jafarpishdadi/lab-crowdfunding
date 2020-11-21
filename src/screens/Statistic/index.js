import React, { useState } from 'react'
import { StyleSheet, Text, View, processColor } from 'react-native'
import { BarChart } from 'react-native-charts-wrapper'
import Colors from '../../styles/Colors'


const Statistic = ({ navigation }) => {

  const [legend, setLegend] = useState({
    enabled: false,
    textSize: 14,
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5,
  })

  const [chart, setChart] = useState({
    data: {
      dataSets: [{
        values: [ { y: 100}, { y: 60 }, { y: 90 }, { y: 45 }, { y: 67 }, { y: 32 }, { y: 150 }, { y: 70 }, { y: 40 }, { y: 89 }, ],
        label: '',
        config: {
          colors: [processColor(Colors.blue)],
          stackLabels: [],
          drawFilled: false,
          drawValues: false,
        }
      }]
    }
  })

  const [xAxis, setXAxis] = useState({
    valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    position: 'BOTTOM',
    drawAxisLine: true,
    drawGridLines: false,
    axisMinimum: -0.5,
    granularityEnabled: true,
    granularity: 1,
    axisMaximum: new Date().getMonth() + 0.5,
    spaceBetweenLabels: 0,
    labelRotationAngle: -45,
    limitLines: [{ limit: 115, lineColor: processColor(Colors.red), lineWidth: 1 }]

  })

  const [yAxis, setYAxis] = useState({
    left: {
      axisMinimum: 0,
      labelCountForce: true,
      granularity: 5,
      granularityEnabled: true,
      drawGridLines: false,
    },
    right: {
      axisMinimum: 0,
      labelCountForce: true,
      granularity: 5,
      granularityEnabled: true,
      enabled: false,
    }
  })


  return (
    <View style={{ flex: 1 }}>
      <BarChart 
        style={{ flex: 1 }}
        data={chart.data}
        yAxis={yAxis}
        xAxis={xAxis}
        chartDescription={{ text: '' }}
        legend={legend}
        doubleTapToZoomEnabled={false}
        pinchZoom={false}
        marker={{
          enabled: true,
          markerColor: 'grey',
          textColor: 'white',
          textSize: 14
        }}
      />
    </View>
  )
}

export default Statistic

const styles = StyleSheet.create({})
