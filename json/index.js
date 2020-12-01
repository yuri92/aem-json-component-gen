const fs = require('fs');

const components = JSON.parse(fs.readFileSync('./components.json'));

const getDefault = fieldLabel => {
    const regex = /(["'])(?:(?=(\\?))\2.)*?\1/gm;
    const str = fieldLabel;
    let m = regex.exec(str)

    if(m && m.length > 0) {
        const label = m[0];
        return label.substring(1, label.length - 1)
    }

    // while ((m = regex.exec(str)) !== null) {
    //     // This is necessary to avoid infinite loops with zero-width matches
    //     if (m.index === regex.lastIndex) {
    //         regex.lastIndex++;
    //     }
        
    //     // The result can be accessed through the `m`-variable.
    //     m.forEach((match, groupIndex) => {
    //         console.log(`Found match, group ${groupIndex}: ${match}`);
    //     });
    // }
}

components.forEach(component => {
    component.dialog.forEach(tabs => {
        tabs.fields.forEach(tab => {
            const defaultValue = getDefault(tab.fieldLabel);
            if(defaultValue) 
                tab.default = defaultValue;
        })
    })
});

// fs.writeFileSync('./componentsNew.json', JSON.stringify(components, undefined, 4))