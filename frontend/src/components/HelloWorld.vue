<template>
  <div class="page-content">
    <h1>{{ msg }}</h1>
    <div class="card-list">
      <InfoCard/>
      <FormCard/>
    </div>
  </div>

</template>

<script>
import InfoCard from '@/components/InfoCard.vue'
import FormCard from '@/components/FormCard.vue'
export default {
  
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: { InfoCard, FormCard},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  outline: none;
  border: 2px solid black;
  width: 200px;
  height: 20px;
  border-style: solid;
}

.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.card-list {
  display: flex;
  grid-auto-rows: auto;
  grid-gap: 16px;
  width: 100%;
  max-width: 600px;
}
.base-card {
  position: relative;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  border-radius: 0.75rem;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
  padding: 16px;
  flex-direction: column;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
