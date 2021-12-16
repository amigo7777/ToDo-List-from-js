<template>
    <div id="nav">
        <div class="link-wrapper">
            <div class="nav-links">
                <router-link class="nav-link" exact to = "/">Главная</router-link>
                <router-link class="nav-link" to="/info">Инфо</router-link>
            </div>
                <a @click="onLogoutClicked" class="logout nav-link">Выйти</a>
        </div>
    </div>
</template>

<script>
import{doLogout} from '@/netClient/dataService';
export default {
    name: "NavBar",
    methods: {
        async onLogoutClicked(){
          try {
            await doLogout();
            this.$router.push('/login');
          } catch (error) {
            console.error({error});
          }
        }
    },
};
</script>

<style scoped>
#nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 4px 4px 16 px rgba(0, 0, 0, 0.2);
    background: rgb(0,172,238);
    background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
    background: rgb(22,9,240);
    background: linear-gradient(0deg, rgba(22,9,240,1) 0%, rgba(49,110,244,1) 100%);
    color: #fff;
    box-shadow: 0.4em 0.4em 7px rgba(122,122,122,0.5);
    z-index: auto;
}

.link-wrapper{
    display: flex;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    max-width: 95%;
    padding: 12px 24px;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
}

.nav-links{
    display: flex;
    
}
.nav-link{
  color: #fff;
  border-radius: 5px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;

}




.nav-link span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.nav-link:before,
.nav-link:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
   background: rgb(255, 145, 0); 
  transition: all 0.3s ease;
}
.nav-link:before {
  height: 0%;
  width: 3px;
}
.nav-link:after {
  width: 0%;
  height: 3px;
}
.nav-link:hover{
  background: transparent;
  box-shadow: none;
}
.nav-link:hover:before {
  height: 100%;
}
.nav-link:hover:after {
  width: 100%;
}
.nav-link:active{
  color:blueviolet;

}
a.router-link-active, li.router-link-activea {
  color: rgb(33, 7, 128);
}
</style>