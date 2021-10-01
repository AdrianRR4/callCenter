import { Injectable } from '@angular/core';
import { enc, HmacSHA256 } from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResletsService {


  constructor(private http: HttpClient) { }

  getNonce(): string {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 7; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getTimestampEpoch() {
    let date = new Date();
    return Math.floor(date.getTime() / 1000);
  }

  getAuth(Method: string, Script: string) {

    let NETSUITE_ACCOUNT_ID = '5298967_SB1';
    let BASE_URL = 'https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl';
    let HTTP_METHOD = Method;
    let SCRIPT_ID = Script;
    let OAUTH_VERSION = '1.0';
    let SCRIPT_DEPLOYMENT_ID = '1'  

    let TOKEN_ID = "1e3e7c6b50eb032e6239564a60bb4d8f83ee8a3e95e8859f51ecc240b516cd25"
    let TOKEN_SECRET = "0904bb92b18d212678598f297ada7ffe1899e8c4c1f5322b7c6ae38fbf309111"
    let CONSUMER_KEY = "c5990b74655c00dccb8e77602759cb565a91228fb3f6ffb0901f0c2dad88cf96"
    let CONSUMER_SECRET = "9fa9f722db909a06f8761ddfa855630b9cd0c5dfb035b26c33cca136dd15f250"
    //let MODE='';
    let OAUTH_NONCE = this.getNonce();
    let TIME_STAMP = this.getTimestampEpoch();

    let data = '';
    data = data + 'deploy=' + SCRIPT_DEPLOYMENT_ID + '&';
   // data=data+'mode='+MODE;
    data = data + 'oauth_consumer_key=' + CONSUMER_KEY + '&';
    data = data + 'oauth_nonce=' + OAUTH_NONCE + '&';
    data = data + 'oauth_signature_method=' + 'HMAC-SHA256' + '&';
    data = data + 'oauth_timestamp=' + TIME_STAMP + '&';
    data = data + 'oauth_token=' + TOKEN_ID + '&';
    data = data + 'oauth_version=' + OAUTH_VERSION + '&';
    data = data + 'script=' + SCRIPT_ID;
    
  
    let encodedData = encodeURIComponent(data);
    let completeData = HTTP_METHOD + '&' + encodeURIComponent(BASE_URL) + '&' + encodedData;

    let hmacsha1Data = HmacSHA256(completeData, CONSUMER_SECRET + '&' + TOKEN_SECRET);
    let base64EncodedData = enc.Base64.stringify(hmacsha1Data);
    let oauth_signature = encodeURIComponent(base64EncodedData);
    //console.log(oauth_signature);

    let OAuth = 'OAuth oauth_signature="' + oauth_signature + '",';
    OAuth = OAuth + 'oauth_version="1.0",';
    OAuth = OAuth + 'oauth_nonce="' + OAUTH_NONCE + '",';
    OAuth = OAuth + 'oauth_signature_method="HMAC-SHA256",';
    OAuth = OAuth + 'oauth_consumer_key="' + CONSUMER_KEY + '",';
    OAuth = OAuth + 'oauth_token="' + TOKEN_ID + '",';
    OAuth = OAuth + 'oauth_timestamp="' + TIME_STAMP + '",';
    OAuth = OAuth + 'realm="' + NETSUITE_ACCOUNT_ID + '"';
    //console.log(OAuth)
    return OAuth;
  }
  getAuth2(method: string, url: string) {
    let NETSUITE_ACCOUNT_ID = '5298967_SB1'
    let BASE_URL = 'https://5298967-sb1.restlets.api.netsuite.com/app/site/hosting/restlet.nl';
    let HTTP_METHOD = method;
    let OAUTH_VERSION = '1.0';
    let TOKEN_ID = "1e3e7c6b50eb032e6239564a60bb4d8f83ee8a3e95e8859f51ecc240b516cd25"
    let TOKEN_SECRET = "0904bb92b18d212678598f297ada7ffe1899e8c4c1f5322b7c6ae38fbf309111"
    let CONSUMER_KEY = "c5990b74655c00dccb8e77602759cb565a91228fb3f6ffb0901f0c2dad88cf96"
    let CONSUMER_SECRET = "9fa9f722db909a06f8761ddfa855630b9cd0c5dfb035b26c33cca136dd15f250"
    let OAUTH_NONCE = this.getNonce();
    let TIME_STAMP = this.getTimestampEpoch();
    let data = '';
    let keys = this.getkeys(url);
    
    data = data + 'oauth_consumer_key=' + CONSUMER_KEY + '&';
    data = data + 'oauth_nonce=' + OAUTH_NONCE + '&';
    data = data + 'oauth_signature_method=' + 'HMAC-SHA256' + '&';
    data = data + 'oauth_timestamp=' + TIME_STAMP + '&';
    data = data + 'oauth_token=' + TOKEN_ID + '&';
    data = data + 'oauth_version=' + OAUTH_VERSION + '&';
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] > "oauth_") {
        //console.log(keys[i]);
        let value = this.getParamsValue(url, `${keys[i]}`);
        if (i == keys.length - 1) {
          data = data + keys[i] + '=' + value;
        } else {
          data = data + keys[i] + '=' + value + '&';
        }
      }
    }
    console.log(data);
    let encodedData = encodeURIComponent(data);
    let completeData = HTTP_METHOD + '&' + encodeURIComponent(BASE_URL) + '&' + encodedData;
    let hmacsha1Data = HmacSHA256(completeData, CONSUMER_SECRET + '&' + TOKEN_SECRET);
    let base64EncodedData = enc.Base64.stringify(hmacsha1Data);
    let oauth_signature = encodeURIComponent(base64EncodedData);
    //console.log(oauth_signature);
    let OAuth = 'OAuth oauth_signature="' + oauth_signature + '",';
    OAuth = OAuth + 'oauth_version="1.0",';
    OAuth = OAuth + 'oauth_nonce="' + OAUTH_NONCE + '",';
    OAuth = OAuth + 'oauth_signature_method="HMAC-SHA256",';
    OAuth = OAuth + 'oauth_consumer_key="' + CONSUMER_KEY + '",';
    OAuth = OAuth + 'oauth_token="' + TOKEN_ID + '",';
    OAuth = OAuth + 'oauth_timestamp="' + TIME_STAMP + '",';
    OAuth = OAuth + 'realm="' + NETSUITE_ACCOUNT_ID + '"';
    //console.log(OAuth)
    return OAuth;
  }

  getkeys(url) {
    let url2 = new URL(url);
    let keys = url2.search.replace(/=|\d/g, "").replace("?", "").split("&")
    keys = keys.sort();
    return keys;

  }


  getParamsValue(url: string, name: string) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  doAuth() {
    let url = "http://pos.iconnect.center/api/auth?account=&organization=&subject=&credentials=";
    //console.log("[IConnectProxy:doAuth -> " +  url);
    return this.http
      .post(url, {})
  }

}
