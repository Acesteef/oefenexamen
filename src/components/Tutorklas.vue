<template>
   <section class="tutorklas">
       <div class="container">
           <div class="row">
               <div class="col-12">
                    <div class="tutorklassen">

                        <div class="titel">
                            <h4>Tutorklassen</h4>
                            <hr>
                        </div>

                        <div v-if="!apikey" class="warning">
                                <h4>Log in voor de weergave van de tutorklassen</h4>
                        </div>

                        <form>
                            <div v-if="apikey" class="row">
                                <div class="col-5">
                                    <div class="table-wrapper">
                                        <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">{{ selectedValue + ' ' + '-'}} {{ docenten.voornaam + ' ' + docenten.achternaam }}</th>
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
                                   <select v-model="selectedValue" @change="getStudents" class="select-klas form-control">
                                        <option> Selecteer een tutorgroep </option>
                                        <option v-for="(tutorklas, index) in tutorklassen" :key="index">{{ tutorklas.id }}</option>
                                    </select>
                                </div>
                            </div>
                        </form>

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
    name: 'Tutorklas',
    data ()
    {
        return {
            //props voor het ophalen van tutorklassen
            URL_TUTORKLASSEN: 'http://localhost/api/tutorklassen/',
            apikey: '',
            teachername: '',

            // props voor het ophalen van leerlingen en docent
            URL_TUTORKLAS: 'http://localhost/api/tutorklas/',
            tutorklassen: [],
            docenten: [],
            leerlingen: [],
            selectedValue: 'Tutorgroep',

            // props voor het laten zien van de naam in Verplaatsen.vue
            leerlingVoornaam: '',
            leerlingAchternaam: ''
        }
    },
    methods: {
        getTutorClass() {
            
            // zet data klaar om verzonden te worden
            const postTutorData = new FormData();
            postTutorData.append('docent', this.teachername);
            postTutorData.append('apikey', this.apikey);

            // maak post request naar API
            axios.post(this.URL_TUTORKLASSEN, postTutorData)
                .then((response) => {   
                this.tutorklassen = response.data.tutorklassen;
                this.docent       = response.data;
            
                })
            .catch(function (error) {
                console.log(error);
            }); 


        },
        getStudents() {
            const postTutorClassData = new FormData();

            postTutorClassData.append('docent', this.teachername);
            postTutorClassData.append('apikey', this.apikey);
            postTutorClassData.append('tutorgroep', this.selectedValue) // remove event and use selected value

            axios.post(this.URL_TUTORKLAS, postTutorClassData).then(response => {
                this.docenten = response.data.docent;
                this.leerlingen = response.data.leerlingen;

                //this.selectedValue = null; // why was this a string?
            }).catch(function (error) {
                console.log(error);
            });
        },
        getStudent(voornaam, achternaam) {
    
            this.leerlingVoornaam = voornaam;
            this.leerlingAchternaam = achternaam;

            // stuur de props leerlingVoornaam en leerlingAchternaam naar de EventBus
            EventBus.$emit('leerlingNaam', this.leerlingVoornaam + ' ' + this.leerlingAchternaam);
        }
    },
    mounted()
    {
        // Ophalen van de ApiKey prop doormiddel van een eventbus
        EventBus.$on('FormSubmitKey', apiKey => {
            this.apikey = apiKey;
        });

        // Ophalen van de teachername prop doormiddel van een eventbus
        EventBus.$on('FormSubmitName', teacherName => {
            this.teachername = teacherName;
        });
    }
}
</script>

<style lang="scss">

    .tutorklassen
    {
        min-height: 30vh;

        padding: 20px 20px;

        position: relative;

        margin: 10px 0px;

        border-radius: 15px;
        border: 2px solid #D9D9D9;
        background-color: #FFFFFF;

        .titel
        {
            > h4 
            {
                font-weight: bold;
                color: #4A4E51;
            }
        }

        .warning
        {
            position: absolute;

            top: 50%;
            left: 50%;

            transform: translate( -50%, -50% );

            color: #4A4E51;
        }

        > form 
        {
            padding: 0px 20px;

            .table-wrapper
            {
                height: 30vh;
                overflow: auto;

                border-radius: 15px;
                border: 2px solid #D9D9D9;

                &::-webkit-scrollbar
                {
                    width: 5px; 
                    height: 3px;
                }

                &::-webkit-scrollbar-track
                {
                    width: 5px;
                    background-color: transparent;
                }
                &::-webkit-scrollbar-thumb
                {
                    width: 5px;
                    border-radius: 10px;
                    background-color: rgb(4, 198, 94);
                }

                .table 
                {
                
                    > thead
                    {
                        background-color: #F7F7F7;

                        color: #4A4E51;
                    }

                    > tbody 
                    {
                        > tr 
                        {
                            &:hover 
                            {
                                cursor: pointer;

                                background-color: rgba(4, 198, 94, 0.05);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
