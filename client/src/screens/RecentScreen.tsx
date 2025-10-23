import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Button } from 'react-native-paper';
import { useStore } from '../store/useStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const RecentScreen = () => {
  const { recentFiles, clearRecentFiles } = useStore();

  if (recentFiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="history" size={64} color="#999" />
        <Text style={styles.emptyText}>No recent files</Text>
        <Text style={styles.emptySubtext}>Your processed files will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        {recentFiles.map((file) => (
          <List.Item
            key={file.id}
            title={file.name}
            description={`${file.operation} - ${new Date(file.createdAt).toLocaleDateString()}`}
            left={props => <List.Icon {...props} icon="file-pdf-box" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button mode="outlined" onPress={clearRecentFiles}>
          Clear All
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  list: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
