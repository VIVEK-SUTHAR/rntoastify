import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Toast, ToastProvider, useToast } from 'rn-toastify';
export default function App() {
  return (
    <ToastProvider>
      <View style={styles.container}>
        <Toast
          config={{
            animationType: 'slideIn',
            icon: { show: true },
          }}
        />
        <Example />
      </View>
    </ToastProvider>
  );
}

const Example = () => {
  const toast = useToast();
  return (
    <View>
      <View style={styles.my4}>
        <Button
          title="Show Success toast"
          onPress={() => {
            toast.success('Hello This is sample toast');
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
