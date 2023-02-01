import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const CustomAlarm = ({adata}) => {
  // const [chartData, setChartData] = useState({
  //   labels: ['', '', '', '', '', '', ''],
  //   datasets: [
  //     {
  //       data: [1, 2, 3, 0, 0, 0, 0],
  //     },
  //   ],
  // });

  const chartData = {
    labels: adata.length > 0 ? adata.map(item => item.day_entry) : [''],
    datasets: [
      {
        data:
          adata.length > 0 ? adata.map(item => Number(item.hours_entry)) : [0],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#010119d9',
    backgroundGradientFrom: '#010119d9',
    backgroundGradientTo: '#010119d9',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#010119d9',
    },
  };
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          color: 'white',
          paddingVertical: 8,
        }}>
        Sleeping Health
      </Text>
      <View
        style={{
          alignItems: 'center',
        }}>
        <LineChart
          data={chartData}
          width={screenWidth}
          height={350}
          chartConfig={chartConfig}
          verticalLabelRotation={70}
          yAxisInterval={1}
          xAxisLabel="day"
          bezier
        />
      </View>
    </View>
  );
};

export default CustomAlarm;

const styles = StyleSheet.create({});
