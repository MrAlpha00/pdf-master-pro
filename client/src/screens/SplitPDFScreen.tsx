import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, List, TextInput } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { splitPDF } from '../utils/api';
import { useStore } from '../store/useStore';

export const SplitPDFScreen = () => {
  const [file, setFile] = useState<any>(null);
  const [startPage, setStartPage] = useState('1');
  const [endPage, setEndPage] = useState('');
  const [loading, setLoading] = useState(false);
  const addRecentFile = useStore((state) => state.addRecentFile);

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.canceled === false && result.assets) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking PDF:', error);
      Alert.alert('Error', 'Failed to select PDF file');
    }
  };

  const splitPDFFile = async () => {
    if (!file) {
      Alert.alert('No File', 'Please select a PDF file first');
      return;
    }

    if (!startPage || !endPage) {
      Alert.alert('Invalid Range', 'Please enter start and end page numbers');
      return;
    }

    setLoading(true);
    try {
      const pageRanges = [[parseInt(startPage), parseInt(endPage)]];
      const result = await splitPDF(file, pageRanges);
      
      result.files?.forEach((outputFile: any) => {
        addRecentFile({
          id: Date.now().toString() + Math.random(),
          name: outputFile.file,
          uri: outputFile.url,
          size: 0,
          type: 'application/pdf',
          createdAt: new Date(),
          operation: 'Split PDF'
        });
      });

      Alert.alert('Success', 'PDF split successfully!', [
        { text: 'OK', onPress: () => { setFile(null); setStartPage('1'); setEndPage(''); } }
      ]);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      Alert.alert('Error', 'Failed to split PDF file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Split PDF</Text>
        <Text variant="bodyMedium">Extract pages from PDF</Text>
      </View>

      {file && (
        <View style={styles.fileInfo}>
          <List.Item
            title={file.name}
            description={`${(file.size / 1024).toFixed(2)} KB`}
            left={props => <List.Icon {...props} icon="file-pdf-box" />}
          />
        </View>
      )}

      <View style={styles.form}>
        <TextInput
          label="Start Page"
          value={startPage}
          onChangeText={setStartPage}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="End Page"
          value={endPage}
          onChangeText={setEndPage}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="file-upload"
          onPress={pickPDF}
          style={styles.button}
        >
          {file ? 'Choose Different PDF' : 'Select PDF'}
        </Button>

        {file && startPage && endPage && (
          <Button
            mode="contained"
            icon="call-split"
            onPress={splitPDFFile}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.splitButton]}
          >
            Split PDF
          </Button>
        )}
      </View>

      <View style={styles.info}>
        <Text variant="bodySmall" style={styles.infoText}>
          • Enter page range to extract from PDF
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Pages are numbered starting from 1
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Creates new PDF with selected pages
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
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 12,
  },
  actions: {
    padding: 20,
  },
  button: {
    marginBottom: 10,
  },
  splitButton: {
    backgroundColor: '#ff6f00',
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
