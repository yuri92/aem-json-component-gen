import { IComponent } from "../interfaces/component.interface";
import * as fs from 'fs';
import * as path from 'path';

export class ComponentHtmlTemplate {

    private component: IComponent;
    private complexFields: Set<String> = new Set<String>();

    constructor(component: IComponent) {
        this.component = component;
        this.setComplexFields();
    }

    /**
     * Se la dialog è complessa, verrà utilizzata la classe js di appoggio
     */
    setComplexFields(): void {
        this.component.dialog?.forEach(tab => {
            tab.fields?.forEach(field => {
                if(field.name.includes('/')) {
                    this.complexFields.add(field.name);
                }
            })
        })
    }

    get xml() {
        let xml = '';

        if (this.complexFields.size === 0) {
            this.component.dialog?.forEach(tab => {
                tab.fields?.forEach(field => {
                    xml += `\${properties.${field.name}} - ${field.fieldLabel}\n`
                })
            })
        } else {
            //console.log(this.component.name, 'Componente complesso')
            // componente complesso, devo creare un js di appoggio
            const componentJs = path.join(__dirname, '..', '..', '..', 'json', 'generated', this.component.name, 'component.js');
            fs.writeFileSync(componentJs, this.getComponentJs());

            // il .html del file deve includere il component.js
            return this.getHtmlComplexContent();

        }

        return xml;
    }

    private getComponentJs(): string {
        let obj: any = {};
        // console.log(this.component.title)
        this.component.dialog?.forEach(tab => {
            // console.log('\t' + tab.tabTitle)
            tab.fields?.forEach(field => {
                if (field.multifield) {
                    console.log('Multifield, approccio diverso')
                }

                if (field.name.includes('/')) {                    
                    // console.log('\t\t' + field.name)   
                    let flattenField = field.name.replace(/\//ig, '.');
                    flattenField = flattenField.substring(0, flattenField.lastIndexOf('.'))
                    
                    obj[flattenField] = `resource.getChild('${field.name.substring(0, field.name.lastIndexOf('/'))}')`;
                    obj = this.unflatten(obj)           
                }
            })
        })

        let finalJsonString = JSON.stringify(obj, undefined, 4);
        finalJsonString = finalJsonString.replace(/"resource./ig, 'resource.')
        finalJsonString = finalJsonString.replace(/'\)"/ig, "')")
        return `    
"use strict";
use(function () {
    var nProperties = ${finalJsonString};    
    return nProperties;
});`        
    }

    private getHtmlComplexContent(): string {
        let labels = '';
        this.component.dialog?.forEach(tab => {
            tab.fields?.forEach(field => {
                if (field.name.includes('/')) {
                    labels += `\${nProperties.${field.name.replace(/\//ig, '.')}} - ${field.fieldLabel}\n`

                } else {
                    labels += `\${properties.${field.name}}\n`
                }
            })
        })
        return `
<sly data-sly-use.nProperties="component.js"/>

${labels}
        `
    }

    private unflatten(data: any): any {
        if (Object(data) !== data || Array.isArray(data)) {
        return data;
        }
        const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
        const resultholder: any = {};
        // tslint:disable-next-line:forin
        for (const p in data) {
        let cur: any = resultholder;
        let prop = '';
        let m;
        // tslint:disable-next-line:no-conditional-assignment
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
        }
        return resultholder[''] || resultholder;
    }


}