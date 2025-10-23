import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { pdfTools } from '../utils/pdfTools';
import { ToolCard } from '../components/ToolCard';

export const ToolsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const category = route.params?.category;

  const filteredTools = category 
    ? pdfTools.filter(tool => tool.category === category)
    : pdfTools;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.toolsGrid}>
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onPress={() => navigation.navigate(tool.route)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
});
