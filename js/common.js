/*function getToken() {
  return $.ajax({
    async: false,
    type: "POST", //GET, POST, PUT
    url: `${apiHost}Api/lssue` //the url to call
  }).done((res) => {}).fail(function(err) {
    //Error during request
  }).responseText;
}*/
var token = getToken();
function getData(url){
  return JSON.parse($.ajax({
      url: '/ec-vue/json/orders.json',
      async: false,
      success: (data) => {
        this.productList = data.data;
        this.typeList = data.type;
      }
    }).responseText)
}