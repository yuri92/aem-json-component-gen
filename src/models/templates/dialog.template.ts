import { IComponent, IDialog } from "../interfaces/component.interface";

export class DialogTemplate {

    private component: IComponent;
    private fields: string;

    constructor(component: IComponent) {
        this.fields = '';
        this.component = component;
    }

    private generateFields() {
        
        this.component.dialog?.forEach(label => {
            this.fields += `
                    <${label.name}
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                        fieldLabel="${label.fieldLabel}"
                        name="./${label.name}"/>`
        })
    }

    get xml() {
        this.generateFields();
        return `
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:granite="http://www.adobe.com/jcr/granite/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="${this.component.title}"
    sling:resourceType="cq/gui/components/authoring/dialog">
    <content
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/container">
        <items jcr:primaryType="nt:unstructured">
            <content
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/container">
                <items jcr:primaryType="nt:unstructured">
                    ${this.fields}
                </items>
            </content>
        </items>
    </content>
</jcr:root>
        `
    }


}