<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <i @click="close" class="far fa-times-circle"></i>
          <!-- Modal Content -->

<div class="form">
 <Form @submit="handleLogin" :validation-schema="schema">
        <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
        </div>
        <div class="fields">
        <label for="username">Username</label>
            <Field name="username" type="text" class="control" />
            <ErrorMessage name="username" class="error-feedback" />
        <label for="password">Password</label>
            <Field name="password" type="password" class="control" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
         <slot />
          <button class="btn-login" :disabled="loading">
            <span
            v-show="loading"
            class="spinner-border spinner-border-sm">
        </span>
        <span>Login</span>
        </button>
</Form>
</div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    components:{
    Form,
    Field,
    ErrorMessage,
    },
  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
.modal {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;
  text-align: center;
  justify-content: center; 
  align-items: center;
  top: 0;
  left: 0;
  background-color: #6e7b8e73;
  
  .modal-inner {
    position: relative;
    max-width: 500px;
    border-radius: 15px;
    height: 500px;
    box-shadow: 0 4px 6px -1px rgb(54, 52, 52), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #d2d5dc;
    padding: 64px 30px;
    
    i {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 25px;
      cursor: pointer;
      color:#6a7688;
      &:hover {
        color: #940000;
      }
    }
    button {
      padding: 15px 35px;
      border-radius:10px;
      border-color: #717d8f;
      font-size: 16px;
      background-color: #6a7688;
      color: rgb(0, 0, 0);
      cursor: pointer;
      position:relative;
    top: 15px;
      &:hover {
        background-color: #6a7688;
        color: #ffffff;
      }
    }

  }
 
.form{
  height: 90%;
  max-width: 60%;
  margin-top:20px;
  margin-left: 85px;
  border-radius: 10px;
  border-color: #b0b6c2;
  background: #b0b6c2;  
  border-style:double;
  overflow: hidden;
  line-height: 1.5em;
  font-size: 18px;
  
}


.error-feedback {
  color: rgb(105, 73, 73);
}

}
</style>