<template>
      <div class="base-card">
        <div class="imgavatar">
          <img src="./img/logo.png" alt="Avatar" class="avatar" />
        </div>
        <div class="text">
          <h4>Гришкин Артем Алексеевич</h4>
        </div>
        <div class="text">
          <h4>БСБО-07-19</h4>
        </div>
        <div class="text">
          <h4>Умение: получать по шапке</h4>
        </div>
      </div>
</template>

<script>
export default {
  name: "InfoCard"
};
</script>

<style scoped>
.imgavatar {
  text-align: center;
  margin: 24px 0 12px 0;
}
img.avatar {
  width: 40px;
  border-radius: 20%;
  height: 40px;
}
.text {
  font-size: 15px;
  font-display: auto;
}
</style>