// lib/selectStyles.ts
import { StylesConfig, GroupBase, Theme as RSTheme, CSSObjectWithLabel, ControlProps, OptionProps } from 'react-select';

// -------------------------
// Theme functions
// -------------------------
export const selectTheme = (theme: RSTheme): RSTheme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#7670D6',
    primary75: '#9da0dc',
    primary50: '#d3d2ea',
    primary25: '#f8f3ed',
    danger: '#ef4444',
    dangerLight: '#fee2e2',
    neutral0: '#ffffff',
    neutral5: '#f9fafb',
    neutral10: '#f3f4f6',
    neutral20: '#e5e7eb',
    neutral30: '#d1d5db',
    neutral40: '#9ca3af',
    neutral50: '#6b7280',
    neutral60: '#4b5563',
    neutral70: '#374151',
    neutral80: '#1f2937',
    neutral90: '#111827',
  },
});

export const darkSelectTheme = (theme: RSTheme): RSTheme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#7670D6',
    primary75: '#9da0dc',
    primary50: '#d3d2ea',
    primary25: '#4c4875',
    danger: '#ef4444',
    dangerLight: '#7f1d1d',
    neutral0: '#1f2937',
    neutral5: '#111827',
    neutral10: '#0f172a',
    neutral20: '#1e293b',
    neutral30: '#334155',
    neutral40: '#64748b',
    neutral50: '#94a3b8',
    neutral60: '#cbd5e1',
    neutral70: '#e2e8f0',
    neutral80: '#f1f5f9',
    neutral90: '#f8fafc',
  },
});

// -------------------------
// Option type
// -------------------------
interface OptionType {
  label: string;
  value: string;
}

// -------------------------
// Light theme styles
// -------------------------
export const selectStylesOverride: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (base: CSSObjectWithLabel, state: ControlProps<OptionType, false>) => ({
    ...base,
    minHeight: '40px',
    height: '40px',
    borderRadius: '4px',
    borderColor: state.isFocused ? '#7670D6' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(118, 112, 214, 0.1)' : 'none',
    backgroundColor: '#ffffff',
    color: '#171717',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#7670D6',
    },
  }),

  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#171717',
    fontSize: '14px',
    margin: 0,
    padding: 0,
  }),

  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#171717',
    margin: 0,
    padding: 0,
  }),

  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#6b7280',
    opacity: 1,
  }),

  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: 9999,
  }),

  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '4px 0',
    backgroundColor: '#ffffff',
  }),

  option: (base: CSSObjectWithLabel, state: OptionProps<OptionType, false>) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#7670D6'
      : state.isFocused
      ? '#f3f4f6'
      : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#171717',
    cursor: 'pointer',
    padding: '8px 12px',
    transition: 'all 0.15s ease',
    '&:active': {
      backgroundColor: state.isSelected ? '#7670D6' : '#e5e7eb',
    },
  }),

  noOptionsMessage: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#6b7280',
    backgroundColor: '#ffffff',
  }),

  loadingMessage: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#6b7280',
    backgroundColor: '#ffffff',
  }),
};

// -------------------------
// Dark theme styles
// -------------------------
export const darkSelectStylesOverride: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (base: CSSObjectWithLabel, state: ControlProps<OptionType, false>) => ({
    ...base,
    minHeight: '40px',
    height: '40px',
    borderRadius: '4px',
    borderColor: state.isFocused ? '#9da0dc' : '#374151',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(157, 160, 220, 0.1)' : 'none',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#9da0dc',
    },
  }),

  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#ffffff',
    fontSize: '14px',
    margin: 0,
    padding: 0,
  }),

  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#ffffff',
    margin: 0,
    padding: 0,
  }),

  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#6b7280',
    opacity: 1,
  }),

  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: '#1f2937',
    borderColor: '#374151',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
  }),

  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '4px 0',
    backgroundColor: '#1f2937',
  }),

  option: (base: CSSObjectWithLabel, state: OptionProps<OptionType, false>) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#7670D6'
      : state.isFocused
      ? '#374151'
      : '#1f2937',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '8px 12px',
    transition: 'all 0.15s ease',
    '&:active': {
      backgroundColor: state.isSelected ? '#7670D6' : '#4b5563',
    },
  }),

  noOptionsMessage: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#9ca3af',
    backgroundColor: '#1f2937',
  }),

  loadingMessage: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#9ca3af',
    backgroundColor: '#1f2937',
  }),
};
