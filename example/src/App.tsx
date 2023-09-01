import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Toast, ToastProvider, ToastType, useToast } from 'rn-toastify';
export default function App() {
  return (
    <ToastProvider>
      <View style={styles.container}>
        <Toast
          config={{
            animationType: 'spring',
            position: 'top',
            icon: {
              show: true,
            },
          }}
        />
        <Example />
        <Test />
      </View>
    </ToastProvider>
  );
}

const Test = () => {
  console.log('Rerender');
  return <Text>Hello</Text>;
};

const Example = () => {
  const toast = useToast();
  return (
    <View>
      <View style={styles.my4}>
        <Button
          title="Show Success toast"
          onPress={() => {
            toast.success('Hello This is sample toast', { position: 'bottom' });
          }}
        />
      </View>
      <View style={styles.my4}>
        <Button
          title="Show Error"
          onPress={() => {
            toast.error('Hello This is Error toast');
          }}
        />
      </View>
      <View style={styles.my4}>
        <Button
          title="Show INfo Toast"
          onPress={() => {
            toast.info('Hello This is Info toast');
          }}
        />
      </View>
      <View style={styles.my4}>
        <Button
          title="Show Twitter Toast"
          onPress={() => {
            toast.twitter(
              'Hello This is Twitter Varient Toast',
              'Here Goes Subtitle',
              ToastType.ERROR
            );
          }}
        />
      </View>
      <View style={styles.my4}>
        <Button
          title="Show Discord Varint Toast"
          onPress={() => {
            toast.discord('Hello This is Discord Toast', 'I am subtitle');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  my4: {
    marginVertical: 4,
  },
});
