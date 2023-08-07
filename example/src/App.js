import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typecop } from 'react-native-type-cop';
const App = () => {
    const a = 10;
    return (React.createElement(React.Fragment, null,
        React.createElement(Typecop, null),
        React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "Hello World"))));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default App;
