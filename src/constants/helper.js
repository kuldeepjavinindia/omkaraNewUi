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




export const ConStdArray = [
  {
    label: "Consolidate",
    isConStd: true,
    value: "con",
    id: "1",
  },
  {
    label: "Standalone ",
    value: "std",
    id: "2",
  },
]


export const capStructured_Menu = [
  {
    id: 0,
    title: "Fund Flow",
    value: "Fund_Flow",
    short_name: "ff",
    type: "CAP",
  },
  {
    id: 1,
    title: "Working Capital Flow",
    value: "Working_Capital",
    short_name: "cap",
    type: "CAP",
  },
];





export const getForensicUpdateTitle = (title="", type="") => {

  let CTitle = '';
  let n_title = '';
  let c_type = '';

  if(type == 'DH'){
      CTitle = 'Dividend History';
  }
  if(type == 'AH'){
      CTitle = 'Auditor History';
  }
  if(type == 'SH'){
      CTitle = 'Shareholding Pattern';
  }
  if(type == 'ESOP'){
      CTitle = 'ESOP';
  }
  if(type == 'CH'){
      CTitle = 'Capital History';
  }

  if(type == 'ratios'){
      CTitle = 'Ratios';
  }

  if(type == 'CF'){
      CTitle = 'Capital Allocation';
  }

  if(title && type != 'SH'){
      n_title = title;
      c_type = n_title;
  }else{
      n_title = CTitle;
      c_type = type;
  }


  // if(type == 'CF'){
  //     c_type = 'Capital Allocation';
  // }
  let res = {
      title:n_title,
      type:c_type,
  }
  
  return res

}

