<template>
    <div class="wrapper">
        <form>
            <label for="tag">Search tag</label>
            <input type="text" name="tag" v-model="imageTag" />
            <input type="submit" value="Search" @click.prevent="search" />
        </form>
        <div class="loader" v-if="loading"></div>
        <ul class="gallery" v-else>
            <ImageCard v-for="image in images" :key="image.id" :image="image" />
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
            imageTag: "cats",
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
    beforeMount() {
        this.search();
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
    max-width: 1200px;
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
</style>