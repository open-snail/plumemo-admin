import { Vue, Component } from 'vue-property-decorator';
import { hook, themeFuncs } from '@/includes/functions';

// Types
import { CreateElement } from 'vue';
import { BlankLayouts } from 'types/functions/hook';

@Component({
  name: 'layoutBlank',
})
export default class LayoutBlank extends Vue {
  layout: Partial<BlankLayouts> = {
    rootWarp: undefined,
    mainWarp: undefined,
  };

  get isDark() {
    return themeFuncs.isDarkTheme();
  }

  created() {
    hook('layouts').exec(this.layout, 'blank');
  }

  render(h: CreateElement) {
    const { rootWarp = 'div', mainWarp } = this.layout;
    return h(
      rootWarp,
      {
        attrs: { id: 'blank-layout', 'data-app': 'true' },
        staticClass: 'layout',
        class: `theme--${this.isDark ? 'dark' : 'light'}`,
      },
      [mainWarp ? h(mainWarp, [h('nuxt')]) : h('nuxt')],
    );
  }
}
