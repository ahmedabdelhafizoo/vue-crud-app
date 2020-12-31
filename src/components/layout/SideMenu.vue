<template>
  <div class="side-menu-container" :class="{ show: getSideMenuStatus }">
    <div class="overlay" @click="toggleSideMenu"></div>
    <div class="side-menu">
      <!-- menu heading -->
      <div
        class="d-flex align-items-center justify-content-between border-bottom"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="h5 text-dark text-decoration-none"
          >App Name</router-link
        >
        <span class="h1 menu-icon" @click="toggleSideMenu">
          <b-icon icon="x"></b-icon>
        </span>
      </div>
      <!-- end menu heading -->

      <!-- menu links -->
      <ul class="nav flex-column mt-5">
        <li
          class="nav-item mb-2"
          v-for="link in menuLinks"
          :key="link.routeName"
          @click="toggleSideMenu"
        >
          <router-link
            :to="{ name: link.routeName }"
            class="nav-link text-dark"
            active-class="active"
            exact
          >
            <b-icon :icon="link.icon"></b-icon> {{ link.name }}</router-link
          >
        </li>
      </ul>
      <!-- end menu links -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
%fixed-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
}
// side-menu-container
.side-menu-container {
  .overlay {
    @extend %fixed-overlay;
    width: 100%;
    display: none;
    z-index: 99;
    background: rgba(#000, 0.4);
    cursor: pointer;
  }
  .side-menu {
    @extend %fixed-overlay;
    overflow-y: auto;
    width: 250px;
    background: #fff;
    padding: 15px;
    transform: translateX(-100%);
    transition: all 0.3s;
    z-index: 999;
  }
  &.show {
    .overlay {
      display: block;
    }
    .side-menu {
      transform: translateX(0);
    }
  }
}
// nav
.nav {
  .nav-link {
    transition: all 0.3s;
    padding: 10px;
    &:hover,
    &.active {
      background: #eee;
    }
  }
}
</style>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      menuLinks: [
        { name: "Home", icon: "house-fill", routeName: "Home" },
        { name: "Dishes List", icon: "inboxes-fill", routeName: "Dishes" },
        {
          name: "Customers List",
          icon: "people-fill",
          routeName: "Customers"
        }
      ]
    };
  },
  computed: {
    getSideMenuStatus() {
      return this.$store.getters["globalModule/getSideMenuStatus"];
    }
  }
};
</script>
