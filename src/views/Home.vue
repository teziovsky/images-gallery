<template>
    <div class="wrapper">
        <input
            class="searchBar"
            placeholder="Type to search in Flickr..."
            type="text"
            name="searchbar"
            v-model.lazy="imageTag"
            @change="search"
            @keyup.enter="search"
        />
        <ul class="gallery">
            <div class="loader centered" v-show="loading"></div>
            <transition name="fade" mode="out-in" appear>
                <p class="info" v-show="!images.length">
                    Find your dream picture...
                </p>
            </transition>
            <ImageCard
                v-for="image in AllImages"
                :key="image.id"
                :image="image"
            />
            <span class="break"></span>
            <div class="loader" v-if="loadMore"></div>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import ImageCard from "../components/ImageCard";
import { api_key } from "../config";

export default {
    name: "Home",
    data() {
        return {
            loading: false,
            loadMore: false,
            imageTag: "",
            images: [],
            pageNumber: 1,
        };
    },
    computed: {
        AllImages() {
            return this.images
                .filter((image) => image.title)
                .filter((image) => image.url_o);
        },
    },
    methods: {
        search() {
            if (this.imageTag != "") {
                this.images.length === 0 ? (this.loading = true) : "";
                this.fetchImages().then((response) => {
                    this.loading = false;
                    this.images = response.data.photos.photo;
                });
            } else {
                document.querySelector(".searchBar").focus();
                this.images = [];
            }
        },
        fetchImages() {
            return axios({
                method: "get",
                url: "https://api.flickr.com/services/rest",
                params: {
                    method: "flickr.photos.search",
                    api_key: api_key,
                    tags: this.imageTag,
                    extras: "url_n, url_o, title",
                    page: this.pageNumber,
                    format: "json",
                    nojsoncallback: 1,
                    per_page: 40,
                },
            });
        },
        loadOnScroll() {
            window.onscroll = () => {
                let bottomOfWindow =
                    Math.round(document.documentElement.scrollTop) +
                        window.innerHeight ==
                    document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    this.pageNumber++;
                    this.loadMore = true;
                    this.fetchImages().then((response) => {
                        this.images.push(...response.data.photos.photo);
                        this.loadMore = false;
                    });
                }
            };
        },
    },
    components: {
        ImageCard,
    },
    mounted() {
        this.loadOnScroll();
        document.querySelector(".searchBar").focus();
    },
};
</script>

<style lang="scss" scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
        border-top-color: rgba($color: $white-color, $alpha: 1);
        border-bottom-color: rgba($color: $white-color, $alpha: 1);
        border-width: 10px;
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
        border-left-color: rgba($color: $white-color, $alpha: 1);
        border-right-color: rgba($color: $white-color, $alpha: 1);
        border-width: 20px;
    }
    100% {
        transform: rotate(360deg);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.wrapper {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    position: relative;
}

.searchBar {
    background: url("../assets/search.svg")
        rgba($color: $white-color, $alpha: 0.8) no-repeat scroll 15px 12px;
    border: none;
    border-radius: 25px;
    display: block;
    height: 50px;
    width: 90%;
    max-width: 500px;
    padding: 10px 10px 10px 55px;
    margin: 25px auto;
    color: $font-color;

    &:focus,
    &:hover {
        outline: none;
        box-shadow: 0px 3px 5px rgba($color: #000000, $alpha: 0.4);
        transition: box-shadow 0.15s ease-in;
    }

    &::placeholder {
        color: $placeholder-color;
    }

    &:focus::placeholder {
        color: $placeholder-color;
    }
}

.loader {
    border: 5px solid $background-color;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin: 15px auto;
    animation: spin 1s ease-in-out infinite;
}

.break {
    height: 0;
    flex-basis: 100%;
}

.gallery {
    max-width: 90%;
    min-height: 70vh;
    margin: 0 auto;
    padding: 10px;
    background: rgba($color: #ffffff, $alpha: 0.3);
    display: flex;
    flex-wrap: wrap;
}

.info {
    font-size: 24px;
    color: $white-color;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>