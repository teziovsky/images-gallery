<template>
  <li class="imageCard">
    <img
      v-img:group="{ src: image.url_o }"
      :alt="image.title"
      :src="image.url_n"
      class="imageCard__img"
    />
    <div class="imageCard__desc">
      <span class="imageCard__title">{{ image.title }}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ImageCard',
  props: ['image'],
};
</script>

<style lang="scss" scoped>
.imageCard {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 300px;
  margin: 10px;
  list-style: none;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);

  &:before {
    position: absolute;
    z-index: 2;
    top: 100%;
    left: 0;
    width: 100%;
    height: 50%;
    content: '';
    transition-duration: 0.3s;
    transition-property: top, opacity;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
  }

  &__img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    transform: scale(1);
    object-fit: cover;
    -o-object-fit: cover;
    object-position: center;
  }

  &:focus,
  &:hover {
    cursor: pointer;

    &:before,
    span {
      opacity: 1;
    }

    &:before {
      top: 50%;
    }

    span {
      top: 0;
    }

    .imageCard__img {
      transform: scale(1.1);
    }

    .imageCard__title {
      transition-delay: 0.15s;
    }
  }

  &__desc {
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    padding: 20px;
    pointer-events: none;
    color: #FFFFFF;
  }

  &__title {
    font-size: 20px;
    position: relative;
    top: 100px;
    display: block;
    transition-delay: 0s;
    transition-duration: 0.3s;
    transition-property: top, opacity;
    opacity: 0;
  }
}
</style>
