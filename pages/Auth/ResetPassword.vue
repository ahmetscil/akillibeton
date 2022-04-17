<template>
  <div class="p-fluid p-grid p-formgrid">
    <div class="p-field p-col-12 login_img">
      <img src="@/assets/akillibeton-dark.png">
    </div>
    <div v-if="loginError" class="p-field p-col-12">
      <Message severity="error">
        {{ $t('auth.loginTry') }}
      </Message>
    </div>
    <div class="p-field p-col-12 p-md-4" :class="{ 'input--alert': $v.form.code.$error }">
      <label for="code">
        {{ $t('auth.code') }}
      </label>
      <InputText v-model="form.code" />
    </div>
    <div class="p-field p-col-12 p-md-4" :class="{ 'input--alert': $v.form.email.$error }">
      <label for="email">
        {{ $t('auth.email') }}
      </label>
      <InputText v-model="form.email" />
    </div>
    <div class="p-field p-col-12 p-md-4" :class="{ 'input--alert': $v.form.password.$error }">
      <label for="basic">
        {{ $t('auth.newPassword') }}
      </label>
      <Password v-model="form.password" :feedback="false" toggle-mask @keyup.enter="loginForm()" />
    </div>
    <div class="p-field-checkbox p-col-2 p-md-4">
      <Button icon="pi pi-check" :label="$t('auth.changePassword')" class="p-button-warning p-button-rounded" :disabled="disableBtn" @click="loginForm()" />
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
      password: '',
      code: ''
    },
    disableBtn: false,
    loginError: false
  }),
  computed: mapState(['siteInfo']),
  methods: {
    async loginForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.add({ severity: 'warn', summary: this.$t('auth.fillError'), life: 3000 })
      } else {
        // this.disableBtn = true
        this.loginError = false
        try {
          this.$toast.add({ severity: 'success', summary: this.$t('auth.pleaseWait'), life: 3000 })

          await this.$axios.$post('auth/updatePassword', this.form)
            .then((res) => {
              if (res.status) {
                this.$toast.add({ severity: 'info', summary: this.$t('auth.resetted'), life: 3000 })
                this.$router.push(this.localeLocation({ name: 'Auth-Login' }))
              } else {
                this.$toast.add({ severity: 'warn', summary: this.$t('err.lng_0004'), life: 3000 })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } catch (err) {
          this.disableBtn = false
          this.$toast.add({ severity: 'error', summary: err.response.data.error, life: 3000 })
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
      code: {
        required,
        minLength: minLength(4)
      },
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
<style>
  .login_img {
    text-align: center;
  }
  .login_img img {
    width: 300px;
    max-width: 100%;
    margin: auto;
  }
</style>
