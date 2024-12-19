<template>
    <section data-aos="fade-down">
        <!-- <p class="absolute -top-10 left-14 ">Hello I'm</p> -->
        <div class="content">
            <h2>{{ locale=='en' ? 'Soun Soratha' : 'សួន សុរដ្ឋា' }}</h2>
            <h2>{{ locale=='en' ? 'Soun Soratha' : 'សួន សុរដ្ឋា' }}</h2>
        </div>
    </section>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { locale } = useI18n();



</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");





.content h2 {
    color: #fff;
    font-size: 8em;
    position: absolute;
    transform: translate(0%, -90%);
}

.content h2:nth-child(1) {
    color: transparent;
    font-weight: bold;
    font-size: 5rem;
    -webkit-text-stroke: 2px #03a9f4;
}

.content h2:nth-child(2) {
    color: #03a9f4;
    font-weight: bold;
    font-size: 5rem;

    animation: animate 4s ease-in-out infinite;
}

@keyframes animate {

    0%,
    100% {
        clip-path: polygon(0% 45%,
                16% 44%,
                33% 50%,
                54% 60%,
                70% 61%,
                84% 59%,
                100% 52%,
                100% 100%,
                0% 100%);
    }

    50% {
        clip-path: polygon(0% 60%,
                15% 65%,
                34% 66%,
                51% 62%,
                67% 50%,
                84% 45%,
                100% 46%,
                100% 100%,
                0% 100%);
    }
}

/* responsive */
@media (max-width: 1300px) {
    .content h2 {
        font-size: 7em;
        transform: translate(0%, -90%);
    }

    .content h2:nth-child(1) {
        font-size: 4rem;
    }

    .content h2:nth-child(2) {
        font-size: 4rem;
    }
}

@media (max-width:888px) {
    .content h2 {
        font-size: 6em;
        transform: translate(0%, -90%);
    }

    .content h2:nth-child(1) {
        font-size: 4rem;
    }

    .content h2:nth-child(2) {
        font-size: 4rem;
    }

}

@media (max-width: 767px) {
    /* .content {
        display: flex;
    } */

    .content h2 {
        font-size: 5em;
        transform: translate(20%, -540%);
    }

    .content h2:nth-child(1) {
        font-size: 3rem;
    }

    .content h2:nth-child(2) {
        font-size: 3rem;
    }

    p {
        transform: translate(50%, -30%);
    }
}
</style>