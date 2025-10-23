import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface PlaceholderScreenProps {
  title: string;
  description: string;
  icon: string;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title, description, icon }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Icon name={icon} size={80} color="#6200ee" />
      <Text variant="headlineMedium" style={styles.title}>{title}</Text>
      <Text variant="bodyLarge" style={styles.description}>{description}</Text>
      <Text variant="bodyMedium" style={styles.comingSoon}>Coming Soon!</Text>
      <Text variant="bodySmall" style={styles.info}>
        This feature is planned for a future update. Stay tuned!
      </Text>
      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Go Back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  comingSoon: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  info: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 30,
  },
});
