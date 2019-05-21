<template>
    <section class="Verplaatsen">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="verplaatsen">

                        <div class="titel">
                            <h4>Verplaats student</h4>
                            <hr>
                        </div>

                        <form>
                            <div class="row">
                                <div class="col-5">
                                    <input v-model="leerlingNaam" type="text" class="student-name form-control" placeholder="Leerling naam">
                                </div>
                                <div class="col-3">
                                    <select class="select-klas form-control">
                                        <option disabled selected value> Selecteer een tutorgroep </option>
                                        <option v-for="(tutorklas, index) in tutorklassen" :key="index">{{ tutorklas.id }}</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                    <button type="submit" class="btn btn-primary">Verplaats student</button>
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
import { EventBus } from '../event-bus.js';
import axios from 'axios';

export default {
    name: 'Verplaatsen',
    data() {
        return {

            leerlingNaam: '',

            teachername: '',
            apikey: '',
            URL_TUTORKLASSEN: 'http://localhost/api/tutorklassen/',

            tutorklassen: [],
            docent: []
        }
    },
    methods: {
    
    },
    created() {
        const postTutorData = new FormData();
        postTutorData.append('docent', this.teachername);
        postTutorData.append('apikey', this.apikey);

        // maak post request naar API
        axios.post(this.URL_TUTORKLASSEN, postTutorData)
            .then((response) => {   
            this.tutorklassen = response.data.tutorklassen;
            this.docent       = response.data;
            
            console.log(this.tutorklassen);
            })
        .catch(function (error) {
            console.log(error);
        });
    },
    mounted () {
        // Ophalen van de leerling naam doormiddel van een Eventbus
        EventBus.$on('leerlingNaam', leerlingNaam => {
            this.leerlingNaam = leerlingNaam;
        });

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
    section {

        .verplaatsen 
        {
            //border-radius: 30px;
            border-radius: 15px;
            border: 2px solid #D9D9D9;
            background-color: #FFFFFF;

            padding: 30px 20px;

            .titel
            {
                > h4 
                {
                    font-weight: bold;
                    color: #4A4E51;
                }
            }

            > form 
            {
                .btn 
                {
                    white-space: nowrap;
                    width: auto;

                    background-color: rgb(4, 198, 94);

                    border-color: transparent;
                    border-radius: 30px;

                    font-weight: bold;
                }
            }

        }
    }

</style>
