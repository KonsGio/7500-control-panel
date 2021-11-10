<template>
 <div class="login">
        <img src="../home/olympialogo.png" class="logo">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <div class="btn-group" role="group">
        <router-link to="/" type="button" class="btn btn-outline" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 20 20">
           <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
           </svg>
        </router-link>
        <router-link to="/login" type="button" class="btn btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 18 18">
           <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
           </svg>
        </router-link>
        <router-link to="/login" type="button" class="btn btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 18 18">
           <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
           </svg>
        </router-link>
       </div>
        <router-view/>
      <div class="main"> 
                <div class="second">
                    <ul class="third">
                          <ul class="form">
                                    <Form @submit="handleLogin" :validation-schema="schema">
                                          <li><label for="username">Username</label></li>
                                              <Field name="username" type="text" class="control" />
                                             <ErrorMessage name="username" class="error-feedback" />
                                            <li><label for="password">Password</label></li>
                                             <Field name="password" type="password" class="control" />
                                             <ErrorMessage name="password" class="error-feedback" />
                                           <li><button class="btn-login" :disabled="loading">
                                             <span
                                               v-show="loading"
                                               class="spinner-border spinner-border-sm">
                                            </span>
                                            <span>Login</span>
                                           </button></li>
                                         <div class="form-group">
                                            <div v-if="message" class="alert alert-danger" role="alert">
                                            {{ message }}
                                           </div>
                                        </div>
                                   </Form>
                                   </ul>
                     </ul>
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
  position: relative;
  top: 25px;
  margin-right: 45px;
  display: block;
  height: auto;
}

label {
  display: block;
  margin-top: 40px;
  text-align: center;
}

.main{
  width: 100%;
  height: 700px;
  background-color: #f8f8f8;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  top: 170px; /*timi fix*/ 
}
@media all and (max-width:560px) {
  .main,.second {
    justify-content: space-around;
    position: relative;
 
  }
}
.second{
  background-color: #d2d5dc;
  width: 75%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.third {
  text-align: center;
  height: 500px; 
  width: 500px;
  background-color: #b0b6c2;
  align-items: center;
  list-style-type: none;
  position: relative;
  padding: 40px;
  border-radius: 10px;
  justify-content:center;
  display: flex;
  flex-flow: row wrap;
  
}

@media all and (max-width:560px) {
  .third {
    justify-content: space-around;
    height: 620px;  
  }
}

.form {
  padding: 10px 25px 20px;
  width: 250px;
  height: 300px;
  border-radius: 10px;
  border-color: #6e7b8e;
  background: #6a7688;  
  color: rgb(255, 255, 255);
  border-style:double;
  border-width:5px;  
  display: inline-block;
  list-style-type: none;
  clear: both;
  overflow: hidden;
  line-height: 0.9em;
  font-size: 18px;
  margin-top: 10px;


}
.control{
  background-color: #b0b6c2;
  border-color: #6a7688;
}

@media all and (max-width:560px) {
  .form {
    justify-content: space-around;
    margin-bottom: 200px;
  }
}

.btn-login{
display:inline-block;
padding:0.35em 1.2em;
border:0.1em solid #6a7688;
margin:0 0.3em 0.3em 0;
border-radius:10px;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:300;
color:#ffffff;
text-align:center;
transition: all 0.2s;
background-color: #b0b6c2;
}
.btn-login:hover{
color:#ffffff;
background-color:#6a768800;
}
@media all and (max-width:560px) {
.btn-login {
  display:block;
  margin:0.4em auto;
} 
}
.error-feedback {
  color: red;
}
</style>

