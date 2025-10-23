import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getAllCategories } from '../utils/pdfTools';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const categories = getAllCategories();

  const quickActions = [
    { id: 'camera', title: 'Capture & Convert', route: 'CameraCapture', icon: 'camera', color: '#6200ee' },
    { id: 'image', title: 'Images to PDF', route: 'ImageToPDF', icon: 'image-multiple', color: '#03dac6' },
    { id: 'merge', title: 'Merge PDFs', route: 'MergePDF', icon: 'merge-type', color: '#ff6f00' },
    { id: 'compress', title: 'Compress PDF', route: 'CompressPDF', icon: 'compress', color: '#00bfa5' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>PDF Master Pro</Title>
        <Paragraph style={styles.headerSubtitle}>All-in-One PDF Tools</Paragraph>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
              onPress={() => navigation.navigate(action.route)}
            >
              <Icon name={action.icon} size={32} color="#fff" />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Tools</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Tools', { category: category.id })}
            >
              <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Icon name={category.icon} size={36} color="#6200ee" />
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
});
