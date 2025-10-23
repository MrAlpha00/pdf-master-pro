import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PDFTool } from '../types';

interface ToolCardProps {
  tool: PDFTool;
  onPress: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Icon name={tool.icon} size={40} color="#6200ee" />
          <Title style={styles.title}>{tool.title}</Title>
          <Paragraph style={styles.description}>{tool.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    minWidth: '45%',
    maxWidth: '48%',
  },
  card: {
    elevation: 4,
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
});
