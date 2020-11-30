export interface IComponent {
    name: string;
    title: string;
    componentGroup: string;
    dialog?: (IDialog)[] | null;
  }
  export interface IDialog {
    fieldLabel: string;
    name: string;
  }
  