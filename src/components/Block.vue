<template>
  <div class="block">
    <div class="block__header">
      <span class="block__font block__font--header">
        <slot name="header">
          {{ header }}
        </slot>
      </span>
    </div>

    <form @submit="onSubmit" class="block__form form">
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
    header: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    submitText: {
      type: String,
      required: false,
    },
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$emit('formSubmit');
    },
  },
};
</script>
