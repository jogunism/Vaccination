import { RootState } from '@/redux/reducers';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View } from 'react-native'
import { useSelector } from 'react-redux';
import {
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel
} from 'victory-native'

interface MainChartProps {
}

export const MainChart: React.FC<MainChartProps> = () => {

  const { barChartTitles, barChartData } = useSelector((state: RootState) => state.main);
  const width = 370;
  const height = 500;

  /* -----------------------------------------------
   * Methods
   */
  // const dataB = dataA.map((point) => {
  //   const y = Math.round(point.y + 3 * (Math.random() - 0.5));
  //   return { ...point, y };
  // });

  /* -----------------------------------------------
   * Hooks
   */
  // useEffect(() => {
  //   console.log(barChartData);
  //   console.log(barChartTitles);
  // }, [barChartData])


  /* -----------------------------------------------
   * Render
   */
  const chart = () => {
    if (!barChartData || Object.keys(barChartData).length < 1) {
      return (
        <View style={ styles.loading }>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
        <VictoryChart
          horizontal
          height={ height }
          width={ width }
          padding={{ top: 10, right: 60, bottom: 100, left: 30 }}
        >
          <VictoryStack
            style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
          >
            <VictoryBar
              style={{ data: { fill: "#FFC600" } }}
              data={ barChartData }
              y={ (data) => (100 - data.z) }
              labels={ ({ datum }) => ( datum.z === 0 ? '' : `${ datum.z }%` ) }
            />
            <VictoryBar
              style={{ data: { fill: "orange" } }}
              data={ barChartData }
              y={ (data) => data.y }
              labels={ ({ datum }) => ( `${ datum.y }%` ) }
            />
          </VictoryStack>

          <VictoryAxis
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { 
                fontSize: 13,
                fill: '#000000'
              }
            }}
            tickLabelComponent={
              <VictoryLabel
                x={ 40 }
                textAnchor='start'
              />
            }
            tickValues={ barChartData.map((point) => point.y) }
          />
        </VictoryChart>
    );
  };

  return chart();
};

const styles = StyleSheet.create({
  loading: {
    padding: 50,
    height: 200
  }
});
