<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form @submit.prevent="submitHandler" class="form">
      <div class="input-field">
        <input 
          v-model="name" 
          id="description" 
          type="text" 
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="description">{{'name' | localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{'message_EnterName' | localize}}
        </small>
      </div>
      <div class="switch">
        <label>
          English
          <input v-model="isRuLocale" type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{'UpdateButton' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  computed: {
    ...mapGetters(['info'])
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    });
  },
  validations: {
    name: {required},
  },
  methods: {
      ...mapActions(['updateInfo']),
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        try {
          await this.updateInfo({
            name: this.name,
            locale: this.isRuLocale ? 'ru-RU' : 'en-US'
          })
        } catch (e) {}
      }
    }
}

</script>
<style scoped>
 .switch {
   margin-bottom: 2rem;
 }
</style>