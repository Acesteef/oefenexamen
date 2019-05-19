<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{apikey}}</h1>
                    <h1>{{ teachername }}</h1>
                    <!-- <div  class="tutorklassen">
                        <form>
                            <div class="row">
                                <div class="col-5">
                                    <div class="table-wrapper">
                                        <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>test</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(leerling, index) in leerlingen" :key="index">
                                                <td @click="getStudent(leerling.voornaam, leerling.achternaam)">{{ leerling.voornaam }} {{ leerling.achternaam }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <select class="form-control"></select>
                                </div>
                            </div>
                        </form>
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
                                        <tbody>
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
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { EventBus } from '../event-bus.js';

export default {
    name: 'Tutorklas',
    data ()
    {
        return {
            URL_TUTORKLASSEN: '',
            apikey: '',
            teachername: ''
        }
    },
    methods: {
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
    },
    mounted()
    {
        EventBus.$on('FormSubmitKey', apiKey => {
            this.apikey = apiKey;
        });

        EventBus.$on('FormSubmitName', teacherName => {
            this.teachername = teacherName;
        });

        EventBus.$on('FormSubmitName', teacherName => {
            this.teachername = teacherName;
            console.log(`Oh, that's nice. It's gotten ${clickCount} clicks! :)`)
        });
    }
}
</script>

<style lang="scss">
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
</style>
