<template>
  <div class="base-card">
        <form id="form" class="form-feedback">
          <div class="form-field">
            <input
              required
              type="text"
              placeholder=" Ваше имя"
              :readonly="false"
            />
          </div>
          <div class="form-field">
            <label for="checkbox">checkbox</label>
            <input required id="checkbox" type="checkbox" :value="true" />
          </div>
          <div class="form-field">
            <input type="text" placeholder="Отчество" />
          </div>
          <div class="form-field">
            <input required type="text" placeholder="Ваш email" />
          </div>
           <div class="form-field">
          <textarea required placeholder="Введите сообщение..."></textarea>
           </div>
           <div class="form-footer">
          <button id="bth" type="submit">Отправить</button>
          </div>
        </form>
      </div> 
</template>

<script>
export default {
  name: "FormCard"
};
</script>

<style scoped>
.form-field > input:hover {
  outline: none;
  border: 2px solid rgb(21, 231, 91);
}
textarea {
  outline: none;
}

button {
  color: white;
  border-color: blueviolet;
  background: slateblue;
  border-radius: 13em;
  width: 150px;
  height: 25px;
}
input {
  outline: none;
  border: 2px solid black;
  width: 200px;
  height: 20px;
  border-style: solid;
}
.form-feedback > input:hover {
  font-family: Florence, cursive;
  outline: none;
  border: 2px solid rgb(4, 147, 230);
  text-align: center;
  border-style: inset;
}




button {
  margin: 20px;
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
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
  background: #b621fe;
  border: none;
  z-index: 1;
}

button:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background-color: #663dff;
  border-radius: 5px;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  transition: all 0.3s ease;
}
button:hover {
  color: #fff;
}
button:hover:after {
  left: 0;
  width: 100%;
}
button:active {
  top: 2px;
}
</style>