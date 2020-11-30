import * as fs from 'fs';
import * as path from 'path';
import { IComponent } from './models/interfaces/component.interface';
import { ContentXmlTemplate } from './models/templates/content-xml.template';

const jsonPath = path.join(__dirname, '..', 'json', 'components.json');


const cmpToBuild: IComponent[] = JSON.parse(fs.readFileSync(jsonPath).toString()) as IComponent[];

cmpToBuild.forEach(component => {
    const componentFolder = path.join(__dirname, '..', 'json', component.name);
    fs.rmdirSync(componentFolder, {recursive : true})
    fs.mkdirSync(componentFolder);

    // creato .content.xml
    fs.writeFileSync(path.join(componentFolder, '.content.xml'), new ContentXmlTemplate(component).contentXml)

    

});

