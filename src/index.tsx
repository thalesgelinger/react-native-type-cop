import React, { useEffect, useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type TypecopError = {
  message: string;
  line: string;
  hint: string;
};

export const Typecop = () => {
  const [errors, setErrors] = useState<TypecopError[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to typecop');
    };

    ws.onmessage = (e) => {
      const newErrors = JSON.parse(e.data);
      setErrors(newErrors);
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log('Connection to typecop closed');
      console.log(e.code, e.reason);
    };
    return () => {
      ws.close();
    };
  }, []);

  return errors.length ? (
    <SafeAreaView style={styles.error}>
      <FlatList
        data={errors}
        style={styles.errorContainer}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.errorText}>{item.message}</Text>
              <View style={styles.lineHint}>
                <Text style={styles.errorText}>{item.line}</Text>
                <Text style={styles.errorText}>{item.hint}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'black',
  },
  lineHint: {
    backgroundColor: 'gray',
  },
});
