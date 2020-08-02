<template>
    <li class="imageCard">
        <img class="imageCard__img" :src="image.url_n" :alt="image.title" />
    </li>
</template>

<script>
export default {
    name: "ImageCard",
    props: ["image"],
};
</script>

<style lang="scss" scoped>
.imageCard {
    list-style: none;
    position: relative;

    &__img {
        height: 200px;
        width: 200px;
        object-fit: cover;
        margin: 5px;
        border-radius: 15px;
        transition: transform 0.3s ease;

        &:hover {
            position: relative;
            border: 1px solid #000;
            cursor: pointer;
            transform: scale(1.2);
            z-index: 2;
        }
    }
}

@media (max-width: 576px) {
    .imageCard__img {
        width: 300px;
        height: auto;
    }
}
</style>