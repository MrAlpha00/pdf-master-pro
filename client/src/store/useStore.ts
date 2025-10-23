import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecentFile } from '../types';

interface AppState {
  recentFiles: RecentFile[];
  favorites: string[];
  isDarkMode: boolean;
  isOnline: boolean;
  addRecentFile: (file: RecentFile) => void;
  toggleFavorite: (fileId: string) => void;
  toggleDarkMode: () => void;
  setOnlineStatus: (status: boolean) => void;
  loadRecentFiles: () => Promise<void>;
  clearRecentFiles: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  recentFiles: [],
  favorites: [],
  isDarkMode: false,
  isOnline: true,

  addRecentFile: async (file: RecentFile) => {
    const recentFiles = [file, ...get().recentFiles.filter(f => f.id !== file.id)].slice(0, 20);
    set({ recentFiles });
    try {
      await AsyncStorage.setItem('recentFiles', JSON.stringify(recentFiles));
    } catch (error) {
      console.error('Error saving recent files:', error);
    }
  },

  toggleFavorite: async (fileId: string) => {
    const favorites = get().favorites.includes(fileId)
      ? get().favorites.filter(id => id !== fileId)
      : [...get().favorites, fileId];
    set({ favorites });
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  toggleDarkMode: async () => {
    const isDarkMode = !get().isDarkMode;
    set({ isDarkMode });
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Error saving dark mode:', error);
    }
  },

  setOnlineStatus: (status: boolean) => {
    set({ isOnline: status });
  },

  loadRecentFiles: async () => {
    try {
      const [recentFilesStr, favoritesStr, darkModeStr] = await Promise.all([
        AsyncStorage.getItem('recentFiles'),
        AsyncStorage.getItem('favorites'),
        AsyncStorage.getItem('darkMode'),
      ]);

      if (recentFilesStr) {
        set({ recentFiles: JSON.parse(recentFilesStr) });
      }
      if (favoritesStr) {
        set({ favorites: JSON.parse(favoritesStr) });
      }
      if (darkModeStr) {
        set({ isDarkMode: JSON.parse(darkModeStr) });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  },

  clearRecentFiles: async () => {
    set({ recentFiles: [] });
    try {
      await AsyncStorage.removeItem('recentFiles');
    } catch (error) {
      console.error('Error clearing recent files:', error);
    }
  },
}));
