export const API_BASE_URL = () => {
  let baseUrl1 = "https://omkaradata.in/api";
  if (
    window.location.href.includes("omkaradata.com") ||
    window.location.href.includes("omkaracapital.in")
  ) {
    baseUrl1 = "https://omkaradata.com/api"; // FOR https://vdr.omkaracapital.in/ OR omkaradata.com
  }
  if (
    (window.location.host != "omkaradata.in" &&
      window.location.host != "omkaradata.com") ||
    import.meta.env.VITE_ENABLE_CORS_SERVER == "true"
  ) {
    baseUrl1 = "https://vasudeep.com:8084/" + baseUrl1;
  }
  return baseUrl1;
};

export  const debounceFun = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}


export const openCompany = (item, value="") => {
  if(value == ""){
    let url = import.meta.env.VITE_BASE_URL + '/company-detail/'+ window.btoa(item?.CompanyID)+'/'
    window.open(url, '_self');
  }
  if(value == "other"){
    window.open(item, '_blank');
  }

  }

export const rangeArray = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}



export const openPdfWithWaterMark = (link, file_type="") => {
  let openUrl = import.meta.env.VITE_BASE_URL+'/MyPdfViewer';
  let enLink = window.btoa(link);
  localStorage.setItem('PDFViewed', enLink);
  localStorage.setItem('file_type', file_type);
  openCompany(openUrl, 'other')
}


