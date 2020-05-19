import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProgressReactNative from 'progress-react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ProgressReactNative preset={'circle'} showText={true} indeterminate={true} progress={40} duration={2000} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
