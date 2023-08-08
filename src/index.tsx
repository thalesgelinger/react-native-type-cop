import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { StatusBar } from 'react-native';
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
      <StatusBar barStyle={'light-content'} />
      <View style={styles.errorHeader}>
        <Text style={styles.errorHeaderText}>Type Error</Text>
      </View>
      <FlatList
        data={errors}
        style={styles.errorContainer}
        renderItem={({ item }) => {
          return (
            <View style={styles.errorContent}>
              <Text style={styles.errorMessage}>{item.message}</Text>
              <View style={styles.lineHint}>
                <Text style={styles.errorText}>{item.line}</Text>
                <Text style={styles.errorText}>{item.hint}</Text>
              </View>
            </View>
          );
        }}
      />
      <Pressable onPress={() => setErrors([])} style={styles.dismissButton}>
        <Text style={styles.dismissText}>DISMISS</Text>
      </Pressable>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#7C1030',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorHeader: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  errorHeaderText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  errorContainer: {
    flex: 1,
    marginHorizontal: 16,
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#3F3F3F',
  },
  errorContent: {
    marginVertical: 16,
  },
  errorMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FFFFFF',
  },
  lineHint: {
    backgroundColor: '#2D2D2D',
    padding: 2,
    marginHorizontal: 32,
    marginTop: 8,
  },
  dismissButton: {
    backgroundColor: '#2D2D2D',
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingTop: 16,
  },
  dismissText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
