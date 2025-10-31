<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" v-model="medium">
        <q-card class="bg-dark text-white" style="width: 700px; max-width: 80vw;">
            <q-form @submit="editLancamento">
                <q-card-section>
                    <div class="text-h6">Editar Lançamento</div>
                </q-card-section>

                <q-card-section class="bg-white q-gutter-md">
                    <div class="bg-white text-teal">
                        <q-input v-model="state.descricao_lancamento" label="Descrição *" autofocus lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Descrição do lançamento é obrigatório']" />

                        <q-select v-model="state.tipo_lancamento" :options="options" option-label="nome"
                            label="Tipo *" />

                        <q-select v-model="state.conta_id" :options="contas" option-value="id" emit-value option-label="conta"
                            map-options label="Conta
                             *" />
                    </div>

                    <div class="bg-white text-teal">
                        <q-input v-model="state.valor_lancamento" label="Valor *" autofocus lazy-rules
                            :rules="[(val) => (val && val.length > 0) || 'Valor do lançamento é obrigatório']" />

                        <q-input round color="primary" mask="##/##/####" v-model="state.data_vencimento" label="Data *"
                            lazy-rules :rules="[(val) => (val && val.length > 0) || 'Data do vencimento é obrigatório'
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
import { useQuasar } from 'quasar';
import { formatarValorParaEnvio, formatarValorParaExibir } from 'src/helpers/formats';

export default {
    props: { payload: Object },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
        const $q = useQuasar();

        const state = reactive({
            //lançamentos
            id: props.payload.id,
            descricao_lancamento: props.payload.descricao_lancamento,
            tipo_lancamento: props.payload.tipo_lancamento,
            conta_id: props.payload.conta_id,
            conta: props.payload.conta,
            valor_lancamento: formatarValorParaExibir(props.payload.valor_lancamento),
            data_vencimento: formatarDataPayloadEdit(props.payload.data_vencimento),
            cliente_id: props.payload.cliente_id,
            nome: props.payload.nome,

            //contas
            //id: "",
            //conta: ""
        });

        const clientes = ref(null);
        const contas = ref(null);

        const dataVencimentoFormatada = computed(() => {
            return state.data_vencimento ? formatarDataComIntl(state.data_vencimento) : '';
        });

        onMounted(() => {
            oterCientes();
            obterContas();

            //console.log(formatarDataComIntl('06/11/2025')); // 2025-11-06 ✅
        })


        function editLancamento() {
            const payload = {
                id: state.id,
                descricao_lancamento: state.descricao_lancamento,
                tipo_lancamento: state.tipo_lancamento,
                conta_id: state.conta_id,
                valor_lancamento: state.valor_lancamento,
                data_vencimento: formatarValorParaEnvio(dataVencimentoFormatada.value),
                cliente_id: state.cliente_id,
            };

            console.log("Payload edição para API:", payload);

            api.put("/update-lancamento", payload).then((response) => {
                console.log("edição: ", response)
                if (response.status === 201) {
                    onDialogOK();
                    $q.notify({
                        type: 'positive',
                        message: response.data.message, // ← Mensagem do seu backend
                        position: 'top',
                        timeout: 3000
                    });
                } else {
                    //console.log("cadastro: ", response)
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
                //console.log("clientes: ", response.data.data);
                clientes.value = response.data.data
            })
        }

        async function obterContas() {
            api.get("/contas").then(function (response) {
                console.log("contas: ", response.data.data);
                contas.value = response.data.data
            })
        }

        function formatarDataComIntl(data) {
            if (!data) return '';

            // Se está no formato dd/mm/yyyy
            if (typeof data === 'string' && data.includes('/')) {
                const [dia, mes, ano] = data.split('/');
                return `${ano}-${mes}-${dia}`; // yyyy-mm-dd
            }

            // Se for Date object
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

        function formatarDataPayloadEdit(data) {
            if (!data) return '';

            // Se já estiver no formato dd/mm/yyyy, retorna como está
            if (data.includes('/')) return data;

            // Se vier no formato yyyy-mm-dd, converte para dd/mm/yyyy
            if (data.includes('-')) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }

            // Caso seja um Date object
            const d = new Date(data);
            if (!isNaN(d)) {
                return d.toLocaleDateString('pt-BR'); // já retorna dd/mm/yyyy
            }

            return '';
            }


        return {
            dialogRef,
            onDialogHide,
            editLancamento,
            onCancelClick: onDialogCancel,
            state,
            small: ref(false),
            medium: ref(true),
            fullWidth: ref(false),
            fullHeight: ref(false),
            options: ["Despesa", "Receita"],
            clientes,
            contas,
            formatarDataComIntl,
            formatarDataPayloadEdit
        };
    },
};
</script>