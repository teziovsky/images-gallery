<template>
  <div class="wrapper">
    <input
      v-model.lazy="imageTag"
      class="searchBar"
      name="searchbar"
      placeholder="Type to search in Flickr..."
      type="text"
      @change="search"
      @keyup.enter="search"
    />
    <ul class="gallery">
      <div v-show="loading" class="loader centered"></div>
      <transition appear mode="out-in" name="fade">
        <p v-show="!images.length" class="info">Discover your ideal image...</p>
      </transition>
      <ImageCard v-for="image in AllImages" :key="image.id" :image="image" />
      <div v-if="loadMore" class="loader"></div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import ImageCard from '../components/ImageCard';

export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      loadMore: false,
      imageTag: '',
      images: [],
      pageNumber: 1,
    };
  },
  computed: {
    AllImages() {
      return this.images.filter((image) => image.title).filter((image) => image.url_o);
    },
  },
  methods: {
    search() {
      if (this.imageTag !== '') {
        if (this.images.length === 0) this.loading = true;
        this.fetchImages().then(({ data }) => {
          this.images = data.photos.photo;
        }).finally(() => {
          this.loading = false;
        });
      } else {
        document.querySelector('.searchBar').focus();
        this.images = [];
      }
    },
    fetchImages() {
      return axios({
        method: 'get',
        url: 'https://api.flickr.com/services/rest',
        params: {
          method: 'flickr.photos.search',
          api_key: '7d9a9ad0f2d2f7f4db0257b63cbd3e93',
          tags: this.imageTag,
          extras: 'url_n, url_o, title',
          page: this.pageNumber,
          format: 'json',
          nojsoncallback: 1,
          per_page: 40,
        },
      });
    },
    loadOnScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.round(document.documentElement.scrollTop) + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.pageNumber++;
          this.loadMore = true;
          this.fetchImages().then(({ data }) => {
            this.images.push(...data.photos.photo);
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
    document.querySelector('.searchBar').focus();
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
    border-top-color: rgba($white-color, 1);
    border-bottom-color: rgba($white-color, 1);
    border-width: 10px;
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
    border-left-color: rgba($white-color, 1);
    border-right-color: rgba($white-color, 1);
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

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.wrapper {
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.searchBar {
  display: block;
  width: 90%;
  max-width: 500px;
  height: 50px;
  margin: 25px auto;
  padding: 10px 10px 10px 55px;
  color: $font-color;
  border: none;
  border-radius: 25px;
  background: url('../assets/search.svg') rgba($white-color, 0.8) no-repeat scroll 15px 12px;

  &:focus,
  &:hover {
    transition: box-shadow 0.15s ease-in;
    outline: none;
    box-shadow: 0 3px 5px rgba(#000000, 0.4);
  }

  ::placeholder {
    color: $placeholder-color;
  }
}

.loader {
  width: 80px;
  height: 80px;
  margin: 15px auto;
  animation: spin 1s ease-in-out infinite;
  border: 5px solid $background-color;
  border-radius: 50%;
  grid-column: 1/4;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 90%;
  min-height: 70vh;
  margin: 0 auto;
  padding: 10px;
  background: rgba(#ffffff, 0.3);
}

.info {
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $white-color;
}
</style>
