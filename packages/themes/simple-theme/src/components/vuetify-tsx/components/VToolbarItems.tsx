import { ofType } from 'vue-tsx-support';
import { VToolbarItems } from 'vuetify/lib';

export default ofType().convert(VToolbarItems as any);
