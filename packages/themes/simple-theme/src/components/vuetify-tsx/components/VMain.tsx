import { ofType } from 'vue-tsx-support';
import { VMain } from 'vuetify/lib';

export default ofType<Props>().convert(VMain as any);

type Props = {
  tag?: string;
};
