import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, List } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mergePDFs } from '../utils/api';
import { useStore } from '../store/useStore';

export const MergePDFScreen = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const addRecentFile = useStore((state) => state.addRecentFile);

  const pickPDFs = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        multiple: true,
      });

      if (result.canceled === false && result.assets) {
        setFiles([...files, ...result.assets]);
      }
    } catch (error) {
      console.error('Error picking PDFs:', error);
      Alert.alert('Error', 'Failed to select PDF files');
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFFiles = async () => {
    if (files.length < 2) {
      Alert.alert('Not Enough Files', 'Please select at least 2 PDF files to merge');
      return;
    }

    setLoading(true);
    try {
      const result = await mergePDFs(files);
      
      addRecentFile({
        id: Date.now().toString(),
        name: result.file,
        uri: result.url,
        size: 0,
        type: 'application/pdf',
        createdAt: new Date(),
        operation: 'Merge PDF'
      });

      Alert.alert('Success', 'PDFs merged successfully!', [
        { text: 'OK', onPress: () => setFiles([]) }
      ]);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      Alert.alert('Error', 'Failed to merge PDF files');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Merge PDFs</Text>
        <Text variant="bodyMedium">Combine multiple PDF files into one</Text>
      </View>

      {files.length > 0 && (
        <ScrollView style={styles.fileList}>
          {files.map((file, index) => (
            <List.Item
              key={index}
              title={file.name}
              description={`${(file.size / 1024).toFixed(2)} KB`}
              left={props => <List.Icon {...props} icon="file-pdf-box" />}
              right={props => (
                <TouchableOpacity onPress={() => removeFile(index)}>
                  <List.Icon {...props} icon="delete" color="#f00" />
                </TouchableOpacity>
              )}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="file-plus"
          onPress={pickPDFs}
          style={styles.button}
        >
          {files.length === 0 ? 'Select PDFs' : 'Add More PDFs'}
        </Button>

        {files.length >= 2 && (
          <Button
            mode="contained"
            icon="merge"
            onPress={mergePDFFiles}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.mergeButton]}
          >
            Merge PDFs ({files.length} files)
          </Button>
        )}
      </View>

      <View style={styles.info}>
        <Text variant="bodySmall" style={styles.infoText}>
          • Select at least 2 PDF files to merge
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Files will be merged in the order selected
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • All pages from each file will be included
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
  fileList: {
    flex: 1,
  },
  actions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    marginBottom: 10,
  },
  mergeButton: {
    backgroundColor: '#03dac6',
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
