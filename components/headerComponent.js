Vue.component('headerComponent', {
  props:['title'],
  data(){
    return {
      menuActive:false,
      zNum:1
    }
  },
  template:`
    <header class="main-header" :style="{zIndex:zNum}">
      <div class="width-limiter">
        <div class="header-bar">
          <h1>{{title}}</h1>
          <nav>
            <button
              class="btn-menu"
              @click="[menuActive = !menuActive,zNum = menuActive ? 9999 : 1,$store.commit('toggleOverlayMask')]"
            >
              <span></span>
            </button>
            <ul :class="{active: menuActive}">
              <li><a href="customers.php">客戶管理</a></li>
              <li><a href="accounting.php">應收帳款</a></li>
              <li><a href="">應收對帳單</a></li>
              <li><a href="">寄庫資料</a></li>
              <li><a href="">借出資料</a></li>
              <li><a href="">變更密碼</a></li>
              <li><a href="">登出</a></li>
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