<template>
    <div class="form-input field">
<!--        <VeeField-->
<!--            v-slot="{ field, errors, meta }"-->
<!--            v-model="localValue"-->
<!--            :name="name"-->
<!--            :label="label"-->
<!--            :rules="validation"-->
<!--        >-->
<!--            <input-->
<!--              v-bind="field"-->
<!--              class="c-input__field field__input"-->
<!--              :class="[-->
<!--                { 'field__input&#45;&#45;invalid': errors.length !== 0 },-->
<!--                `field__input&#45;&#45;${type}`,-->
<!--              ]"-->
<!--                :type="type"-->
<!--                :placeholder="placeholder"-->
<!--            />-->

<!--            <slot></slot>-->

<!--            <div v-if="!meta.valid" class="field__error">-->
<!--                <label class="field__font field__font&#45;&#45;error" :for="name">-->
<!--                    {{ errors[0] }}-->
<!--                </label>-->
<!--            </div>-->
<!--        </VeeField>-->
    </div>
</template>

<script>
// import { Field } from 'vee-validate';
export default {
  // components: {
  //   VeeField: Field,
  // },

  props: {
    type: {
      type: String,
      default: 'text',
    },

    name: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: undefined,
    },

    placeholder: {
      type: String,
      default: undefined,
    },

    modelValue: {
      type: String,
      required: true,
    },

    validation: {
      type: String,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
