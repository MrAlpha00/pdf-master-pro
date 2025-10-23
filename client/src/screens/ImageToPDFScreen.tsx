import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { imagesToPDF } from '../utils/api';
import { useStore } from '../store/useStore';

export const ImageToPDFScreen = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const addRecentFile = useStore((state) => state.addRecentFile);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant permission to access photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      setImages([...images, ...result.assets]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const convertToPDF = async () => {
    if (images.length === 0) {
      Alert.alert('No Images', 'Please select at least one image');
      return;
    }

    setLoading(true);
    try {
      const imageFiles = images.map((img, index) => ({
        uri: img.uri,
        name: `image-${index}.jpg`,
      }));

      const result = await imagesToPDF(imageFiles);
      
      addRecentFile({
        id: Date.now().toString(),
        name: result.file,
        uri: result.url,
        size: 0,
        type: 'application/pdf',
        createdAt: new Date(),
        operation: 'Images to PDF'
      });

      Alert.alert('Success', 'PDF created successfully!', [
        { text: 'OK', onPress: () => setImages([]) }
      ]);
    } catch (error) {
      console.error('Error converting to PDF:', error);
      Alert.alert('Error', 'Failed to convert images to PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Images to PDF</Text>
        <Text variant="bodyMedium">Upload images and create a PDF document</Text>
      </View>

      {images.length > 0 && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageGrid}>
            {images.map((img, index) => (
              <View key={index} style={styles.imagePreview}>
                <Image source={{ uri: img.uri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <Icon name="close-circle" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="image-plus"
          onPress={pickImages}
          style={styles.button}
        >
          {images.length === 0 ? 'Select Images' : 'Add More Images'}
        </Button>

        {images.length > 0 && (
          <Button
            mode="contained"
            icon="file-pdf-box"
            onPress={convertToPDF}
            loading={loading}
            disabled={loading}
            style={[styles.button, styles.convertButton]}
          >
            Convert to PDF ({images.length} images)
          </Button>
        )}
      </View>

      <View style={styles.info}>
        <Text variant="bodySmall" style={styles.infoText}>
          • Select one or more images from gallery
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Images will be combined into a single PDF
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Each image becomes one page in the PDF
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
  scrollView: {
    flex: 1,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  imagePreview: {
    width: '31%',
    aspectRatio: 0.75,
    margin: '1%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff0000',
    borderRadius: 12,
  },
  actions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    marginBottom: 10,
  },
  convertButton: {
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
