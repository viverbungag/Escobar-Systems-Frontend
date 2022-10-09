import jsPDF from "jspdf";
import "jspdf-autotable";

export function printPdf(title, headCells, rows) {
  const doc = new jsPDF();
  var img = new Image();
  img.src = "/images/forPDF/logo.png";
  var totalPagesExp = "{total_pages_count_string}";

  doc.autoTable({
    columns: headCells,
    styles: {
      halign: "center",
    },
    headStyles: {
      fillColor: [207, 92, 54],
    },
    body: rows,
    didDrawPage: function (data) {
      // Header
      doc.addImage(img, "png", data.settings.margin.left, 15, 15, 15);
      doc.setFontSize(20).setFont(undefined, "bold");
      doc.text("Escobar", data.settings.margin.left + 18, 22);
      doc.setFontSize(10).setFont(undefined, "normal");
      doc.text(title, data.settings.margin.left + 18, 26);

      // Footer
      var str = "Page " + doc.internal.getNumberOfPages();
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        str = str + " of " + totalPagesExp;
      }
      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
    margin: { top: 35 },
  });

  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  doc.save(`${title}.pdf`);
  // doc.autoPrint();
  // window.open(doc.output('bloburl'), '_blank');
}

export function printReceipt(
  orderCardSelected,
  pdfRows,
  pdfColumns,
  pdfPaymentRows,
  pdfPaymentColumns
) {
  const date = new Date().toLocaleString();
  // console.log(pdfRows)
  const doc = new jsPDF("p", "mm", [98.425, 210]);
  var img = new Image();
  img.src = "/images/forPDF/logo.png";

  doc.addImage(img, "png", 8, 15, 15, 15);
  doc.setFontSize(15).setFont(undefined, "bold");
  doc.text("Escobar", 25, 22);
  doc.setFontSize(8).setFont(undefined, "normal");
  doc.text(`Order Receipt`, 25, 26.5);
  doc.setFontSize(15).setFont(undefined, "bold");
  doc.text(`Order #${orderCardSelected}`, 64, 22);
  doc.setFontSize(8).setFont(undefined, "normal");
  doc.text(date, 57, 26.5);

  doc.autoTable({
    startY: 40,
    columns: pdfColumns,
    body: pdfRows,
    styles: {
      halign: "left",
    },
    theme: "plain",
  });

  doc.autoTable({
    startY: doc.previousAutoTable.finalY + 10,
    columns: pdfPaymentColumns,
    body: pdfPaymentRows,
    styles: {
      halign: "left",
    },
    theme: "plain",
  });

  doc.autoPrint();
  window.open(doc.output("bloburl"), "_blank");
}
