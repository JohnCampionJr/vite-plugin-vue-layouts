<template>
  <div>
    <p>index.vue</p>
    <router-link to="/about"> about </router-link>
    <p>
      <router-link to="/news"> news </router-link> |
      <router-link :to="{ name: 'named-news-page' }">
        today's news
      </router-link>
    </p>
    <p>
      <router-link to="/sublayout"> sub layout </router-link>
    </p>
    <p>
      <router-link to="/nolayout"> no layout </router-link>
    </p>
    <p>
      <router-link to="/module1"> module 1 layout </router-link>
    </p>
    <p>
      <router-link to="/module2"> module 2 layout </router-link>
    </p>
    <p>
      <router-link to="/second"> second level layout </router-link>
    </p>
    <p>
      <router-link to="/deep">
        deep sub folder with no layout specified
      </router-link>
    </p>
  </div>
</template>

<route>
{
  name: "name-override",
  meta: {requiresAuth: false}
}
</route>
