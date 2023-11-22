const base_url = 'https://luqmafresh-backend-zzfk.onrender.com/';
const searchlocation_url1 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
const searchlocation_url2 = '&radius=500&key=AIzaSyAWTYxa7AEUW0-AjxgsOT5Sro23YKXf7xk';
const currentlocation = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const currentlocation1='&key=AIzaSyAWTYxa7AEUW0-AjxgsOT5Sro23YKXf7xk';
const routes1='https://maps.googleapis.com/maps/api/directions/json?origin=';
const routes ='&destination=';
const routes2='&alternatives=true&key=AIzaSyAWTYxa7AEUW0-AjxgsOT5Sro23YKXf7xk';
const googlekeys='AIzaSyAWTYxa7AEUW0-AjxgsOT5Sro23YKXf7xk'
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
// AIzaSyAWTYxa7AEUW0-AjxgsOT5Sro23YKXf7xk
