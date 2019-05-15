<template>
    <section class="login">
        <div class="container">
            <div class="row">
                <div class="col-6 offset-3">
                    <div class="form">
                        <form @submit="formSubmit">
                            <div class="form-group">
                                <label for="docentNaam">Naam:</label>
                                <input v-model="docentNaam" type="text" class="form-control" placeholder="Docenten afkorting">

                                <label for="wachtwoord">Wachtwoord</label>
                                <input v-model="wachtwoord" type="password" class="form-control" placeholder="Wachtwoord">

                                 <button type="submit" class="btn btn-primary">Submit</button>
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

export default {
    name: 'Login',
    data() {
        return {
            docentNaam: '',
            wachtwoord: 'test'
        }
    },
    methods: {
        formSubmit(e) {
            e.preventDefault();
            let currentObj = this;
            axios.post('http://localhost/Leerjaar%203/api/apikey/', {
                docent: this.docentNaam,
                wachtwoord: this.wachtwoord,
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "baseURL": "http://localhost:8080",
                    "timeout": 10000,
                    "withCredentials": "true"
                },
                validateStatus: (status) => {
                    return true;
                }
            })
            .then(function (response) {
                currentObj.output = response.data;
                console.log(response.data);
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
                > div
                {
                    padding: 20px 20px;
                }
            }
        }
    }
 }
</style>

