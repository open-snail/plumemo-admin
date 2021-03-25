import { ofType } from 'vue-tsx-support';
import { VTabItem } from 'vuetify/lib';

export default ofType<Props, Events>().convert(VTabItem as any);

interface Props {}

interface Events {}
