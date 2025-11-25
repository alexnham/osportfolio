export type AppProps = {
  title: string;
  icon: string;
  onClick: () => void;
};

export type Theme = 'light' | 'dark';

export interface Command {
  name: string;
  description: string;
  execute: () => void;
}

export interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface IconProps {
  name: string;
  onClick: () => void;
}