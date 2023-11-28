import React, { useState } from "react";
// import styles from "./file.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  prfUrl?: string | File;
}

interface PdfPreviewerType {
  pageNumber: number;
  pageNumberInput: number;
  pageNumberFocus: boolean;
  numPages: number;
  pageWidth: number;
  fullscreen: boolean;
}
const PdfPreviewer: React.FC<Props> = ({ prfUrl }) => {
  const [pdfPreviewerState, setPdfPreviewerState] = useState<PdfPreviewerType>({
    pageNumber: 1,
    pageNumberInput: 1,
    pageNumberFocus: false,
    numPages: 1,
    pageWidth: 794,
    fullscreen: false,
  });

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setPdfPreviewerState({ ...pdfPreviewerState, numPages: numPages });
  }

  function lastPageHandler() {
    if (pdfPreviewerState.pageNumber == 1) {
      return;
    }
    const page = pdfPreviewerState.pageNumber - 1;

    setPdfPreviewerState({
      ...pdfPreviewerState,
      pageNumber: page,
      pageNumberInput: page,
    });
  }
  function nextPageHandler() {
    if (pdfPreviewerState.pageNumber == pdfPreviewerState.numPages) {
      return;
    }
    const page = pdfPreviewerState.pageNumber + 1;
    setPdfPreviewerState({
      ...pdfPreviewerState,
      pageNumber: page,
      pageNumberInput: page,
    });
  }
  const onPageNumberFocus = () => {
    setPdfPreviewerState({ ...pdfPreviewerState, pageNumberFocus: true });
  };

  const onPageNumberBlur = () => {
    setPdfPreviewerState({
      ...pdfPreviewerState,
      pageNumberFocus: false,
      pageNumberInput: pdfPreviewerState.pageNumber,
    });
  };

  const onPageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    value = value <= 0 ? 1 : value;
    value =
      value >= pdfPreviewerState.numPages ? pdfPreviewerState.numPages : value;
    setPdfPreviewerState({ ...pdfPreviewerState, pageNumberInput: value });
  };
  const toPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setPdfPreviewerState({
        ...pdfPreviewerState,
        pageNumber: Number(e.currentTarget.value),
      });
    }
  };
  const pageZoomOut = () => {
    if (pdfPreviewerState.pageWidth <= 794) {
      return;
    }
    const pageWidth = pdfPreviewerState.pageWidth * 0.8;
    setPdfPreviewerState({ ...pdfPreviewerState, pageWidth: pageWidth });
  };
  const pageZoomIn = () => {
    const pageWidth = pdfPreviewerState.pageWidth * 1.2;
    setPdfPreviewerState({ ...pdfPreviewerState, pageWidth: pageWidth });
  };
  const pageFullscreen = () => {
    if (pdfPreviewerState.fullscreen) {
      setPdfPreviewerState({
        ...pdfPreviewerState,
        fullscreen: false,
        pageWidth: 794,
      });
    } else {
      setPdfPreviewerState({
        ...pdfPreviewerState,
        fullscreen: true,
        pageWidth: window.screen.width - 40,
      });
    }
  };

  // if (pdfLoadError)
  //   return <h1 className="pdf-view-error">Pdf Preview載入錯誤</h1>;

  return (
    <div className="pdf-view">
      <div className="container">
        <Document
          file={prfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={"載入中..."}
        >
          <Page
            noData={"載入中..."}
            // renderAnnotationLayer={false}
            // renderTextLayer={false}
            pageNumber={pdfPreviewerState.pageNumber}
            width={pdfPreviewerState.pageWidth}
            loading={"載入中..."}
          />
        </Document>
      </div>
      <div className="page-tool">
        <div className="page-tool-item" onClick={lastPageHandler}>
          {" "}
          上一頁
        </div>
        <div className="page-tool-item" onClick={nextPageHandler}>
          {" "}
          下一頁
        </div>
        <div className="input">
          {" "}
          <input
            type="number"
            value={
              pdfPreviewerState.pageNumberFocus
                ? pdfPreviewerState.pageNumberInput
                : pdfPreviewerState.pageNumber
            }
            onFocus={onPageNumberFocus}
            onBlur={onPageNumberBlur}
            onChange={onPageNumberChange}
            onKeyDown={toPage}
          />{" "}
          /{" "}
        </div>
        <div className="page-tool-item" onClick={pageZoomIn}>
          {" "}
          放大
        </div>
        <div className="page-tool-item" onClick={pageZoomOut}>
          {" "}
          縮小
        </div>
        <div className="page-tool-item" onClick={pageFullscreen}>
          {pdfPreviewerState.fullscreen ? "恢復默認" : "適合窗口"}
        </div>
      </div>
    </div>
  );
};

export default PdfPreviewer;
