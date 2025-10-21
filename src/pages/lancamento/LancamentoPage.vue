<template>
    <q-page class="bg-grey-3 column q-pa-md">
        <div class="q-pa-sm">
            <q-table title="Lançamentos" :rows="rows" :columns="columns" row-key="id" :loading="loading"
                :pagination="configPagination">

                <template v-slot:body-cell-action="props">
                    <q-td auto-width :props="props">
                        <q-btn clickable dense round color="primary" icon="edit" />
                    </q-td>
                </template>

                <template v-slot:top>
                    <div class="text-h5">Lançamentos</div>
                    <q-btn round color="primary" icon="add" title="Cadastrar" class="q-ml-sm" @click="novoLancamento()"
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
import ModalNovoLancamento from './ModalNovoLancamento.vue';
import { moneyToDB } from 'src/helpers/money';

defineOptions({
    name: "LancamentoPage",
})

const columns: any = [
    {
        name: "id",
        label: "#",
        align: "left",
        field: "id"
    },
    {
        name: "id",
        label: "Descrição do lançamento",
        align: "left",
        field: "descricao_lancamento"
    },
    {
        name: "tipo_lancamento",
        label: "Tipo de lançamento",
        align: "left",
        field: "tipo_lancamento"
    },
    {
        name: "conta_id",
        label: "Conta",
        align: "left",
        field: "conta_id"
    },
    {
        name: "valor_lancamento",
        label: "Valor",
        align: "left",
        field: "valor_lancamento",
        
    },
    {
        name: "data_lancamento",
        label: "Data do lançamento",
        align: "left",
        field: "data_lancamento"
    },
    {
        name: "cliente_id",
        label: "Cliente",
        align: "left",
        field: "cliente_id"
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
        .get("/lancamentos")
        .then(function (response) {
            console.log("dados: ",response.data)
            rows.value = response.data.data;

            loading.value = false;
        })
}

function novoLancamento() {
    $q.dialog({
        component: ModalNovoLancamento,        
    }).onOk(() => {
        getData();
    })
}

</script>
