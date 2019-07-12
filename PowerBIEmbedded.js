
var report;

$(document).ready(function () {
    $.ajax({
        //url: "http://localhost:14450/api/PowerBiEmbedded",
        url: "https://tvccportal.azurewebsites.net/api/PowerBiEmbedded",
        success: function (result) {
            var ReportModel = result[15];
            $('#ReportName').html(ReportModel.Name);

            var models = window['powerbi-client'].models;

            var embedConfiguration = {
                type: 'report',
                id: ReportModel.reportId,
                embedUrl: ReportModel.embedUrl,
                tokenType: models.TokenType.Embed,
                permissions: models.Permissions.All,
                accessToken: ReportModel.embedToken,
                settings: {
                    navContentPaneEnabled: false,
                    filterPaneEnabled: false
                }
            };

            var $reportContainer = $('#PowerBiReport');
            report = powerbi.embed($reportContainer.get(0), embedConfiguration);

            report.on('loaded', function (event) {
                LoadFilters();
                GetPages();
            });
            //report.on('loaded', event => {
            //    report.getFilters()
            //        .then(filters => {
            //            filters.push(Filter);
            //            return report.setFilters(filters);
            //        });
            //});
        }
    });
});

function LoadFilters() {
    var filter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: { "table": "Calendar", "column": "FIN_YEAR" },
        operator: "In",
        values: [20182019]
    };

    report.setFilters([filter]).then(function (result) {

    });

}

function GetPages() {
    report.getPages().then(function (pages) {
        var Pages = "";
        $(pages).each(function (index, value) {
            Pages = Pages + "<button class=\"button\" onclick='LoadPage(\"" + value.name + "\")'>" + value.displayName + "</button>";
        });
        $('#Pages').html(Pages);
    });

}

function LoadPage(pageName) {
    report.setPage(pageName).then(function (result) {

    });
}
