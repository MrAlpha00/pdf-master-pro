import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, List, RadioButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { rotatePDF } from '../utils/api';
import { useStore } from '../store/useStore';

export const RotatePDFScreen = () => {
  const [file, setFile] = useState<any>(null);
  const [rotation, setRotation] = useState('90');
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

  const rotatePDFFile = async () => {
    if (!file) {
      Alert.alert('No File', 'Please select a PDF file first');
      return;
    }

    setLoading(true);
    try {
      const result = await rotatePDF(file, parseInt(rotation));
      
      addRecentFile({
        id: Date.now().toString(),
        name: result.file,
        uri: result.url,
        size: 0,
        type: 'application/pdf',
        createdAt: new Date(),
        operation: 'Rotate PDF'
      });

      Alert.alert('Success', 'PDF rotated successfully!', [
        { text: 'OK', onPress: () => setFile(null) }
      ]);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      Alert.alert('Error', 'Failed to rotate PDF file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Rotate PDF</Text>
        <Text variant="bodyMedium">Rotate all pages in PDF</Text>
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
        <Text variant="titleMedium" style={styles.formTitle}>Rotation Angle</Text>
        <RadioButton.Group onValueChange={setRotation} value={rotation}>
          <RadioButton.Item label="90° Clockwise" value="90" />
          <RadioButton.Item label="180° (Upside Down)" value="180" />
          <RadioButton.Item label="270° Counter-Clockwise" value="270" />
        </RadioButton.Group>
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

        {file && (
          <Button
            mode="contained"
            icon="rotate-right"
            onPress={rotatePDFFile}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.rotateButton]}
          >
            Rotate PDF
          </Button>
        )}
      </View>

      <View style={styles.info}>
        <Text variant="bodySmall" style={styles.infoText}>
          • Rotates all pages in the PDF
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Choose rotation angle (90°, 180°, or 270°)
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Original file is not modified
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
  formTitle: {
    marginBottom: 12,
  },
  actions: {
    padding: 20,
  },
  button: {
    marginBottom: 10,
  },
  rotateButton: {
    backgroundColor: '#2196f3',
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
