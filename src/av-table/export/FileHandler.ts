const MIME_PDF = 'application/pdf';


export function buildPDF(pdfData: string) {
  const contentType = MIME_PDF;

  const blob = base64ToBlob(pdfData, contentType);
  const blobUrl = URL.createObjectURL(blob);

  /// todo Marco: ohhhh ... really needed?
  const img = document.createElement('img');
  img.src = blobUrl;

  const binarydata = [];
  binarydata.push(blob);
  const url = URL.createObjectURL(new Blob(binarydata, {type: MIME_PDF}));
  window.open(url);
}

export function base64ToBlob(base64ToConvert: string, contentType: string, sliceSize?: number) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(base64ToConvert);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}
