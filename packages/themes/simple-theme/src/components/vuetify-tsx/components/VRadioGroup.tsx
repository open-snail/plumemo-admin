import { ofType } from 'vue-tsx-support';
import { VRadioGroup } from 'vuetify/lib';

export default ofType().convert(VRadioGroup as any);
