<template>
  <li class="imageCard">
    <img
      v-img:group="{ src: image.url_o }"
      class="imageCard__img"
      :src="image.url_n"
      :alt="image.title"
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
  height: 40vh;
  flex-grow: 1;
  list-style: none;
  margin: 10px;
  position: relative;
  overflow: hidden;

  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);

  &:before {
    content: '';
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
    width: 100%;
    height: 50%;
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    transition-property: top, opacity;
    transition-duration: 0.3s;
  }

  &:last-child {
    flex-grow: 10;
  }

  &__img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    -o-object-fit: cover;
    object-position: center;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
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
      transform: scale(1);
    }

    .imageCard__title {
      transition-delay: 0.15s;
    }
  }

  &__desc {
    padding: 20px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
  }

  &__title {
    font-size: 20px;
    display: block;
    opacity: 0;
    position: relative;
    top: 100px;
    transition-property: top, opacity;
    transition-duration: 0.3s;
    transition-delay: 0s;
  }
}

// Portrait

@media (max-aspect-ratio: 1/1) {
  .imageCard {
    height: 30vh;
  }
}

// Short screens

@media (max-height: 480px) {
  .imageCard {
    height: 80vh;
  }
}

// Smaller screens in portrait

@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
  .imageCard {
    height: auto;
    width: 100%;

    &__img {
      width: 100%;
      max-height: 75vh;
      min-width: 0;
    }
  }
}
</style>
