import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { HomeScreen } from '../screens/HomeScreen';
import { ToolsScreen } from '../screens/ToolsScreen';
import { RecentScreen } from '../screens/RecentScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CameraCaptureScreen } from '../screens/CameraCaptureScreen';
import { ImageToPDFScreen } from '../screens/ImageToPDFScreen';
import { MergePDFScreen } from '../screens/MergePDFScreen';
import { SplitPDFScreen } from '../screens/SplitPDFScreen';
import { RotatePDFScreen } from '../screens/RotatePDFScreen';
import { CompressPDFScreen } from '../screens/CompressPDFScreen';
import { ProtectPDFScreen } from '../screens/ProtectPDFScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={ToolsScreen}
        options={{
          tabBarLabel: 'Tools',
          tabBarIcon: ({ color, size }) => (
            <Icon name="tools" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CameraCapture" 
        component={CameraCaptureScreen}
        options={{ title: 'Camera Capture' }}
      />
      <Stack.Screen 
        name="ImageToPDF" 
        component={ImageToPDFScreen}
        options={{ title: 'Images to PDF' }}
      />
      <Stack.Screen 
        name="MergePDF" 
        component={MergePDFScreen}
        options={{ title: 'Merge PDFs' }}
      />
      <Stack.Screen 
        name="SplitPDF" 
        component={SplitPDFScreen}
        options={{ title: 'Split PDF' }}
      />
      <Stack.Screen 
        name="RotatePDF" 
        component={RotatePDFScreen}
        options={{ title: 'Rotate PDF' }}
      />
      <Stack.Screen 
        name="CompressPDF" 
        component={CompressPDFScreen}
        options={{ title: 'Compress PDF' }}
      />
      <Stack.Screen 
        name="ProtectPDF" 
        component={ProtectPDFScreen}
        options={{ title: 'Protect PDF' }}
      />
      <Stack.Screen 
        name="UnlockPDF"
        options={{ title: 'Unlock PDF' }}
      >
        {() => <PlaceholderScreen title="Unlock PDF" description="Remove password from PDF" icon="lock-open" />}
      </Stack.Screen>
      <Stack.Screen 
        name="WatermarkPDF"
        options={{ title: 'Add Watermark' }}
      >
        {() => <PlaceholderScreen title="Add Watermark" description="Add text watermark to PDF" icon="water-drop" />}
      </Stack.Screen>
      <Stack.Screen 
        name="PageNumbersPDF"
        options={{ title: 'Add Page Numbers' }}
      >
        {() => <PlaceholderScreen title="Add Page Numbers" description="Number pages in PDF" icon="format-list-numbered" />}
      </Stack.Screen>
      <Stack.Screen 
        name="PDFToImage"
        options={{ title: 'PDF to Images' }}
      >
        {() => <PlaceholderScreen title="PDF to Images" description="Convert PDF pages to images" icon="image-multiple" />}
      </Stack.Screen>
      <Stack.Screen 
        name="SignaturePDF"
        options={{ title: 'Sign PDF' }}
      >
        {() => <PlaceholderScreen title="Sign PDF" description="Add signature to PDF" icon="draw" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
