import { create } from 'zustand';
import type { QRTemplate } from '@/types/qr';
import { BUILT_IN_TEMPLATES } from '@/lib/templates';

const STORAGE_KEY = 'qrforge-user-templates';

interface TemplateStoreState {
  builtInTemplates: QRTemplate[];
  userTemplates: QRTemplate[];
}

interface TemplateStoreActions {
  addUserTemplate: (template: QRTemplate) => void;
  removeUserTemplate: (id: string) => void;
  loadFromStorage: () => void;
  getAllTemplates: () => QRTemplate[];
}

type TemplateStore = TemplateStoreState & TemplateStoreActions;

function saveToStorage(templates: QRTemplate[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch {
    // localStorage might be full or unavailable
  }
}

export const useTemplateStore = create<TemplateStore>()((set, get) => ({
  builtInTemplates: BUILT_IN_TEMPLATES,
  userTemplates: [],

  addUserTemplate: (template) => {
    set((state) => {
      const updated = [...state.userTemplates, template];
      saveToStorage(updated);
      return { userTemplates: updated };
    });
  },

  removeUserTemplate: (id) => {
    set((state) => {
      const updated = state.userTemplates.filter((t) => t.id !== id);
      saveToStorage(updated);
      return { userTemplates: updated };
    });
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const templates = JSON.parse(raw) as QRTemplate[];
        set({ userTemplates: templates });
      }
    } catch {
      // Corrupted data
    }
  },

  getAllTemplates: () => {
    const state = get();
    return [...state.builtInTemplates, ...state.userTemplates];
  },
}));
