import { randomString } from "../../constants";
import { IField } from "../interfaces/component.interface";

export class FieldProcessor {

    private field: IField;
    private tagName: string;

    private _xml!: string;

    constructor(field: IField) {
        this.field = field;
        this.tagName = field.name.split('/')[field.name.split('/').length - 1];
        
        if (field.textIsRich) {
            this.processRichText();

        } else if(field.isCheckbox) {
            this.processCheckbox();

        } else if (field.multifield) {
            this.processMultifield();

        } else if (field.isPathField) {
            this.processPathField();

        } else if (field.isTextArea) {
            this.processTextArea();

        } else {
            this.processTextField();
        }
    }

    get xml() {
        return this._xml;
    }

    private processCheckbox(): void {
        this._xml = `
                                    <${this.tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/checkbox"
                                        text="${this.field.fieldLabel}"
                                        name="./${this.field.name}"
                                        value="true"
                                        uncheckedValue="false"/>`
    }

    private processTextField(): void {
        if(this.field.fieldDescription){
            this._xml =  `
                                    <${this.tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                        fieldLabel="${this.field.fieldLabel}"
                                        fieldDescription="${this.field.fieldDescription}"
                                        name="./${this.field.name}"/>`

        } else {

            this._xml =  `
                                    <${this.tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
                                        fieldLabel="${this.field.fieldLabel}"
                                        name="./${this.field.name}"/>`
        }
    }

    private processTextArea(): void {
        if(this.field.fieldDescription){
            this._xml =  `
                                    <${this.tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/textarea"
                                        fieldLabel="${this.field.fieldLabel}"
                                        fieldDescription="${this.field.fieldDescription}"
                                        name="./${this.field.name}"/>`

        } else {

            this._xml =  `
                                    <${this.tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/textarea"
                                        fieldLabel="${this.field.fieldLabel}"
                                        name="./${this.field.name}"/>`
        }
    }

    private processPathField(): void {
        if(this.field.fieldDescription){
            this._xml =  `
                                    <${this.tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/pathfield"
                                        rootPath="/content/dam"
                                        fieldLabel="${this.field.fieldLabel}"
                                        fieldDescription="${this.field.fieldDescription}"
                                        name="./${this.field.name}"/>`

        } else {

            this._xml =  `
                                    <${this.tagName}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/pathfield"
                                        rootPath="/content/dam"
                                        fieldLabel="${this.field.fieldLabel}"
                                        name="./${this.field.name}"/>`
        }
    }

    private processRichText(): void {
        this._xml =  `
                                    <${this.tagName}
                                        sling:resourceType="cq/gui/components/authoring/dialog/richtext"
                                        jcr:primaryType="nt:unstructured"
                                        name="./${this.field.name}"
                                        fieldLabel="${this.field.fieldLabel}"
                                        useFixedInlineToolbar="{Boolean}true" />`
    }

    private processMultifield(): void {
        let multifieldComponents = '';
        this.field.multifield.forEach(multifieldField => {
            multifieldComponents += new FieldProcessor(multifieldField).xml
        })

        const multifieldTagName = `multifieldcollection${randomString(5,'A#')}`;

        this._xml =  `
                                    <${multifieldTagName}
                                        jcr:primaryType="nt:unstructured"
                                        fieldLabel="${this.field.fieldLabel}"
                                        composite="{Boolean}true"
                                        sling:resourceType="granite/ui/components/coral/foundation/form/multifield">
                                        <field
                                            sling:resourceType="granite/ui/components/coral/foundation/container"
                                            name="./${this.field.name}"
                                            jcr:primaryType="nt:unstructured">
                                            <items jcr:primaryType="nt:unstructured">
                                                ${multifieldComponents}
                                            </items>
                                        </field>
                                    </${multifieldTagName}>`
    }

}
