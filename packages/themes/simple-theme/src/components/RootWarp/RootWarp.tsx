import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  VApp,
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VListItemIcon,
  VListItemContent,
  VIcon,
  VAvatar,
  VImg,
  VDivider,
} from '../vuetify-tsx';

// Types
import { UserInfo } from '@plumemo/devtools/dev-core/types';

export const RootParams: {
  drawerShown: boolean;
  menus: Menu[];
} = Vue.observable({
  drawerShown: false,
  menus: [],
});

@Component({
  name: 'bThemeRootWarp',
})
export default class RootWarp extends Vue {
  fetch() {
    return this.$store.dispatch('bTheme/getUserInfo').then((info) => {
      this.userInfo = info;
    });
  }

  userInfo: UserInfo | null = null;

  @Watch('$vuetify.breakpoint.mdAndUp')
  watchIsMobile(val: boolean) {
    if (val && RootParams.drawerShown) {
      RootParams.drawerShown = false;
    }
  }

  created() {
    const menu = [
      {
        label: this.$tv('bTheme.menu.home', 'Home') as string,
        icon: 'mdi-home',
        to: { name: 'index' },
        order: 0,
      },
      {
        label: this.$tv('bTheme.menu.archive', 'Archive') as string,
        icon: 'mdi-archive',
        to: { name: 'b-theme-archive' },
        order: 1,
      },
      {
        label: this.$tv('bTheme.menu.about', 'About Me') as string,
        icon: 'mdi-account',
        to: { name: 'b-theme-about-me' },
        order: 2,
      },
    ];
    this.hook('header-menus')
      .filter(menu)
      .then((menus: Menu[]) => {
        RootParams.menus = menus.sort((a, b) => (a.order === b.order ? 0 : a.order > b.order ? 1 : -1));
      });
  }

  render() {
    const { pending = true, error = null } = this.$fetchState;

    return (
      <VApp>
        <VNavigationDrawer v-model={RootParams.drawerShown} app disableResizeWatcher disableRouteWatcher>
          <VList dense flat>
            <VListItem class="text-center py-4">
              {pending || error ? (
                <div style="width: 100%">
                  <VAvatar size="46" class="mb-2">
                    <VImg src="https://api.adorable.io/avatars/80/abott@adorable.png" />
                  </VAvatar>
                </div>
              ) : (
                <div style="width: 100%">
                  <VAvatar size="46" class="mb-2">
                    <VImg src={this.userInfo!.avatar || 'https://api.adorable.io/avatars/80/abott@adorable.png'} />
                  </VAvatar>
                  <VListItemTitle>{this.userInfo!.email}</VListItemTitle>
                </div>
              )}
            </VListItem>
            <VDivider />
            {RootParams.menus.map((menu) => [
              <VListItem
                to={menu.to}
                exact
                nuxt
                activeClass="accent--text"
                onClick={() => {
                  RootParams.drawerShown = false;
                }}
              >
                <VListItemIcon>{menu.icon ? <VIcon>{menu.icon}</VIcon> : null}</VListItemIcon>
                <VListItemContent>
                  <VListItemTitle>{menu.label}</VListItemTitle>
                </VListItemContent>
              </VListItem>,
              <VDivider />,
            ])}
          </VList>
        </VNavigationDrawer>
        {this.$slots.default}
      </VApp>
    );
  }
}
