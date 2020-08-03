<template>
    <div class="wrapper">
        <div class="header">
            <h1 class="title">Search images!</h1>
            <form class="form">
                <input
                    class="form__input"
                    placeholder="Type to search in Flickr!"
                    type="text"
                    name="tag"
                    v-model.lazy="imageTag"
                    alt="tag input"
                    required
                />
                <button class="form__submit" type="submit" @click.prevent="search">
                    <img class="form__icon" :src="require('../assets/search.svg')" alt="search" />
                </button>
            </form>
        </div>
        <div class="content">
            <div class="loader" v-if="loading"></div>
            <ul class="gallery" v-else>
                <p class="info" v-if="images.length==0">Write something into search bar!</p>
                <ImageCard
                    v-else
                    v-for="image in AllImages"
                    :key="image.id"
                    :image="image"
                    @click="viewDetails"
                />
            </ul>
            <div class="loader" v-if="loadMore"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ImageCard from "../components/ImageCard";

export default {
    name: "Home",
    data() {
        return {
            loading: false,
            loadMore: false,
            api_key: "df215f4d9f96349638abd85a9fe506ec",
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
                this.loading = true;
                this.fetchImages().then((response) => {
                    this.images = response.data.photos.photo;
                    this.loading = false;
                });
            } else {
                document.querySelector(".info").innerHTML =
                    "First you have to write something into search bar!";
            }
        },
        fetchImages() {
            return axios({
                method: "get",
                url: "https://api.flickr.com/services/rest",
                params: {
                    method: "flickr.photos.search",
                    api_key: this.api_key,
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
        viewDetails(e) {
            console.log(e);
        },
    },
    components: {
        ImageCard,
    },
    mounted() {
        this.loadOnScroll();
    },
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    55% {
        transform: rotate(180deg);
        border-color: rgba($color: $primary-color, $alpha: 1);
    }
    100% {
        transform: rotate(360deg);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.wrapper {
    margin: 0 auto;
}

.header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.title {
    margin-top: 25px;
    color: $text-color;
    font-weight: 400;
    text-align: center;
    text-shadow: 0px 1px 1px $primary-color;
}

.form {
    display: flex;
    align-items: center;
    position: relative;
    width: 600px;
    margin: 15px 0 15px;

    &__input {
        background-color: $primary-color;
        border: 2px solid transparent;
        border-radius: 0.4rem;
        width: 100%;
        height: 60px;
        padding: 10px 55px 10px 20px;
        transition: border 0.15s ease-in;
        text-transform: uppercase;
        color: $text-color;
        font-weight: 600;

        &:focus {
            outline: none;
            border: 2px solid $text-color;
        }

        &::placeholder {
            color: $text-color;
        }

        &:focus::placeholder {
            color: $text-color;
        }
    }

    &__submit {
        background-color: transparent;
        width: 39px;
        height: 39px;
        border: none;
        font-size: 24px;
        position: absolute;
        right: 10px;

        &:hover,
        &:focus {
            cursor: pointer;
            outline: none;
        }
    }

    &__icon {
        margin-top: 7px;
        padding-left: 7px;
        border-left: 1px solid $text-color;
    }
}

.content {
    max-width: 1300px;
    margin: 20px auto 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.info {
    color: $text-color;
}

.loader {
    border: 5px solid $text-color;
    border-top: 5px solid $primary-color;
    border-bottom: 5px solid $primary-color;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1.5s ease-in-out infinite;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .form {
        width: 100%;
        padding: 0 20px;

        &__input {
        }

        &__submit {
            right: 30px;
        }
    }
}
</style>