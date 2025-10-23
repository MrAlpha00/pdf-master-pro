import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, List, TextInput } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { protectPDF } from '../utils/api';
import { useStore } from '../store/useStore';

export const ProtectPDFScreen = () => {
  const [file, setFile] = useState<any>(null);
  const [password, setPassword] = useState('');
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

  const protectPDFFile = async () => {
    if (!file) {
      Alert.alert('No File', 'Please select a PDF file first');
      return;
    }

    if (!password || password.length < 4) {
      Alert.alert('Invalid Password', 'Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    try {
      const result = await protectPDF(file, password);
      
      addRecentFile({
        id: Date.now().toString(),
        name: result.file,
        uri: result.url,
        size: 0,
        type: 'application/pdf',
        createdAt: new Date(),
        operation: 'Protect PDF'
      });

      Alert.alert('Success', 'PDF protected with password successfully!', [
        { text: 'OK', onPress: () => { setFile(null); setPassword(''); } }
      ]);
    } catch (error) {
      console.error('Error protecting PDF:', error);
      Alert.alert('Error', 'Failed to protect PDF file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Protect PDF</Text>
        <Text variant="bodyMedium">Add password protection to PDF</Text>
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
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          placeholder="Enter a strong password"
          style={styles.input}
        />
        <Text variant="bodySmall" style={styles.hint}>
          Password must be at least 4 characters long
        </Text>
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

        {file && password && (
          <Button
            mode="contained"
            icon="lock"
            onPress={protectPDFFile}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.protectButton]}
          >
            Protect PDF
          </Button>
        )}
      </View>

      <View style={styles.info}>
        <Text variant="bodySmall" style={styles.infoText}>
          • Protects PDF with password encryption
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • PDF will require password to open
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Remember to save your password securely
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
    marginBottom: 8,
  },
  hint: {
    color: '#666',
    marginBottom: 16,
  },
  actions: {
    padding: 20,
  },
  button: {
    marginBottom: 10,
  },
  protectButton: {
    backgroundColor: '#d32f2f',
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
