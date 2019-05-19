<template>
    <section class="login">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="inner">
                        <div class="login">
                            <form @submit="formSubmit">
                                <div class="row">
                                    <div class="col-5">
                                        <input type="text" class="form-control" placeholder="Name" v-model="teacherName">
                                    </div>
                                    <div class="col-5">
                                        <input type="password" class="form-control" placeholder="Wachtwoord" v-model="password">
                                    </div>
                                    <div class="col-2">
                                        <button type="submit" class="btn btn-primary">Log in</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div  class="tutorklassen">
                            <form>
                                <div class="row">
                                    <div class="col-5">
                                        <div class="table-wrapper">
                                            <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>{{ selectedValue }} - {{ docenten.voornaam }} {{ docenten.achternaam }}</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="apiKey">
                                                <tr v-for="(leerling, index) in leerlingen" :key="index">
                                                    <td @click="getStudent(leerling.voornaam, leerling.achternaam)">{{ leerling.voornaam }} {{ leerling.achternaam }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <select v-model="selectedValue" class="form-control" :onchange="getClassMates(this.selectedValue)">
                                            <option disabled selected value> Selecteer een tutorgroep </option>
                                            <option v-for="(tutorklas, index) in tutorklassen" :key="index">{{ tutorklas.id }}</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div> -->

                        <div class="verplaatsen">
                            <form>
                                <div class="row">
                                    <div class="col-6">
                                         <input type="text" class="form-control" placeholder="Name" v-model="leerling">
                                    </div>
                                    <div class="col-6">
                                        <select name="" id="">
                                            <option v-for="(tutorklas, index) in tutorklassen" :key="index">{{ tutorklas.id }}</option>
                                        </select>
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
            tutorklassen: [],
            docenten: [],
            leerlingen: [],
            leerling: '',
            tutorgroep: '',
            URL: 'http://localhost/api/apikey/',
            URL_TUTORKLASSEN: 'http://localhost/api/tutorklassen/',
            URL_TUTORKLAS: 'http://localhost/api/tutorklas/',

            selectedValue: 'Tutorgroep',
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

                this.getTutorClass();
            })
            .catch(function (error) {
                console.log(error);
            }); 
        },
        getTutorClass() {
                const postdata = new FormData();
                postdata.append('docent', this.teacherName)
                postdata.append('apikey', this.apiKey)

                axios.post(this.URL_TUTORKLASSEN, postdata)
                 .then((response) => {
                    this.tutorklassen = response.data.tutorklassen;

                    //console.log(this.tutorklassen);
                 })
                .catch(function (error) {
                    console.log(error);
                }); 
        },
        getClassMates(event) {
            
            //console.log(this.selectedValue);

            const postTutorClassData = new FormData();
            postTutorClassData.append('docent', this.teacherName)
            postTutorClassData.append('apikey', this.apiKey)
            postTutorClassData.append('tutorgroep', this.selectedValue)

            axios.post(this.URL_TUTORKLAS, postTutorClassData)
            .then((response) => {

                this.docenten = response.data.docent;
                this.leerlingen = response.data.leerlingen;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getStudent (voornaam, achternaam) {
            this.leerling = voornaam + ' ' + achternaam;
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
                        border-radius: 30px;
                        background-color: #EDEDED;

                        padding: 20px 20px;

                        box-shadow: 44px 25px 83px -38px rgba(184,178,184,1);

                        > form
                        {
                            .form-control
                            {
                                border-radius: 30px;
                            }

                            .btn 
                            {
                                background-color: #6C7AE0;

                                border-color: transparent;

                                border-radius: 30px;

                                width: 100px;
                            }
                        }
                    }

                    .tutorklassen
                    {
                        min-height: 500px;

                        padding: 20px 20px;

                        position: relative;

                        background-color: #EDEDED;
                        margin: 10px 0px;

                        border-radius: 30px;

                        box-shadow: 44px 25px 83px -38px rgba(184,178,184,1);

                        > form 
                        {
                           
                            .table-wrapper 
                            {
                                .table
                                {
                                    border-collapse: collapse;
                                    border-radius: 20px;
                                    overflow: hidden;

                                    margin: 0px;

                                    box-shadow: 44px 25px 83px -38px rgba(184,178,184,1); 

                                    > thead
                                    {
                                        background-color: #6C7AE0;

                                        color: #ffffff;

                                        width: 100%;

                                        text-align: center;

                                        > tr 
                                        {
                                            > th 
                                            {
                                                border-collapse:collapse;
                                                border: 0;  
                                            }
                                        }
                                    }

                                    > tbody
                                    {
                                        border-radius: 30px;

                                        text-align: center;

                                        width: 400px;

                                        > tr 
                                        {
                                            width: 400px;

                                            > td 
                                            {
                                                width: 400px;

                                                border-top: none; 
                                            }

                                            &:nth-child(odd)
                                            {
                                                background-color: #F8F6FF;
                                            }

                                            &:nth-child(even)
                                            {
                                                background-color: #FFFFFF;
                                            }
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .verplaatsen 
                    {
                        border-radius: 30px;
                        background-color: #EDEDED;

                        padding: 20px 20px;

                        box-shadow: 44px 25px 83px -38px rgba(184,178,184,1);

                        > form
                        {
                            .form-control
                            {
                                border-radius: 30px;
                            }
                        }
                    }
                }
            }
        }
    }
 }
</style>

