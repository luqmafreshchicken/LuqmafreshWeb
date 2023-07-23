const base_url = 'http://65.0.16.155:8000/aaoochale/UserAuth/';
const searchlocation_url1 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
const searchlocation_url2 = '&radius=500&key=AIzaSyA2ZqLmyX22bQKPEsrVQrQRuAPBJxpYcSQ';
const currentlocation = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const currentlocation1='&key=AIzaSyA2ZqLmyX22bQKPEsrVQrQRuAPBJxpYcSQ';
const routes1='https://maps.googleapis.com/maps/api/directions/json?origin=';
const routes ='&destination=';
const routes2='&alternatives=true&key=AIzaSyA2ZqLmyX22bQKPEsrVQrQRuAPBJxpYcSQ';
const googlekeys='AIzaSyA2ZqLmyX22bQKPEsrVQrQRuAPBJxpYcSQ'
export const apiConfig = {
  Url: base_url,
  Search_Location_Url: searchlocation_url1,
  Search_Location_Url1: searchlocation_url2,
  Current_Location_Url: currentlocation,
  Current_Location_Url1: currentlocation1,
  direction1:routes1,
  direction:routes,
  direction2:routes2,
  mapkeys:googlekeys,
  currentlocation: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
};
