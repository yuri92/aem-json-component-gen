import { IComponent } from "../interfaces/component.interface";

export class ComponentHtmlTemplate {

    private component: IComponent;

    constructor(component: IComponent) {
        this.component = component;
    }

    get xml() {
        let xml = '';
        return xml;
    }


}