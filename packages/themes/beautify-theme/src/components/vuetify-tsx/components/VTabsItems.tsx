import { ofType } from 'vue-tsx-support';
import { VTabsItems } from 'vuetify/lib';

export default ofType<Props, Events>().convert(VTabsItems as any);

interface Props {}

interface Events {}
