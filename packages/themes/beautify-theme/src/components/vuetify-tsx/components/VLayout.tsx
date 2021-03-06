import { ofType } from 'vue-tsx-support';
import { VLayout } from 'vuetify/lib';

export default ofType<Props>().convert(VLayout as any);

type Props = {
  column?: boolean;
  row?: boolean;
  wrap?: boolean;
};
