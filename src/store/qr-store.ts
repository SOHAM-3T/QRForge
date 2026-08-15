import { create } from 'zustand';
import type {
  QRContentTypeId,
  QRContent,
  QRDesignConfig,
  QRLogoConfig,
  QRBrandingConfig,
} from '@/types/qr';
import { DEFAULT_DESIGN, DEFAULT_BRANDING, getDefaultContent } from '@/lib/constants';

// ─── History Entry (for undo/redo) ─────────────────────────────────

interface HistoryEntry {
  contentType: QRContentTypeId;
  content: QRContent;
  design: QRDesignConfig;
  logo: QRLogoConfig | null;
  branding: QRBrandingConfig;
}

// ─── Store State ──────────────────────────────────────────────────

interface QRStoreState {
  // Current state
  contentType: QRContentTypeId;
  content: QRContent;
  design: QRDesignConfig;
  logo: QRLogoConfig | null;
  branding: QRBrandingConfig;

  // History
  history: HistoryEntry[];
  historyIndex: number;

  // Dirty flag
  isDirty: boolean;
}

interface QRStoreActions {
  setContentType: (type: QRContentTypeId) => void;
  setContent: (content: QRContent) => void;
  updateContent: (partial: Partial<QRContent>) => void;
  setDesign: (design: QRDesignConfig) => void;
  updateDesign: (partial: Partial<QRDesignConfig>) => void;
  setLogo: (logo: QRLogoConfig | null) => void;
  updateLogo: (partial: Partial<QRLogoConfig>) => void;
  setBranding: (branding: QRBrandingConfig) => void;
  updateBranding: (partial: Partial<QRBrandingConfig>) => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  loadFromStorage: () => void;
}

type QRStore = QRStoreState & QRStoreActions;

const HISTORY_LIMIT = 50;
const STORAGE_KEY = 'qrforge-state';
const AUTOSAVE_DEBOUNCE = 1000;

let autosaveTimer: ReturnType<typeof setTimeout> | null = null;

function createSnapshot(state: QRStoreState): HistoryEntry {
  return {
    contentType: state.contentType,
    content: { ...state.content },
    design: { ...state.design },
    logo: state.logo ? { ...state.logo } : null,
    branding: { ...state.branding },
  };
}

function pushHistory(state: QRStoreState): Pick<QRStoreState, 'history' | 'historyIndex'> {
  const snapshot = createSnapshot(state);
  // Trim future entries when a new action happens after undo
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(snapshot);
  // Enforce limit
  if (newHistory.length > HISTORY_LIMIT) {
    newHistory.shift();
  }
  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
}

function scheduleAutosave(state: QRStoreState) {
  if (autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => {
    try {
      const data = {
        contentType: state.contentType,
        content: state.content,
        design: state.design,
        logo: state.logo,
        branding: state.branding,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage might be full or unavailable
    }
  }, AUTOSAVE_DEBOUNCE);
}

const initialContent = getDefaultContent('url') as QRContent;

export const useQRStore = create<QRStore>()((set, get) => ({
  // Initial state
  contentType: 'url',
  content: initialContent,
  design: { ...DEFAULT_DESIGN },
  logo: null,
  branding: { ...DEFAULT_BRANDING },
  history: [{ contentType: 'url', content: initialContent, design: { ...DEFAULT_DESIGN }, logo: null, branding: { ...DEFAULT_BRANDING } }],
  historyIndex: 0,
  isDirty: false,

  setContentType: (type) => {
    set((state) => {
      const newState = {
        ...state,
        contentType: type,
        content: getDefaultContent(type) as QRContent,
        isDirty: true,
        ...pushHistory({ ...state, contentType: type, content: getDefaultContent(type) as QRContent }),
      };
      scheduleAutosave(newState);
      return newState;
    });
  },

  setContent: (content) => {
    set((state) => {
      const newState = { ...state, content, isDirty: true, ...pushHistory({ ...state, content }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  updateContent: (partial) => {
    set((state) => {
      const content = { ...state.content, ...partial } as QRContent;
      const newState = { ...state, content, isDirty: true, ...pushHistory({ ...state, content }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  setDesign: (design) => {
    set((state) => {
      const newState = { ...state, design, isDirty: true, ...pushHistory({ ...state, design }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  updateDesign: (partial) => {
    set((state) => {
      const design = { ...state.design, ...partial };
      const newState = { ...state, design, isDirty: true, ...pushHistory({ ...state, design }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  setLogo: (logo) => {
    set((state) => {
      const newState = { ...state, logo, isDirty: true, ...pushHistory({ ...state, logo }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  updateLogo: (partial) => {
    set((state) => {
      if (!state.logo) return state;
      const logo = { ...state.logo, ...partial };
      const newState = { ...state, logo, isDirty: true, ...pushHistory({ ...state, logo }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  setBranding: (branding) => {
    set((state) => {
      const newState = { ...state, branding, isDirty: true, ...pushHistory({ ...state, branding }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  updateBranding: (partial) => {
    set((state) => {
      const branding = { ...state.branding, ...partial };
      const newState = { ...state, branding, isDirty: true, ...pushHistory({ ...state, branding }) };
      scheduleAutosave(newState);
      return newState;
    });
  },

  reset: () => {
    const fresh: QRStoreState = {
      contentType: 'url',
      content: getDefaultContent('url') as QRContent,
      design: { ...DEFAULT_DESIGN },
      logo: null,
      branding: { ...DEFAULT_BRANDING },
      history: [],
      historyIndex: -1,
      isDirty: false,
    };
    set({
      ...fresh,
      history: [createSnapshot(fresh)],
      historyIndex: 0,
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      const entry = state.history[newIndex];
      const newState = { ...state, ...entry, historyIndex: newIndex, isDirty: true };
      scheduleAutosave(newState);
      return newState;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      const entry = state.history[newIndex];
      const newState = { ...state, ...entry, historyIndex: newIndex, isDirty: true };
      scheduleAutosave(newState);
      return newState;
    });
  },

  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      set((state) => ({
        ...state,
        contentType: data.contentType || 'url',
        content: data.content || getDefaultContent('url'),
        design: { ...DEFAULT_DESIGN, ...data.design },
        logo: data.logo || null,
        branding: { ...DEFAULT_BRANDING, ...data.branding },
      }));
    } catch {
      // Corrupted data, ignore
    }
  },
}));
