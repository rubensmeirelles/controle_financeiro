<template>
    <q-page class="bg-grey-3 column q-pa-md">
        <div class="q-pa-sm">
            <q-table title="Clientes" :rows="rows" :columns="columns" row-key="id" :loading="loading"
                :pagination="configPagination">

                <template v-slot:body-cell-action="props">
                    <q-td auto-width :props="props">
                        <q-btn clickable dense round color="primary" icon="edit" />
                    </q-td>
                </template>

                <template v-slot:top>
                    <div class="text-h5">Clientes</div>
                    <q-btn round color="primary" icon="add" title="Cadastrar" class="q-ml-sm" @click="novoCliente()"
                         />
                    <q-space />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import ModalNovoCliente from './ModalNovoCliente.vue';

defineOptions({
    name: "LancamentoPage",
})

const columns: any = [
    {
        name: "id",
        label: "#",
        align: "left",
        field: "id",
        sortable: true
    },

    {
        name: "nome",
        label: "Nome",
        align: "left",
        field: "nome",
        sortable: true
    },
    {
        name: "email",
        label: "E-mail",
        align: "left",
        field: "email",
        sortable: true
    },
    {
        name: "action",
        label: "Ações",
        align: "center"
    }
];

const $q = useQuasar();
const rows = ref([]);
const loading = ref(false);

const configPagination = {
    page: 1,
    rowsPerPage: 10,
};

onMounted(() => {
    getData();
})

async function getData() {
    loading.value = true;
    api
        .get("/clientes")
        .then(function (response) {
            rows.value = response.data.data;
            loading.value = false;
        })
}

function novoCliente() {
    $q.dialog({
        component: ModalNovoCliente,        
    }).onOk(() => {
        getData();
    })
}

</script>
