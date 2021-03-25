import { ofType } from 'vue-tsx-support';
import { VSelect } from 'vuetify/lib';

export default ofType().convert(VSelect as any);
