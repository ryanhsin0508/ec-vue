$(function() {
  //custom date
  {
  	//init date
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() < 11 ? now.getMonth() + 1 : 1;
    var d = now.getDate();
    var start = new Date(`${m}/1/${y}`);
    var end = new Date(`${m+1}/1/${y}`);


    var loop = new Date(start);
    while (loop <= end) {
      if (loop.getMonth() != m) {
      	let y = loop.getFullYear();
      	let m = loop.getMonth() < 11 ? loop.getMonth() + 1 : 1;
      	let d = loop.getDate();
        console.log(d)
      }
      var newDate = loop.setDate(loop.getDate() + 1);
    }
  }

})