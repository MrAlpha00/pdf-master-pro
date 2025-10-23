import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, List, ProgressBar } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { compressPDF } from '../utils/api';
import { useStore } from '../store/useStore';

export const CompressPDFScreen = () => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const addRecentFile = useStore((state) => state.addRecentFile);

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.canceled === false && result.assets) {
        setFile(result.assets[0]);
        setResult(null);
      }
    } catch (error) {
      console.error('Error picking PDF:', error);
      Alert.alert('Error', 'Failed to select PDF file');
    }
  };

  const compressPDFFile = async () => {
    if (!file) {
      Alert.alert('No File', 'Please select a PDF file first');
      return;
    }

    setLoading(true);
    try {
      const compressResult = await compressPDF(file);
      setResult(compressResult);
      
      addRecentFile({
        id: Date.now().toString(),
        name: compressResult.file,
        uri: compressResult.url,
        size: compressResult.compressedSize,
        type: 'application/pdf',
        createdAt: new Date(),
        operation: 'Compress PDF'
      });

      Alert.alert('Success', `PDF compressed by ${compressResult.reduction}!`);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      Alert.alert('Error', 'Failed to compress PDF file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Compress PDF</Text>
        <Text variant="bodyMedium">Reduce PDF file size</Text>
      </View>

      {file && (
        <View style={styles.fileInfo}>
          <List.Item
            title={file.name}
            description={`Original size: ${(file.size / 1024).toFixed(2)} KB`}
            left={props => <List.Icon {...props} icon="file-pdf-box" />}
          />
        </View>
      )}

      {result && (
        <View style={styles.resultContainer}>
          <Text variant="titleMedium" style={styles.resultTitle}>Compression Result</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text variant="labelSmall">Original Size</Text>
              <Text variant="titleMedium">{(result.originalSize / 1024).toFixed(2)} KB</Text>
            </View>
            <View style={styles.statBox}>
              <Text variant="labelSmall">Compressed Size</Text>
              <Text variant="titleMedium">{(result.compressedSize / 1024).toFixed(2)} KB</Text>
            </View>
          </View>
          <View style={styles.reductionBox}>
            <Text variant="labelSmall">Size Reduction</Text>
            <Text variant="headlineMedium" style={styles.reductionText}>{result.reduction}</Text>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="file-upload"
          onPress={pickPDF}
          style={styles.button}
        >
          {file ? 'Choose Different PDF' : 'Select PDF'}
        </Button>

        {file && (
          <Button
            mode="contained"
            icon="compress"
            onPress={compressPDFFile}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.compressButton]}
          >
            Compress PDF
          </Button>
        )}
      </View>

      <View style={styles.info}>
        <Text variant="bodySmall" style={styles.infoText}>
          • Reduces PDF file size for easier sharing
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Optimizes images and removes unnecessary data
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Quality is preserved for readability
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  fileInfo: {
    marginTop: 10,
  },
  resultContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
  },
  resultTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  reductionBox: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#c8e6c9',
  },
  reductionText: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  actions: {
    padding: 20,
  },
  button: {
    marginBottom: 10,
  },
  compressButton: {
    backgroundColor: '#00bfa5',
  },
  info: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  infoText: {
    color: '#666',
    marginBottom: 5,
  },
});
