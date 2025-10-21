<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Controle Financeiro Pessoal
        </q-toolbar-title>

        <div>
          Administrador
          <q-icon name="account_circle" size="lg"></q-icon>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header>Menu</q-item-label>
          <q-item clickable @click="$router.push({ path: '/' })" v-ripple>
            <q-item-section avatar>
              <q-icon name="fa-solid fa-dashboard" />
            </q-item-section>
            <q-item-section>Início</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push({ path: '/lancamentos' })"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-sack-dollar" />
            </q-item-section>
            <q-item-section>Lançamentos</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push({ path: '/categorias' })"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-list-ol" />
            </q-item-section>
            <q-item-section>Categorias</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push({ path: '/clientes' })"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-dolly" />
            </q-item-section>
            <q-item-section>Clientes</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push({ path: '/produtos' })"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-box-open" />
            </q-item-section>
            <q-item-section>Produtos</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="$router.push({ path: '/clientes' })"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-users" />
            </q-item-section>
            <q-item-section>Clientes</q-item-section>
          </q-item>

          <q-separator />
          <!-- <q-item clickable @click="logout" v-ripple position="bottom">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Sair </q-item-section>
          </q-item> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss">
// .toolbar{
//   color: $orange-10;
//   background-color: $orange-12

// }
</style>
