import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CopyrightFooter: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>© Created by Ibra Decode with BaturChat Team</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
    opacity: 0.4,
    textAlign: 'center',
  },
});

export default CopyrightFooter;