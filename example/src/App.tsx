import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typecop } from 'react-native-type-cop';

const App: React.FC = () => {
  const a: string = 10;
  return (
    <>
      <Typecop />
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
