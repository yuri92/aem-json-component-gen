import * as fs from 'fs';
import * as path from 'path';
import { IComponent } from './models/interfaces/component.interface';
import { ComponentHtmlTemplate } from './models/templates/component-html.template';
import { ContentXmlTemplate } from './models/templates/content-xml.template';
import { cqEditConfigTemplate } from './models/templates/cq-edit-config.template';
import { DialogTemplate } from './models/templates/dialog.template';

const jsonPath = path.join(__dirname, '..', 'json', 'components.json');


const cmpToBuild: IComponent[] = JSON.parse(fs.readFileSync(jsonPath).toString()) as IComponent[];

cmpToBuild.forEach(component => {
    const componentFolder = path.join(__dirname, '..', 'json', component.name);
    fs.rmdirSync(componentFolder, {recursive : true})
    fs.mkdirSync(componentFolder);

    // creato .content.xml
    fs.writeFileSync(path.join(componentFolder, '.content.xml'), new ContentXmlTemplate(component).contentXml)

    // creato cq_editConfig.xml
    fs.writeFileSync(path.join(componentFolder, 'cq_editConfig.xml'), cqEditConfigTemplate);

    // creo la dialog
    const dialogFolder = path.join(componentFolder, '_cq_dialog')
    const dialogFile = path.join(dialogFolder, '.content.xml');

    fs.mkdirSync(dialogFolder);
    fs.writeFileSync(dialogFile, new DialogTemplate(component).xml)

    //creo il file html
    fs.writeFileSync(path.join(componentFolder, component.name + '.html'), new ComponentHtmlTemplate(component).xml);

});

