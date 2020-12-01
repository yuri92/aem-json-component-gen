export interface IComponent {
    name: string;
    title: string;
    componentGroup: string;
    dialog?: (ITab)[] | null;
  }
  export interface ITab {
    tabTitle: string;
    fields?: (IField)[] | null;
  }
  export interface IField {
    fieldLabel: string;
    name: string;
    textIsRich?: boolean;
    isCheckbox?: boolean;
    multifield : IField[];
  }
  