import { IComponent } from "../interfaces/component.interface";

export class DialogTemplate {

    private component: IComponent;
    private tabs: string;

    constructor(component: IComponent) {
        this.tabs = '';
        this.component = component;
    }

    private generateFields() {
        // capire se la dialog è multitab o no
        

        this.component.dialog?.forEach((tab, index) => {
            index = index + 1;

            let tabFields = ''
            tab.fields?.forEach(field => {
                const tagName = field.name.split('/')[field.name.split('/').length - 1];
                
                if (field.textIsRich) {
                    tabFields += `
                                    <${tagName}
                                        sling:resourceType="cq/gui/components/authoring/dialog/richtext"
                                        jcr:primaryType="nt:unstructured"
                                        name="./${field.name}"
                                        fieldLabel="${field.fieldLabel}"
                                        useFixedInlineToolbar="{Boolean}true" />
                    `
                } else {
                    tabFields += `
                                    <${tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                        fieldLabel="${field.fieldLabel}"
                                        name="./${field.name}"/>`
                }
            })

            this.tabs += `
                    <tab${index}
                        jcr:primaryType="nt:unstructured"
                        jcr:title="${tab.tabTitle}"
                        sling:resourceType="granite/ui/components/coral/foundation/container"
                        margin="{Boolean}true">
                        <items jcr:primaryType="nt:unstructured">
                            <column
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/coral/foundation/container">
                                <items jcr:primaryType="nt:unstructured">
                                    ${tabFields}                                
                                </items>
                            </column>
                        </items>
                    </tab${index}>
            `
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
            <tabs
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/tabs"
                maximized="{Boolean}true">
                <items jcr:primaryType="nt:unstructured">
                    ${this.tabs}
                </items>
            </tabs>
        </items>
    </content>
</jcr:root>

        `
    }


}