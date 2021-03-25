import { ofType } from 'vue-tsx-support';
import { VApp as _VApp } from 'vuetify/lib';

const VApp = ofType().convert(_VApp);

export { VApp };
export default VApp;
