Vue.component('headerComponent', {
  props:['title'],
  data(){
    return {
      menuActive:false
    }
  },
  template:`
    <header>
      <div class="width-limiter">
        <div class="header-bar">
          <h1>{{title}}</h1>
          <nav>
            <button
              class="btn-menu"
              @click="menuActive = !menuActive"
            >
              <span></span>
            </button>
            <ul :class="{active: menuActive}">
              <li>客戶管理</li>
              <li>應收帳款</li>
              <li>應收對帳單</li>
              <li>寄庫資料</li>
              <li>借出資料</li>
              <li>變更密碼</li>
              <li>登出</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `,
  method:{
    toggleActive(){

    }
  }
})