const fs = require('fs'),
    xml2js = require('xml2js');
var xml = new xml2js.Parser();

var maxroot;
xml.parseString(fs.readFileSync('phrs-fm.max'), function (err, data) {
    maxroot = data;
});

var objects = { };

console.log(`@startuml
skinparam nodesep 10
skinparam rectangle {
    backgroundColor<<PH>> 99ff99
    backgroundColor<<S>> d0ebbf
    backgroundColor<<RI>> e2c4a6
    backgroundColor<<TI>> ffa3a3
}`);

maxroot.model.relationships.forEach(relationships => {
    var relationships = relationships.relationship.filter(r => r.type == "Aggregation");
    relationships.forEach(relationship => {
        var sourceId = relationship.sourceId[0];
        if (sourceId != 6) {
            var include = true;
            var destId = relationship.destId[0];
            if (!objects[sourceId]) {
                var sourceObj = maxroot.model.objects[0].object.find(o => o.id == sourceId);
                // only Functions and Headers
                if (sourceObj.stereotype == "Function" || sourceObj.stereotype == "Header") {
                    var name = sourceObj.alias ? sourceObj.alias[0] : sourceObj.name[0];
                    var st = name.substring (0, name.indexOf('.'));
                    var link = name.indexOf('#')==-1?name:name.substring(0, name.indexOf('#'));
                    objects[sourceId] = sourceObj;
                    console.log("rectangle", `"[[Requirements-PHRSFMR2-${link}.html ${name}]]"`, `<<${st}>>`, "as", sourceId);
                }
                else {
                    include = false;
                }
            }
            if (!objects[destId]) {
                var destObj = maxroot.model.objects[0].object.find(o => o.id == destId);
                // only Functions and Headers
                if (destObj.stereotype == "Function" || destObj.stereotype == "Header") {
                    var name = destObj.alias[0] || destObj.name[0];
                    var st = name.substring (0, name.indexOf('.'));
                    var link = name.indexOf('#')==-1?name:name.substring(0, name.indexOf('#'));
                    objects[destId] = destObj;
                    console.log("rectangle", `"[[Requirements-PHRFMR2-${link}.html ${name}]]"`, `<<${st}>>`, "as", destId);
                }
                else {
                    include = false;
                }
            }
            if (include) {
                console.log(destId, "*--", sourceId);
            }
        }
    });
});

console.log("@enduml");