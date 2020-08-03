<template>
    <li class="imageCard">
        <img class="imageCard__img" :src="image.url_n" :alt="image.title" />
        <div class="overlay">
            <a
                class="imageCard__external"
                :href="image.url_o"
                target="_blank"
                rel="noopener noreferrer"
            >FULL SIZE IMAGE</a>
        </div>
    </li>
</template>

<script>
export default {
    name: "ImageCard",
    props: ["image"],
};
</script>

<style lang="scss" scoped>
@import "@/variables.scss";

.imageCard {
    width: 200px;
    height: 200px;
    border-radius: 2px;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3px;
    position: relative;
    overflow: hidden;

    &__img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 4px;
        transition: transform 0.3s ease;
    }

    &__external {
        position: absolute;
        border: 2px solid $primary-color;
        padding: 5px;
        text-decoration: none;
        color: $primary-color;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.5s ease-in;

        &:hover {
            box-shadow: 0px 0px 3px 0px $primary-color;
        }
    }

    &:hover &__external {
        opacity: 1;
    }

    &:hover &__img {
        filter: blur(5px);
    }
}

.overlay {
    width: 100%;
    height: 100%;
    background-color: rgba($color: $secondary-color, $alpha: 0.9);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    transition: opacity 0.3s ease-in;
    opacity: 0;
}

.imageCard:hover > .overlay {
    opacity: 1;
}

@media (max-width: 576px) {
    .imageCard__img {
        width: 300px;
        height: auto;
    }
}
</style>