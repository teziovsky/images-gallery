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
$breakpoint-sm: 576px;
.imageCard {
    list-style: none;
    position: relative;

    &__img {
        height: 200px;
        width: 200px;
        object-fit: cover;
        margin: 5px;
        border-radius: 15px;

        &:hover {
            border: 2px solid #000;
            cursor: pointer;
        }
    }
}

@media (max-width: $breakpoint-sm) {
    .imageCard__img {
        width: 300px;
        height: auto;
    }
}
</style>