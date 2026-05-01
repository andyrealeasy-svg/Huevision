export const TABS = {
  HUB: 'hub',
  LINEUP: 'lineup',
  AUDIO: 'audio',
  FORM: 'form'
} as const;

export type TabKey = typeof TABS[keyof typeof TABS];
