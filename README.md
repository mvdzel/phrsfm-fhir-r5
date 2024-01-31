Output snapshot: https://vdzel.home.xs4all.nl/phrfm-fhir-r5/

## TODO
* make the max file a parameter
* make the fmid a parameter and use also in template for links! or remove??
* figure out correct canonical
* get title from max file
* Why it the title of each Artifact page starting with "Example"??

## Running the scipt and IG publisher

# Convert script
```
> docker run --name=phrsfm-fhir-r5 -it -v "$(pwd)":/app node:lts-buster /bin/bash
@> cd script
@> (once) npm init
@> (once) dpkg -i jdk-21_linux-x64_bin.deb
@> (once) apt update; apt install graphviz jekyll
@> node max2fhir.js > output.txt
@> node max2plantuml.js > ../input/images-source/relationships.plantuml 
```

Update groupings and resources from output.txt in phrs-ig.json

# To build IG
```
(optional)> curl -L https://github.com/HL7/fhir-ig-publisher/releases/latest/download/publisher.jar -o publisher.jar
@> java -jar publisher.jar -ig ig.ini -tx n/a
```
