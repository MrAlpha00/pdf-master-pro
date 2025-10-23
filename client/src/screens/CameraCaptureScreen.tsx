import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Sharing from 'expo-sharing';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { imagesToPDF } from '../utils/api';
import { useStore } from '../store/useStore';

export const CameraCaptureScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [images, setImages] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);
  const addRecentFile = useStore((state) => state.addRecentFile);

  if (!permission) {
    return <View style={styles.container}><ActivityIndicator /></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Icon name="camera-off" size={64} color="#999" />
        <Text style={styles.permissionText}>Camera permission required</Text>
        <Button mode="contained" onPress={requestPermission}>
          Grant Permission
        </Button>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 1200 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );

        setImages([...images, manipulatedImage.uri]);
        setShowCamera(false);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture image');
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const convertToPDF = async () => {
    if (images.length === 0) {
      Alert.alert('No Images', 'Please capture at least one image');
      return;
    }

    setLoading(true);
    try {
      const imageFiles = images.map((uri, index) => ({
        uri,
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
        operation: 'Camera Capture'
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

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={cameraRef} facing="back">
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowCamera(false)}>
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <View style={{ width: 50 }} />
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Capture & Convert to PDF</Text>
        <Text variant="bodyMedium">Take photos and create a PDF document</Text>
      </View>

      {images.length > 0 && (
        <ScrollView horizontal style={styles.imagePreviewContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imagePreview}>
              <Image source={{ uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Icon name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="camera"
          onPress={() => setShowCamera(true)}
          style={styles.button}
        >
          {images.length === 0 ? 'Start Capturing' : 'Add More'}
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
          • Tap "Start Capturing" to open camera
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Take multiple photos for multi-page PDF
        </Text>
        <Text variant="bodySmall" style={styles.infoText}>
          • Images are automatically optimized
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
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  cancelButton: {
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imagePreviewContainer: {
    maxHeight: 150,
    padding: 10,
  },
  imagePreview: {
    marginRight: 10,
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 130,
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
