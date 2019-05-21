<template>
    <section class="login">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="inner">
                        <div class="login">
                            <h4>Login</h4>
                            <hr>
                            <form @submit="formSubmit">
                                <div class="row">
                                    <div class="col-5">
                                        <input type="text" class="name form-control" placeholder="Name" v-model="teacherName">
                                    </div>
                                    <div class="col-5">
                                        <input type="password" class="password form-control" placeholder="Wachtwoord" v-model="password">
                                    </div>
                                    <div class="col-2">
                                        <button type="submit" class="btn btn-primary">Log in</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { EventBus } from '../event-bus.js';


export default {
    name: 'Login',
    data() {
        return {
            teacherName: 'AMJE',
            password: 'test',
            apiKey: '',
            URL: 'http://localhost/api/apikey/',
        }
    },
    methods: {
        formSubmit(e) {
            e.preventDefault();

            const postdata = new FormData();
            postdata.append('docent', this.teacherName)
            postdata.append('wachtwoord', this.password)

            axios.post(this.URL, postdata)
            .then((response) => {
                this.apiKey = response.data.apikey;

                EventBus.$emit('FormSubmitKey', this.apiKey);
                EventBus.$emit('FormSubmitName', this.teacherName);

                // Get the method in the Tutorclass.vue component (Make sure to change [1] depending on component order)
                this.$root.$children[0].$children[2].getTutorClass();
            })
            .catch(function (error) {
                console.log(error);
            }); 
        }
    }
}
</script>

<style lang="scss">
 section
 {
    .container
    {
        .row
        {
            > div
            {
                .inner 
                {
                    .login 
                    {
                        border-radius: 15px;
                        border: 2px solid #D9D9D9;
                        background-color: #FFFFFF;

                        padding: 30px 20px;

                        > h4 
                        {
                            font-weight: bold;
                            color: #4A4E51;
                        }

                        > hr 
                        {
                            border: none;
                            height: 1px;
                            color: #D9D9D9;
                            background-color: #D9D9D9; 
                        }

                        > form
                        {
                            padding-left: 20px;
                            padding-right: 40px;

                            .name,
                            .password
                            {
                                font-weight: bold;

                                color: #4A4E51;
                            }

                            .btn 
                            {
                                width: 100px;

                                background: rgb(4, 198, 94);
                                border-color: transparent;
                                border-radius: 30px;

                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
 }
</style>

