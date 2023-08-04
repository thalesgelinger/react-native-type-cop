import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Debugger } from 'react-native-type-cop';

const App: React.FC = () => {
  return (
    <>
      <Debugger />
      <View style={styles.container}>
        <Text>Hello World</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
