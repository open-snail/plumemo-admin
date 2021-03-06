import { ofType } from 'vue-tsx-support';
import { VRadio } from 'vuetify/lib';

export default ofType().convert(VRadio as any);
