var statements = document.getElementById("statements");
var requirements = statements.getElementsByClassName("requirement");
for(var req of requirements) {
    req.innerHTML = req.innerHTML.replace(/\[\[([^\]]+)\]\]/g, '<a href="Requirements-EHRSFMR2.1-\$1.html">\$1</a>')
}