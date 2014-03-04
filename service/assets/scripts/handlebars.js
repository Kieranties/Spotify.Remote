(function(doc){
    var templates = {
        simpleResult: Handlebars.compile($("#hb-simple-result").html()),
        trackRow: Handlebars.compile($("#hb-track-row").html())
    };

    doc.handlebars = templates;

})(document);