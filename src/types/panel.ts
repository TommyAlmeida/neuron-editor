export type PanelPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'floating';

export interface PanelConfig {
  id: string;
  title: string;
  position: PanelPosition;
  isCollapsed?: boolean;
  isFloating?: boolean;
  size?: { width?: number; height?: number };
  order?: number;
}