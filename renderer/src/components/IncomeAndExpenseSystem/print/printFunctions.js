import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function printPdf(title, headCells, rows) {
    const doc = new jsPDF();
    var img = new Image();
    img.src = '/images/forPDF/logo.png';
    var totalPagesExp = '{total_pages_count_string}'

    doc.autoTable({
        columns: headCells,
        styles : { 
            halign : 'center'
        },
        headStyles : {
            fillColor : [168, 118, 62]
        },
        body: rows,
        didDrawPage: function (data) {
        // Header
        doc.addImage(img, 'png', data.settings.margin.left, 15, 15, 15)
        doc.setFontSize(15).setFont(undefined, 'bold')
        doc.text('Escobar', data.settings.margin.left + 18, 22);
        doc.setFontSize(10).setFont(undefined, 'normal');
        doc.text(title, data.settings.margin.left + 18, 26);

        // Footer
        var str = 'Page ' + doc.internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp
        }
        doc.setFontSize(10)

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text(str, data.settings.margin.left, pageHeight - 10)
        },
        margin: { top: 35 },
    })

    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
    }

    doc.save(`${title}.pdf`);
}