import { Vue, Component } from 'vue-property-decorator';
import { VContainer, VFooter, VCard, VDivider } from '../vuetify-tsx';

// Types
import { Component as VueComponent, CreateElement } from 'vue';

@Component({
  name: 'bThemeFooter',
})
export default class Footer extends Vue {
  widgets: VueComponent[] = [];
  copyright: string | null = '';
  icp: string | null = '';

  get supportParams() {
    return {
      from: this.$route.name,
    };
  }

  get footerWidgets() {
    return this.getWidgets('footer').sort((a, b) => (a.order === b.order ? 0 : a.order > b.order ? 1 : -1));
  }

  created() {
    this.copyright = this.getCopyright();
    this.icp = this.getICP();
  }

  render(h: CreateElement) {
    return (
      <VFooter>
        <VContainer class="text-center pb-6">
          {this.footerWidgets && this.footerWidgets.length
            ? this.footerWidgets.map((widget) => (
                <VCard class="mb-3">
                  {widget.title ? [<p class="caption pa-3 mb-0">{widget.title}</p>, <VDivider />] : null}
                  <div class="pa-3">
                    <plugin-holder
                      support-params={this.supportParams}
                      component-configs={widget.config}
                    ></plugin-holder>
                  </div>
                  ))
                </VCard>
              ))
            : null}
          <p class="copyright caption mb-0 grey--text">{this.copyright}</p>
          <p class="caption mb-0 grey--text">
            <span>
              <a href="https://github.com/aceHubert/vue-po-blog" target="_blank">
                beautify-theme
              </a>
              &nbsp; by Hubert
            </span>
            <span class="ml-2">{this.icp}</span>
          </p>
        </VContainer>
      </VFooter>
    );
  }
}
