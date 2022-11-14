const url = 'http://localhost:5000/';
const local = require('../hooks/useLocalStorageAuth');
const {storeLocal,getLocal} = require("../hooks/useLocalStorageAuth")
const buildHeader = (request, content) => {
  
  if (content == null) {
    return request;
  }
  content.token=getLocal('token')
  Object.keys(content).forEach((key) =>
    request.setRequestHeader(key, content[key])
  );
  return request;
};
const buildQuery = (query) => {
  if (query == null) {
    return '';
  }
  var len = Object.keys(query).length;
  return (
    '?' +
    Object.keys(query).map(
      (key, i) => key + '=' + query[key] + (i < len ? '&' : '')
    )
  );
};
export const sendRequest = async (path, type, contents) => {
  return new Promise((resolve) => {
    var xml = new XMLHttpRequest();
    
    let xmlPath = url + path + buildQuery(contents.query);
    xml.open(type, xmlPath, true);
    buildHeader(xml, contents.header);
    xml.onload = function () {
      if(path!="token"){updateToken()}
      resolve(xml.response);
    };
    
    var _body=JSON.stringify(contents.body)
    xml.send(_body);
    
  });
};

export const updateToken = async () => {
  console.log('checking token validity');
  var token = local.getLocal('token');
  if(token==null){return true}
  const newToken = await sendRequest('token', 'GET', { token });
  console.log(JSON.parse(newToken).token)
  local.storeLocal('token', JSON.parse(newToken).token);
};
