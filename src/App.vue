<template>
  <v-app>
    <v-main>
      <template v-if="authState.isAuthenticated">
        <MainComponent/>
      </template>
      <template v-else>
        <div class="h-100 d-flex align-center justify-center">
          <v-btn prepend-icon="mdi-login" @click="login">
            Login
          </v-btn>
        </div>
      </template>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import MainComponent from "@/components/MainComponent.vue";
import useAuth from "@/config/useAuth";

const {state: authState, login, handleRedirect} = useAuth();
handleRedirect();

</script>
