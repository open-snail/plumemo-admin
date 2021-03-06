import { Vue, Component } from 'vue-property-decorator';
import { VContainer, VRow, VCol, VCard, VDivider } from '@/components/vuetify-tsx';
import WidgetMyInfo from '@/widgets/my-info';

// Types
import { UserInfo } from '@plumemo/devtools/dev-core/types';

@Component({
  name: 'bThemeAboutMe',
  head() {
    return {
      title: this.$tv('bTheme.page.title.aboutMe', 'About Me') as string,
    };
  },
})
export default class ThemeAboutMe extends Vue {
  fetch() {
    return this.$store.dispatch('bTheme/getUserInfo').then((info) => {
      this.userInfo = info;
    });
  }

  userInfo: UserInfo | null = null;

  get supportParams() {
    return {
      from: 'home',
    };
  }

  get sidebars() {
    return this.getWidgets('sidebar').sort((a, b) => (a.order === b.order ? 0 : a.order > b.order ? 1 : -1));
  }

  render() {
    const { pending, error } = this.$fetchState;
    return (
      <VContainer class="about-me">
        <VRow>
          <VCol cols="12" md="8">
            {pending || error ? (
              <div class="body-1">{this.$tv('bTheme.page.aboutMe.noContent', 'No Content!')}</div>
            ) : (
              <div
                class="body-1"
                domPropsInnerHTML={
                  this.userInfo!.introduction || (this.$tv('bTheme.page.aboutMe.noContent', 'No Content!') as string)
                }
              ></div>
            )}
          </VCol>
          {this.$vuetify.breakpoint.mdAndUp ? (
            <VCol cols="4">
              {this.sidebars && this.sidebars.length
                ? this.sidebars.map((widget) => (
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
                : [
                    <VCard class="mb-3">
                      <div class="pa-3">
                        <WidgetMyInfo />
                      </div>
                    </VCard>,
                  ]}
            </VCol>
          ) : null}
        </VRow>
      </VContainer>
    );
  }
}
