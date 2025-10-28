<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" v-model="medium">
        <q-card class="bg-dark text-white" style="width: 700px; max-width: 80vw;">
            <q-form @submit="cadastrar">
                <q-card-section>
                    <div class="text-h6">Novo Lançamento</div>
                </q-card-section>

                <q-card-section class="bg-white q-gutter-md">
                    <div class="bg-white text-teal">
                        <q-input v-model="state.descricao_lancamento" label="Descrição *" autofocus lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Descrição do lançamento é obrigatório']" />

                        <q-select v-model="state.tipo_lancamento" :options="options" option-label="nome"
                            label="Tipo *" />

                        <q-input v-model="state.conta_id" label="Conta *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Conta de lançamento é obrigatório'
                        ]" />
                    </div>

                    <div class="bg-white text-teal">
                        <q-input v-model="state.valor_lancamento" label="Valor *" autofocus lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Valor do lançamento é obrigatório']" />

                        <q-input round color="primary" v-model="state.data_vencimento" label="Data *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Data do vencimento é obrigatório'
                        ]" />

                        <q-select v-model="state.cliente_id" :options="clientes" option-value="id" emit-value
                            option-label="nome" map-options label="Cliente
                             *" />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn icon="check" color="primary" type="submit" />
                    <q-btn icon="close" color="negative" @click="onCancelClick" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import { useDialogPluginComponent } from 'quasar';
import { api } from 'src/boot/axios';
import { useQuasar, date } from 'quasar';

export default {
    emits: [...useDialogPluginComponent.emits],
    setup() {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
        const $q = useQuasar();

        const state = reactive({
            descricao_lancamento: "",
            tipo_lancamento: "",
            conta_id: "",
            valor_lancamento: "",
            data_vencimento: "",
            cliente_id: "",
        });

        const clientes = ref(null);

        const dataVencimentoFormatada = computed(() => {
            return state.data_vencimento ? formatarDataComIntl(state.data_vencimento) : '';
        });

        onMounted(() => {
            oterCientes();
        })


        function cadastrar() {
            const payload = {
                descricao_lancamento: state.descricao_lancamento,
                tipo_lancamento: state.tipo_lancamento,
                conta_id: state.conta_id,
                valor_lancamento: state.valor_lancamento,
                data_vencimento: dataVencimentoFormatada.value,
                cliente_id: state.cliente_id,
            };

            console.log("Payload Final para API:", payload);

            api.post("/add-lancamento", payload).then((response) => {
                console.log("cadastro: ", response)
                if (response.status === 201) {
                    onDialogOK();
                    $q.notify({
                        type: 'positive',
                        message: response.data.message, // ← Mensagem do seu backend
                        position: 'top',
                        timeout: 3000
                    });
                } else {
                    console.log("cadastro: ", response)
                    $q.notify({
                        type: 'negative',
                        message: response.data.message, // ← Mensagem do seu backend
                        position: 'top',
                        timeout: 3000
                    });
                }
            });
        }

        async function oterCientes() {
            api.get("/clientes").then(function (response) {
                console.log("clientes: ", response.data.data);
                clientes.value = response.data.data
            })
        }

        function formatarDataComIntl(data) {
            if (!data) return '';

            return new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
                .format(new Date(data))
                .split('/')
                .reverse()
                .join('-');
        }


        return {
            dialogRef,
            onDialogHide,
            cadastrar,
            onCancelClick: onDialogCancel,
            state,
            small: ref(false),
            medium: ref(true),
            fullWidth: ref(false),
            fullHeight: ref(false),
            options: ["Despesa", "Receita"],
            clientes,
            formatarDataComIntl
        };
    },
};
</script>