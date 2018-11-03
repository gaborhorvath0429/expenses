<template>
<Page ref="page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
<GridLayout class='login'>

<GridLayout ref="background" class="background"></GridLayout>
  <StackLayout ref="mainContainer" class="main-container" :visibility="'visible'">
    <!-- form controls -->
    <GridLayout ref="formControls" class="form-controls" rows="auto, auto" translateY="50">
      <TextField
        hint="Email"
        keyboardType="email"
        returnKeyType="next"
        @returnPress="focusPassword()"
        v-model="user.email"
        :isEnabled="!isAuthenticating"
        autocorrect="false"
        autocapitalizationType="none"
        row="0"></TextField>
      <TextField ref="password"
        hint="Jelszó"
        secure="true"
        returnKeyType="done"
        @returnPress="submit()"
        v-model="user.password"
        :isEnabled="!isAuthenticating"
        row="1"></TextField>

      <ActivityIndicator :busy="isAuthenticating" rowSpan="2"></ActivityIndicator>
    </GridLayout>

    <!-- login / sign up button -->
    <Button
      :text="'Bejelentkezés'"
      :isEnabled="!isAuthenticating"
      class="submit-button"
      @tap="submit()"></Button>

  </StackLayout>
</GridLayout>
</Page>
</template>

<script>
import { Animation } from 'ui/animation'
import { prompt } from "ui/dialogs"
import { Color } from 'tns-core-modules/color'
import validator from 'email-validator'

import App from '@/components/App'
import alert from '@/utils/alert'


export default {
  name: 'login',

  data() {
    return {
      isAuthenticating: false,
      user: {
          email: 'gabor@asd.hu',
          password: 'asd'
      }
    }
  },

  methods: {
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },

    submit() {
      if (!this.isValidEmail()) {
        alert("Kérlek írj be valós e-mail címet!")
        return;
      }

      this.isAuthenticating = true;
      this.login();
    },

    login() {
      return this.$store.dispatch('auth/login', this.user)
        .then(() => {
          this.isAuthenticating = false;
          console.log('SUCCESSFUL AUTHENTICATION')
          this.$navigateTo(App)
        })
        .catch((error) => {
          console.error(error)
          alert("Nincs ilyen felhasználó")
          this.isAuthenticating = false;
        });
    },

    isValidEmail() {
        return validator.validate(this.user.email);
    }
  },

  mounted() {
    console.log('Login mounted')
  }
}
</script>

<style lang="scss">
  .background {
    background-image: url('res://background');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .main-container {
    height: 250;
    margin-left: 30;
    margin-right: 30;
    background-color: white;
  }

  Image {
    margin-top: 5;
    margin-bottom: 20;
  }

  Button,
  TextField {
    margin-left: 16;
    margin-right: 16;
    margin-bottom: 10;
  }

  TextField {
    color: black;
    placeholder-color: #ACA6A7;
    margin-bottom: 10;
  }

  .submit-button {
    background-color: #CB1D00;
    color: white;
    margin-top: 60;
  }

</style>
