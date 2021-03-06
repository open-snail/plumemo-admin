import { ofType } from 'vue-tsx-support';
import { VContent } from 'vuetify/lib';

export default ofType().convert(VContent as any);
