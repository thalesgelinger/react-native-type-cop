import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
export const Typecop = () => {
    const [errors, setErrors] = useState([]);
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
    return errors.length ? (React.createElement(SafeAreaView, { style: styles.error },
        React.createElement(FlatList, { data: errors, style: styles.errorContainer, renderItem: ({ item }) => {
                return (React.createElement(View, null,
                    React.createElement(Text, { style: styles.errorText }, item.message),
                    React.createElement(View, { style: styles.lineHint },
                        React.createElement(Text, { style: styles.errorText }, item.line),
                        React.createElement(Text, { style: styles.errorText }, item.hint))));
            } }))) : null;
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
