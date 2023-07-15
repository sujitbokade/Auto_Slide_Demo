import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Carousel from './src/component/Carousel';

const App = () => {
  return (
    <View>
      <SafeAreaView>
        <Carousel />
      </SafeAreaView>
    </View>
  );
};

export default App;
