import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return Constants.expoConfig?.hostUri
        ? `http://${Constants.expoConfig.hostUri.split(':')[0]}:5000/api`
        : 'http://10.0.2.2:5000/api';
    }
    
    if (Platform.OS === 'ios') {
      return Constants.expoConfig?.hostUri
        ? `http://${Constants.expoConfig.hostUri.split(':')[0]}:5000/api`
        : 'http://localhost:5000/api';
    }
    
    return 'http://localhost:5000/api';
  }
  
  return 'https://your-production-url.com/api';
};

export const API_URL = getApiUrl();

export const getFileUrl = (relativePath: string) => {
  const baseUrl = API_URL.replace('/api', '');
  return `${baseUrl}${relativePath}`;
};
