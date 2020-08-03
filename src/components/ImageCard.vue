<template>
    <li class="imageCard">
        <img class="imageCard__img" :src="image.url_n" :alt="image.title" />
        <div class="overlay">
            <a
                class="imageCard__external"
                :href="image.url_o"
                target="_blank"
                rel="noopener noreferrer"
            >IMAGE FULL SIZE</a>
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
        height: 200px;
        width: 100%;
        border: 2px solid transparent;
        object-fit: cover;
        -o-object-fit: cover;
        object-position: bottom;
        border-radius: 4px;
        transition: transform 0.3s ease;
    }

    &__external {
        position: absolute;
        border: 3px solid $text-color;
        padding: 7px;
        text-decoration: none;
        color: $text-color;
        font-weight: 500;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease-in;
        transition: visibility 0.3s 0.25s ease-in;

        &:hover {
            box-shadow: 0px 0px 3px 0px $text-color;
        }
    }

    &:hover &__external {
        opacity: 1;
        visibility: visible;
    }

    &:hover &__img {
        filter: blur(2px);
    }
}

.overlay {
    width: 100%;
    height: 100%;
    bottom: 0;
    background-color: rgba($color: $primary-color, $alpha: 0.8);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba($color: $text-color, $alpha: 1);
    transition: opacity 0.2s ease-in;
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