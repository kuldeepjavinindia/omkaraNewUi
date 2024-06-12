export const API_BASE_URL = () => {
  let baseUrl1 = "https://omkaradata.com/api";

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

export const DocumentNotes = [
  { title: 'None', value: '0' },
  { title: 'Concall Summary', value: 'Concall Summary' },
  { title: 'Important Source', value: 'Important Source' },
  { title: 'Management Meeting', value: 'Management Meeting' },
  { title: 'One Pager', value: 'One Pager' },
  { title: 'Quarter Update', value: 'Quarter Update' },
  { title: 'Rough', value: 'Rough' },
];


export const DocumentType = [
  { title: 'None', value: '0' },
  { title: 'Annual Reports', value: 'Annual Reports' },
  { title: 'Concall Transcripts', value: 'Concall Transcripts' },
  // { title: 'Forensic', value: 'Forensic' },
  { title: 'Initial Coverage', value: 'Initial Coverage' },
  { title: 'Investor Presentation', value: 'Investor Presentation' },
  // { title: 'Brief Notes', value: 'Brief Notes' },
  { title: 'Quarterly Update', value: 'Quarterly Update' },
  { title: 'Others', value: 'Others' },
];


// export const DocumentType = [
//   { title: 'None', value: '0' },
//   { title: 'Research Report', value: 'Research Report' },
//   { title: 'Sector Report', value: 'Sector Report' },
//   { title: 'Quarterly Updates', value: 'Quarterly Updates' },
//   { title: 'Running Notes (WIP)', value: 'Running Notes (WIP)' },
//   { title: 'Stock Exchange Announcements', value: 'Stock Exchange Announcements' },
// ];

// PERMISSION USER IDS
export const NotesActionButtons = [1];
export const RepoListingButtons = ["1", "3", "4"];
// PERMISSION USER IDS



// vimeo_parser
// youtube_parser

export const vimeo_parser = (url) => {
  // var url = "http://www.vimeo.com/7058755"; //Or any other Vimeo url format
  var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  let unlisted_code = "";
  var match = url.match(regExp);
  var ddArr = url.split('/');
  if(ddArr.length == 5){
      unlisted_code = '/'+ddArr[ddArr.length-1]

  }
  // console.table(match);
  if (match) {
      return match[5]+unlisted_code;
  } else {
      // alert("not a vimeo url");
      return null;
  }
}

export const youtube_parser = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : null;
}


export const getVidFullUrl = (videoCode, videoType) => {
  let url = `https://vimeo.com/${videoCode}`;
  if (videoType === "youtube") {
    url = `https://www.youtube.com/watch?v=${videoCode}`;
  }
  return url;
};



export const selectSitesArr = [
  { title: "Select Site Type", value: 0 },
  { title: "Youtube", value: "youtube" },
  { title: "Vimeo", value: "vimeo" },
];

export const selectVideoArr = [
  { title: "Select Site Type", value: 0 },
  { title: "Single Company", value: "SINGLE VIDEO" },
  { title: "Sector Video", value: "Sector Video" },
];

