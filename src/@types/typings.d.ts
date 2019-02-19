/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

export interface DropdownItem {
  label: string;
  value: string | number;
}
