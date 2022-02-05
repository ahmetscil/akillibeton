<template>
  <div class="p-fluid p-grid p-formgrid">
    <div v-if="loginError" class="p-field p-col-12">
      <Message severity="error">
        {{ $t('auth.loginTry') }}
      </Message>
    </div>
    <div class="p-field p-col-12 p-md-4" :class="{ 'input--alert': $v.form.password.$error }">
      <label for="email">
        {{ $t('auth.email') }}
      </label>
      <InputText v-model="form.email" @keyup.enter="loginForm()" />
    </div>
    <div class="p-field p-col-12 p-md-4" :class="{ 'input--alert': $v.form.password.$error }">
      <label for="basic">
        {{ $t('auth.password') }}
      </label>
      <Password v-model="form.password" :feedback="false" toggle-mask @keyup.enter="loginForm()" />
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
      <Button icon="pi pi-check" :label="$t('auth.login')" class="p-button-warning p-button-rounded" :disabled="disableBtn" @click="loginForm()" />
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
    disableBtn: false,
    rememberMe: false,
    loginError: false
  }),
  computed: mapState(['siteInfo']),
  methods: {
    async loginForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.add({ severity: 'warn', summary: this.$t('auth.fillError'), life: 3000 })
      } else {
        this.disableBtn = true
        this.loginError = false
        try {
          this.$toast.add({ severity: 'success', summary: this.$t('auth.pleaseWait'), life: 3000 })
          const login = await this.$auth.loginWith('laravelJWT', { data: this.form })
          if (parseInt(login.status) === 200) {
            this.disableBtn = false
            this.$store.commit('setLogin', this.$auth.$state)
            this.$store.commit('setSelectSite', { data: login.data })
          } else {
            this.disableBtn = false
            this.$toast.add({ severity: 'success', summary: login.data.error, life: 3000 })
          }
        } catch (err) {
          this.disableBtn = false
          this.$toast.add({ severity: 'warn', summary: err.response.message, life: 3000 })
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
