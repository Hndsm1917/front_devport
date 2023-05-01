<template>
  <div class="block">
    <div class="block__header">
      <span class="block__font block__font--header">
        <slot name="header">
          {{ header }}
        </slot>
      </span>
    </div>

    <form @submit.prevent="onSubmit" class="block__form form">
      <div class="form__description">
        <span class="form__font form__font--description">
          <slot name="description">
            {{ description }}
          </slot>
        </span>
      </div>

      <div class="form__grid">
        <slot name="form"></slot>
      </div>

      <button type="submit" class="btn form__submit">
        <slot name="submitText">
          {{ submitText }}
        </slot>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Block',

  props: {
    header: String,
    description: String,
    submitText: String,
  },

  methods: {
    onSubmit() {
      this.$emit('formSubmit');
    },
  },
};
</script>
