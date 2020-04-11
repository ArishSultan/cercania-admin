<template>
  <div class="form-container">
    <div class="form">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout'
}
</script>

<style scoped>
.form-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  background: linear-gradient(dodgerblue 40%, white 40%);
}

.form {
  width: fit-content;
  margin: 70px auto 50px;
}
</style>
