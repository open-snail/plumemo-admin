import '../class-component-hooks';
import { print } from '@vue-async/utils';
import routes from './router';

// Types
import { VueConstructor } from 'vue';
import { ModuleOptions } from '@plumemo/devtools/dev-admin';

export default function (this: InstanceType<VueConstructor>, Vue: VueConstructor, opts: ModuleOptions) {
  print('beautify-theme-admin', '加载成功');

  opts.addRoutes(routes);

  opts.addSiderMenus(
    [
      {
        name: 'b-theme-settings',
        title: 'Settings',
      },
    ],
    'themes',
  );
}
