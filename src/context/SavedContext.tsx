"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

interface SavedContextType {
  savedCollegeIds: string[];
  toggleSave: (id: string, name: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "campus_compare_saved";

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedCollegeIds, setSavedCollegeIds] = useState<string[]>([]);
  const { showToast } = useToast();

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedCollegeIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved colleges from localStorage:", e);
    }
  }, []);

  const saveToLocalStorage = (list: string[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Failed to save saved colleges to localStorage:", e);
    }
  };

  const toggleSave = (id: string, name: string) => {
    const isCurrentlySaved = savedCollegeIds.includes(id);
    let updated: string[];

    if (isCurrentlySaved) {
      updated = savedCollegeIds.filter((item) => item !== id);
      showToast(`Removed ${name} from saved list`, "info");
    } else {
      updated = [...savedCollegeIds, id];
      showToast(`✓ Saved ${name} successfully`, "success");
    }

    setSavedCollegeIds(updated);
    saveToLocalStorage(updated);
  };

  const isSaved = (id: string) => {
    return savedCollegeIds.includes(id);
  };

  return (
    <SavedContext.Provider value={{ savedCollegeIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
};
