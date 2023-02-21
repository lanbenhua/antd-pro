export type IExtendableField = {
  name: string;
  text: string;
  label: React.ReactNode;
  fixed?: boolean;
  priority?: number;
  children?: React.ReactNode;
  node: React.ReactElement;
  onClose?: (field: IExtendableField) => void;
  onAdd?: (field: IExtendableField) => void;
};

export type IExtendableContainerContextValue = {
  value?: string[];
  isOpen?: (name: string) => boolean | undefined;
  onDrop: (name: string) => void;
  onOpen?: (name?: string) => void;
};
