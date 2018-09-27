const BaseUrl = "https://www.easy-mock.com/mock/5baa3963afd56b7fe77cc9b4/smilvue/";
const LOCALURL = "http://localhost:3000/"
const URL ={
  getShopingMallInfo: BaseUrl+'home',
  getGoodsInfo: BaseUrl+'xxx',
  registerUser: LOCALURL+'user/register',
  login: LOCALURL+'user/login',
  getDetailGoodsInfo: LOCALURL+'goods/getDetailGoodsInfo',
}

module.exports = URL;
