<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Recursive:wght@300;400&display=swap");
@import "@/variables.scss";

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Recursive";
    background: $secondary-color;
}
</style>
