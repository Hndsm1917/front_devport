<template>
  <div class="dropdown">
    <label :for="`dropdownChoice${uniqueName}`">
      {{heading}}
    </label>

    <select
      v-model="localVal"
      :name="`dropdownChoice${uniqueName}`"
      :id="uniqueName"
    >
      <option
        class="dropdown__option"
        v-for="(item, index) in options"
        :key="index"
        :value="item"
      >
        {{item}}
      </option>
    </select>
  </div>

</template>

<script>
export default {
  name: 'Dropdown',

  props: {
    heading: {
      type: String,
      default: '',
      required: false,
    },

    uniqueName: {
      type: String,
      default: '',
      required: true,
    },

    options: {
      type: Array,
      default: () => [],
      required: true,
    },

    val: {
      type: [String, Number],
      default: '',
      required: true,
    },
  },

  computed: {
    localVal: {
      get() {
        return this.val;
      },

      set(val) {
        this.$emit('update:val', val);
      },
    },
  },
};
</script>
