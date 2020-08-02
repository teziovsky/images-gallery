<template>
    <div class="wrapper">
        <h1 class="title">Search Images!</h1>
        <form class="form">
            <div class="field">
                <input class="form__input" type="text" name="tag" v-model="imageTag" required />
                <label class="form__label" for="tag">Type tag</label>
            </div>
            <button class="form__submit" type="submit" @click.prevent="search">
                <img src="https://img.icons8.com/material-sharp/24/000000/search.png" />
            </button>
        </form>
        <div class="loader" v-if="loading"></div>
        <ul class="gallery" v-else>
            <p v-if="images.length==0">Write something into search bar!</p>
            <ImageCard v-else v-for="image in images" :key="image.id" :image="image" />
        </ul>
        <div class="loader" v-if="loadMore"></div>
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
            return this.images.filter((image) => image.url_n);
        },
    },
    methods: {
        search() {
            this.loading = true;
            this.fetchImages().then((response) => {
                this.images = response.data.photos.photo;
                this.loading = false;
            });
        },
        fetchImages() {
            return axios({
                method: "get",
                url: "https://api.flickr.com/services/rest",
                params: {
                    method: "flickr.photos.search",
                    api_key: this.api_key,
                    tags: this.imageTag,
                    extras: "url_n, owner_name, date_taken",
                    page: this.pageNumber,
                    format: "json",
                    nojsoncallback: 1,
                    per_page: 20,
                },
            });
        },
        loadOnScroll() {
            window.onscroll = () => {
                let bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight ===
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
    },
};
</script>

<style lang="scss" scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.wrapper {
    margin: 0 auto;
    padding: 50px;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
}

.field {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
}

.form {
    display: flex;
    position: relative;
    align-items: flex-end;
    margin-bottom: 30px;

    &__label {
        order: -1;
        padding-left: 5px;
        transition: all 0.15s ease-in;
        transform: translateY(30px);
        pointer-events: none;
    }

    &__input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #000000;
        width: 300px;
        // margin: 10px 0;
        padding: 10px 35px 10px 10px;

        &:focus + .form__label {
            transform: translate(-95px, 30px);
        }
    }

    &__submit {
        background: transparent;
        border: none;
        margin-left: 5px;
        font-size: 24px;
        font-weight: 300;
        position: absolute;
        right: 5px;

        &:hover {
            cursor: pointer;
        }
    }
}

.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3948db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s ease-in-out infinite;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

@media (max-width: 576px) {
    .form__input:focus + .form__label {
        transform: translateY(-4px);
    }
}
</style>