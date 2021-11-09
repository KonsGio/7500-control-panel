<template>
 <div class="login">
        <img src="../home/olympialogo.png" class="logo">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <div class="btn-group" role="group">
        <router-link to="/" type="button" class="btn btn-outline" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 20 20">
           <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
           </svg>
        </router-link>
        <button type="button" class="btn btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 18 18">
           <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
           </svg>
        </button>
        <router-link to="/login" type="button" class="btn btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 18 18">
           <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
           </svg>
        </router-link>
       </div>
        <router-view/>
      <div class="main"> 
                <div class="second">
                    <div class="third">
                          <img
                                    id="profile-img"
                                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                    class="profile-img"
                                  />
                                    <Form @submit="handleLogin" :validation-schema="schema">
                                       <div class="form">
                                            <label for="username">Username</label>
                                              <Field name="username" type="text" class="control" />
                                             <ErrorMessage name="username" class="error-feedback" />
                                            <label for="password">Password</label>
                                             <Field name="password" type="password" class="control" />
                                             <ErrorMessage name="password" class="error-feedback" />
                                           <button class="btn-login" :disabled="loading">
                                             <span
                                               v-show="loading"
                                               class="spinner-border spinner-border-sm">
                                            </span>
                                            <span>Login</span>
                                           </button>
                                         <div class="form-group">
                                            <div v-if="message" class="alert alert-danger" role="alert">
                                            {{ message }}
                                           </div>
                                        </div>
                                     </div>
                                   </Form>
                     </div>
                  </div>   
       </div>  
  </div> 
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "login",
  components: {
    Form,
    Field,
    ErrorMessage,
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

<style scoped>
#login img{
  position: absolute;
  top: 25px;
  right: 25px;
   display: block;
  max-width: 100%;
  height: auto;
}

label {
  display: block;
  margin-top: 10px;
  text-align: center;
}

.main{
  position:relative;
  top:20px;
}
.second{
  position:relative;
  width: 75%;
  
}
.form {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin-top: 150px;
  width: 50%;
  height: 500px;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(153, 35, 35, 0.3);
}

.profile-img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
