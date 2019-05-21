<template>
    <header class="navigation">
        <div class="logo">
            <a href="/">
                <img src="../assets/Logo2.png" alt="">
            </a>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss">
    .navigation
    {
        height: 100px;
        width: 100%;

        position: fixed;
        top: 0;
        left: 0;

        background-color: #00262F;

        margin-bottom: 100px;

        z-index: 1000;

        .logo
        {
            margin-left: 15px;
            > a 
            {
                > img 
                {
                    height: 100px;
                }
            }
        }
    }
</style>
