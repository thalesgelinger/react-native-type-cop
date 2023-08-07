import React, { useEffect, useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const removeUnicode = (text: string) => {
  return text.replace(/\u001b\[\d{1,2}m/g, ' ');
};

export const Typecop = () => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to typecop');
    };

    ws.onmessage = (e) => {
      console.log('Received:');
      const message: string = e.data;
      const sanitizedMessage = removeUnicode(message);
      console.log({ sanitizedMessage });
      setErrors((prevErrors) => {
        if (prevErrors.at(-1) === '-') {
          // TODO: last line, think better
          return [sanitizedMessage];
        }
        if (
          sanitizedMessage.startsWith('[') ||
          sanitizedMessage.startsWith('c[')
        ) {
          return [...prevErrors, '-'];
        }
        return [...prevErrors, sanitizedMessage];
      });
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
              <Text style={styles.errorText}>{item}</Text>
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
});
