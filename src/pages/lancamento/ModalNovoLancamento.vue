<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="bg-dark text-white" style="width: 700px; max-width: 80vw;">
            <q-form @submit="cadastrar" class="q-gutter-md">
                <q-card-section>
                    <div class="text-h6">Novo Lançamento</div>
                </q-card-section>

                <q-card-section class="bg-white text-teal">
                    <q-input v-model="state.nome" label="Nome do cliente *" autofocus lazy-rules
                        :rules="[(val) => (val && val.length > 0) || 'O nome é obrigatório']" />

                    <q-input v-model="state.email" label="E-mail do cliente *" lazy-rules :rules="[(val) => (val && val.length > 0) || 'E-mail é obrigatório'
                    ]" />
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn icon="check" color="primary" type="submit" />
                    <q-btn icon="close" color="negative" @click = "onCancelClick" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import { reactive } from 'vue'
import { useDialogPluginComponent } from 'quasar';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

export default {
    emits: [...useDialogPluginComponent.emits],
    setup() {       
        const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
        const $q = useQuasar();

        const state = reactive({
            nome: "",
            email: ""
        });

        function cadastrar() {
            api.post("/add-cliente", state).then((response) => {
                console.log("cadastro: ",response)
                if (response.status === 201) {
                    onDialogOK();
                    $q.notify({
                        type: 'positive',
                        message: response.data.message, // ← Mensagem do seu backend
                        position: 'top',
                        timeout: 3000
                    });
                } else {
                    console.log("cadastro: ",response)
                    $q.notify({
                        type: 'negative',
                        message: response.data.message, // ← Mensagem do seu backend
                        position: 'top',
                        timeout: 3000
                    });
                }
            });
        }

        return {
           dialogRef,
           onDialogHide,
           cadastrar,
           onCancelClick: onDialogCancel,
           state,
        };
    },
};
</script>