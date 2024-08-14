/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import logoUrl from "../../assets/logo.png";
// import { Color } from "../../theme/theme";
import * as htmlToImage from "html-to-image";
// @ts-ignore
// import PDFKit from "pdfkit";
// @ts-ignore
// import blobStream from "blob-stream";

// function closePrint(this: any) {
//   document.body.removeChild(this.__container__);
// }

// function setPrint(this: any) {
//   this.contentWindow.__container__ = this;
//   this.contentWindow.onbeforeunload = closePrint;
//   this.contentWindow.onafterprint = closePrint;
//   this.contentWindow.focus(); // Required for IE
//   this.contentWindow.print();
// }
// function printPDF(sURL: string) {
//   const oHiddFrame = document.createElement("iframe");
//   oHiddFrame.onload = setPrint;
//   oHiddFrame.style.position = "fixed";
//   oHiddFrame.style.right = "0";
//   oHiddFrame.style.bottom = "0";
//   oHiddFrame.style.width = "0";
//   oHiddFrame.style.height = "0";
//   oHiddFrame.style.border = "0";
//   oHiddFrame.src = sURL;
//   document.body.appendChild(oHiddFrame);
// }

export const generateImageFromHTML = async () => {
  try {
    const element = await document.getElementById("render-3d");

    if (element) {
      await htmlToImage.toJpeg(element); // prerender
      return await htmlToImage.toJpeg(element, {
        width: 1920,
        height: 1080,
        canvasWidth: 1920,
        canvasHeight: 1080,
      });
    }
  } catch (e) {
    console.log("generateImageFromHTML error:", e);
  }
};

// export const save3D = (saveType: string) => {
//   const doc = new PDFKit();
//   const stream = doc.pipe(blobStream());
//   doc.page.margins = {
//     bottom: 54,
//     left: 54,
//     right: 54,
//     top: 54,
//   };
//   doc.text(document.title + ", " + window.top!.location.href, 18, 18, {
//     lineBreak: false,
//   });
//   const date = new Date().toLocaleString();
//   doc.text(date, doc.page.width - 18 - doc.widthOfString(date), 18, {
//     lineBreak: false,
//   });

//   generateImageFromHTML().then((img) => {
//     doc.image(img, { width: doc.page.width - 108 });
//     doc.text("КОНТАКТЫ:", 54, 400);
//     doc.y += 6;
//     doc.text("Адрес: г. Новосибирск. ул.Дмитрия Шамшурина 1. этаж 1. офис 8");
//     doc.y += 4;
//     doc.text("Телефон: +7 (383) 363-20-12");
//     doc.y += 4;
//     doc.text("E-mail: 2139246@gmail.com");
//     stream.on("finish", function () {
//       const urlPDF = stream.toBlobURL("application/pdf");
//       if (saveType === "PDF") {
//         const a = document.createElement("a");
//         a.href = urlPDF;
//         a.download = "Result.pdf";
//         a.click();
//         URL.revokeObjectURL(urlPDF);
//       }
//       if (saveType === "print") {
//         printPDF(urlPDF);
//       }
//     });
//     doc.end();
//   });
// };
