function _cke(name) 
{
  var cookie = document.cookie;
  var prefix = name + "=";
  var begin = cookie.indexOf("; " + prefix);
  if (begin == -1) {
      begin = cookie.indexOf(prefix);
      if (begin != 0) return null;
  } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = cookie.length;
      }
  }

  return unescape(cookie.substring(begin + prefix.length, end));
} 

function saveLanguage(x,lang) 
{
  var now = new Date();
  var time = now.getTime();
  if(x == '') {
    var expireTime = time + 1000*22620000;
  } else {
    Date.prototype.addDays = function(days) 
    {
      var e = new Date(this.valueOf());
      e.setDate(e.getDate() + days);
      return e;
    }
    var e = new Date();
    var expireTime = e.addDays(x);   
  }
  
  now.setTime(expireTime);
  var tempExp = 'Wed, 31 Oct 2017 08:50:17 GMT';
  document.cookie = 'lang='+lang+'; expires='+now.toGMTString()+';path=/';
}
