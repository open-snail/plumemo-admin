import { Vue, Component } from 'vue-property-decorator';
import { VMain } from '../vuetify-tsx';

// Types
import { Component as VueComponent, AsyncComponent, CreateElement } from 'vue';

@Component({
  name: 'bThemeMainWarp',
})
export default class MainWarp extends Vue {
  pageBeforePlugins: Array<VueComponent | AsyncComponent> = [];
  pageAfterPlugins: Array<VueComponent | AsyncComponent> = [];

  // get userInfo() {
  //   return this.getUserInfo();
  // }

  created() {
    this.hook('page-before')
      .filter(this.pageBeforePlugins)
      .then((plugins: Array<VueComponent | AsyncComponent>) => (this.pageBeforePlugins = plugins));

    this.hook('page-after')
      .filter(this.pageAfterPlugins)
      .then((plugins: Array<VueComponent | AsyncComponent>) => (this.pageAfterPlugins = plugins));
  }

  render(h: CreateElement) {
    return (
      <VMain>
        {this.pageBeforePlugins && this.pageBeforePlugins.length
          ? this.pageBeforePlugins.map((plugin) => h(plugin))
          : null}
        {this.$slots.default}
        {this.pageAfterPlugins && this.pageAfterPlugins.length
          ? this.pageAfterPlugins.map((plugin) => h(plugin))
          : null}
      </VMain>
    );
  }
}
