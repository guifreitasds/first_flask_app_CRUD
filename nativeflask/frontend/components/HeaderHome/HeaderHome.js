import { StyleSheet, Text, View } from 'react-native';

export default function HeaderHome() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flask Application</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  title: {
    letterSpacing: 2,
    fontSize: 32,
  }
});
