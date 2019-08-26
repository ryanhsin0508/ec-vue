function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', function(){
    	
    });
  }
}
$(function(){
	var vm = new Vue({
		el:'#app',
		store:store,
		data:{
			window:{
			  width:0,
			  height:0
			}
		},
		created(){
			window.addEventListener('resize', ()=>{
			  console.log('ooop')
			  this.window.width = window.innerWidth;
			})
			this.window.width = window.innerWidth;
			this.window.height = window.innerHeight;
		}
	})
})