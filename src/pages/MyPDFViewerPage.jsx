import { useEffect, useState } from 'react'
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@material-tailwind/react';


const pdfURL = localStorage.getItem('PDFViewed') ? window.atob(localStorage.getItem('PDFViewed')) : null;
// const pdfURL = "https://omkaradata.com/UploadFiles/132175_1565_CT_FY23-Q3.pdf";
// const pdfURL = "https://www.bseindia.com/xml-data/corpfiling/AttachHis//513ee4c6-b3ac-4603-a973-452592adc26e.pdf";


const filDatattt = localStorage.getItem('file_type') ? localStorage.getItem('file_type') : null;
let fileName = '';
if (pdfURL) {

  fileName = pdfURL.split('/');
  fileName = fileName[fileName.length - 1]

}

export const rangeArray = (start, end) => {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


const MyPDFViewer = () => {

const rr_dispatch = useDispatch();
const rrd_params = useParams()
const [mypdf, setMypdf] = useState(null);
const [ShowIframe, setShowIframe] = useState(null);

let watermarkText = "vineet@omkaracapital.in";




const createAndDownloadBlobFile = (body, filename, extension = "pdf") => {
    const blob = new Blob([body]);
    // const fileName = `${filename}.${extension}`;
    console.log("blob", blob);
    const link = document.createElement("a");
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        console.log("link", link, url);
        
      }
    }
      
    // dispatch(filesLogAction({
    //   'author': userData?.name,
    //   'group_name': userData?.type,
    //   'company': itemData1?.title,
    //   'action': 'file download',
    //   'description': 'description'+userData?.id,
    //   'details': itemData1?.link,
    //   'filename': itemData1?.fileName
    // }));
  
  }


  
  const getPdf = async (setMypdf) => {
    
    try {
      let url = pdfURL;
          url = "https://vasudeep.com:8084/"+url;

      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        // if (filDatattt === 'Final Output') {
          // page.setFont(helveticaFont);
          page.drawText(watermarkText, {
            x: 100,
            y: page.getHeight() / 2 + -200,
            size: 50,
            color: rgb(0.8, 0.8, 0.8, 0.1),
            rotate: degrees(45),
            opacity: 0.4,
          });
        // }
      });
      const pdfBytes = await pdfDoc.save();
      setMypdf(pdfBytes);
    } catch (error) {
      // setShowIframe(true);
      console.log(error)
    }

  }


  
  const PreviewPDF = ({ pdf }) => {
    console.log("file>>>>",pdf)
    const [page, setPage] = useState(10);
    const [TotalPage, setTotalPage] = useState(0);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    if (!pdf) return null;
      console.log('pdf >>> ', pdf)
    return (
      <>
        <div
          className="page-navigator flex justify-between bg-theme text-white items-center p-2 sticky top-0 z-10"
        >
          <div>
            {mypdf && (
              <Button className='bg-white text-theme' size="sm" onClick={() => createAndDownloadBlobFile(mypdf, fileName)}>
                Download Complete PDF
              </Button>
            )}
          </div>
          <div>
            Showing page No. {page - 9} - {TotalPage > page ? page : TotalPage} out of {TotalPage} Pages
          </div>
          <div className={`mr-4 flex gap-2`}>
            <Button sx={{
              margin: "0 0.2rem"
            }}

              disabled={page <= 10 ? true : false}
              className='bg-white text-theme' size="sm" onClick={() => setPage((p) => (p > 0 ? p - 10 : p))}>
              Back
              {
                page > 10 ?
                  <>
                    <div className={` pl-2`}>

                      {page - 9 - 10}  - {page - 10}
                    </div>
                  </>
                  : null
              }


            </Button>
            <Button sx={{
              margin: "0 0.2rem"
            }}
              disabled={page >= TotalPage ? true : false}
              className='bg-white text-theme' size="sm" onClick={() => setPage((p) => p + 10)}>
              Next
              {
                page < TotalPage
                  ?
                  <>

                    <div className={` pl-2`}>{page - 9 + 10}  - {TotalPage > page + 10 ? page + 10 : TotalPage}</div>
                  </>
                  :
                  null
              }
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "4rem" }}>
          <Document
            file={{ data: pdf }}
            onLoadSuccess={({ numPages }) => setTotalPage(numPages)}
            options={{ 
               cMapUrl: "/_next/cmaps/", 
              cMapPacked: true
             }}
          >
            {
              rangeArray((page - 9), page).map((item, i) => {
                return (
                  <>
                    <Page key={item + '-' + i} error={""} width={1000} pageNumber={item} />
                  </>
                );
              })
            }
          </Document>

        </div>
      </>
    );
  }





  useEffect(() => {
    getPdf(setMypdf)
  }, [])

    
  return (
    <>
      {
        ShowIframe ?
        <>
          <iframe src={pdfURL} style={{ width: '100vw', height:'100vh' }}>

          </iframe>
        </>
        :
        <>
          {!mypdf && (
            <>
                Loading...
            </>
          )}
          <PreviewPDF pdf={mypdf} />
        </>
      }
    </>
  )
}

export default MyPDFViewer
