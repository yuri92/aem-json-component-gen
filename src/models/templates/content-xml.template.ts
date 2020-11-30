import { IComponent } from "../interfaces/component.interface";

export class ContentXmlTemplate {

    private component: IComponent;

    constructor(component: IComponent) {
        this.component = component;
    }

    get contentXml(): string {
        return `
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="${this.component.title}"
    componentGroup="${this.component.componentGroup}"/>
        `
    }

}