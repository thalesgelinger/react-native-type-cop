import React, { useEffect, useState } from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export const Debugger = () => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('Debugger');
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to server');
    };

    ws.onmessage = (e) => {
      console.log('Received:');
      const message: string = e.data;
      if (message.startsWith('ERROR')) {
        console.log({ message });
        setError(new Error(message));
      } else {
        setError(null);
      }
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log('Connection to server closed');
      console.log(e.code, e.reason);
    };
    return () => {
      ws.close();
    };
  }, []);

  return error ? (
    <SafeAreaView style={styles.error}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
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
});
