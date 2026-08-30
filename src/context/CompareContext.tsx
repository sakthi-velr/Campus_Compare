"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { College } from "@/types/college";
import { useToast } from "./ToastContext";

interface CompareContextType {
  compareColleges: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (id: string) => void;
  clearAllCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "campus_compare_colleges";

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareColleges, setCompareColleges] = useState<College[]>([]);
  const { showToast } = useToast();

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setCompareColleges(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load compare colleges from localStorage:", e);
    }
  }, []);

  const saveToLocalStorage = (list: College[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Failed to save compare colleges to localStorage:", e);
    }
  };

  const addToCompare = (college: College) => {
    // Check if already in list
    if (compareColleges.some((c) => c.id === college.id)) {
      showToast(`${college.name} is already in the comparison list.`, "info");
      return;
    }

    // Limit of 3
    if (compareColleges.length >= 3) {
      showToast("You can compare up to 3 colleges.", "error");
      return;
    }

    const updated = [...compareColleges, college];
    setCompareColleges(updated);
    saveToLocalStorage(updated);
    showToast(`✓ ${college.name} added to comparison`, "success");
  };

  const removeFromCompare = (id: string) => {
    const college = compareColleges.find((c) => c.id === id);
    const updated = compareColleges.filter((c) => c.id !== id);
    setCompareColleges(updated);
    saveToLocalStorage(updated);
    if (college) {
      showToast(`Removed ${college.name} from comparison`, "info");
    }
  };

  const clearAllCompare = () => {
    setCompareColleges([]);
    saveToLocalStorage([]);
    showToast("Cleared all selected colleges", "info");
  };

  const isInCompare = (id: string) => {
    return compareColleges.some((c) => c.id === id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareColleges,
        addToCompare,
        removeFromCompare,
        clearAllCompare,
        isInCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
