import { IComponent } from "../interfaces/component.interface";

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
        }

        return xml;
    }

//     "use strict";
// use(function () {
//     var nProperties = {
//         homepage : resource.getChild("homepage"),
//         barraSuperiore : resource.getChild("barraSuperiore"),
//         barraSuperioreSocial: resource.getChild("barraSuperiore/social/items").listChildren(),
//         barraInferioreSocial :resource.getChild("barraInferiore/social/items"),
//         logo : {
//             properties: resource.getChild("logo"),
//             internal : resource.getChild("logo/internal"),
//             internalDx : resource.getChild("logo/internalDx"),
//             homepage : resource.getChild("logo/homepage"),
//             homepageDx : resource.getChild("logo/homepageDx")
            
//         },
//         socialWall : resource.getChild("socialWall"),
//         isPathBoxInferioreSxInternal : function(){
//         	return resource.getResourceResolver().getResource( properties.pathBoxInferioreSx ) != null;
//         },
//         isPathBoxInferioreDxInternal : function(){
//         	return resource.getResourceResolver().getResource( properties.pathBoxInferioreDx  ) != null;
//         }
//     };    
    
    
//     return nProperties;
// });


}