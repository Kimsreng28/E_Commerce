<template>
  <nav class="breadcrumb">
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
          {{ crumb.name }}
        </router-link>
        <span v-else>{{ crumb.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Generate breadcrumbs based on the current route
    const breadcrumbs = computed(() => {
      const pathArray = route.path.split("/").filter(Boolean);
      return pathArray.map((path, index) => {
        const fullPath = `/${pathArray.slice(0, index + 1).join("/")}`;
        const routeName = router.resolve(fullPath).meta?.breadcrumb || path;

        return {
          name: routeName.charAt(0).toUpperCase() + routeName.slice(1),
          path: fullPath,
        };
      });
    });

    return {
      breadcrumbs,
    };
  },
};
</script>

<style scoped>
.breadcrumb ul {
  display: flex;
  list-style: none;
  justify-content: start;
  align-items: center;
}

.breadcrumb li {
  margin-right: 8px;
  font-size: 16px;
  font-family: Quicksand, sans-serif;
  color: #000000;
  cursor: pointer;
}

.breadcrumb li span {
  font-weight: bold;
}

.breadcrumb li::after {
  content: "/";
  margin-left: 8px;
}

.breadcrumb li:last-child::after {
  content: "";
}
</style>
