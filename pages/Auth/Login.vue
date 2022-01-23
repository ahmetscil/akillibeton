<template>
  <div class="asc_pariette-auth-form">
    <b-row v-if="loginError">
      <b-col cols="12" class="pb-3 text-danger">
        {{ $t('auth.loginTry') }}
      </b-col>
    </b-row>
    <div class="p-fluid p-grid p-formgrid">
      <div class="p-field p-col-12">
        <h1 class="logotype">
          {{ siteInfo.name }}
        </h1>
      </div>
      <div class="p-field p-col-12 p-md-4" :class="{ 'input--alert': $v.form.password.$error }">
        <label for="email">
          {{ $t('auth.login') }}
        </label>
        <InputText v-model="form.email" @keypress.enter="loginForm()" />
      </div>
      <div class="p-field p-col-12 p-md-4" :class="{ 'input--alert': $v.form.password.$error }">
        <label for="basic">
          {{ $t('auth.password') }}
        </label>
        <Password v-model="form.password" :feedback="false" toggle-mask @keypress.enter="loginForm()" />
      </div>
      <div class="p-field-checkbox p-col-6 p-md-4">
        <Checkbox id="rememberMe" v-model="rememberMe" :binary="true" />
        <label for="binary">
          {{ $t('auth.rememberMe') }}
        </label>
      </div>
      <div class="p-field-checkbox p-col-6 p-md-4">
        <nuxt-link :to="localeLocation({ name: 'Auth-ForgotPassword' })">
          {{ $t('auth.forgotPass') }}
        </nuxt-link>
      </div>
      <div class="p-field-checkbox p-col-2 p-md-4">
        <Button
          id="authButton"
          label="Primary"
          icon="pi pi-check"
          type="button"
          class="p-button-raised p-button-rounded"
          @click="loginForm()"
        >
          {{ $t('auth.login') }}
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  layout: 'auth',
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    rememberMe: false,
    loginError: false
  }),
  computed: mapState(['siteInfo']),
  watch: {
  },
  methods: {
    async loginForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error(this.$t('auth.fillError'))
      } else {
        this.loginError = false
        try {
          this.$toast.success(this.$t('auth.pleaseWait'))
          const login = await this.$auth.loginWith('laravelJWT', { data: this.form })
          if (parseInt(login.status) === 200) {
            this.disableBtn = false
            this.$store.commit('setLogin', this.$auth.$state)
            this.$store.commit('setSelectSite', { data: login.data })
          }
        } catch (err) {
        }
      }
    },
    onReset () {
      this.form.email = ''
      this.form.password = ''
    }
  },
  validations: {
    form: {
      email: {
        required,
        minLength: minLength(3),
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  }
}
</script>
<style lang="sass">

</style>
