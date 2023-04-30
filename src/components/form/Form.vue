<template>
  <form class="form">
    <div class="form__header">
      <slot name="form-header">
        <span class="form__font form__font--header"></span>
      </slot>
    </div>

    <div class="form__content">

    </div>
  </form>
</template>

<script>
export default {
  name: 'Form'
}
</script>
