import { Vue, Component } from 'vue-property-decorator';
import { VAppBar, VContainer, VAppBarNavIcon, VToolbarTitle, VSpacer, VIcon, VBtn } from '../vuetify-tsx';
import { RootParams } from '../RootWarp';
import './Header.scss';

@Component({
  name: 'bThemeHeader',
})
export default class Header extends Vue {
  get logo() {
    const logo = this.getLogo();
    return (
      <figure class="b-theme-header-logo">
        <img class="b-theme-header-logo__img" src={logo.imgUrl || '/images/logo.png'} alt="logo" />
        {logo.text ? <figcaption class="b-theme-header-logo__text">{logo.text}</figcaption> : null}
      </figure>
    );
  }

  render() {
    return (
      <VAppBar app>
        <VContainer class="b-theme-header-container">
          <VAppBarNavIcon
            class="hidden-md-and-up"
            onClick={() => {
              RootParams.drawerShown = true;
            }}
          ></VAppBarNavIcon>
          <VToolbarTitle>{this.logo}</VToolbarTitle>
          <VSpacer />
          {this.$vuetify.breakpoint.mdAndUp ? (
            <div class="subtitle-2 hidden-sm-and-down">
              {RootParams.menus.map((menu) => (
                <nuxt-link
                  to={menu.to}
                  exact
                  active-class="primary--text"
                  class="ml-3 text-decoration-none text-no-wrap b-theme-header-menu"
                  style="color:inherit;"
                >
                  {menu.icon ? (
                    <VIcon size="1.25em" class="mr-1 b-theme-header-menu__icon">
                      {menu.icon}
                    </VIcon>
                  ) : null}
                  {menu.label}
                </nuxt-link>
              ))}
              <VBtn small icon class="ml-3" onClick={() => this.$router.push({ name: 'b-theme-search' })}>
                <VIcon>mdi-magnify</VIcon>
              </VBtn>
            </div>
          ) : (
            <VBtn icon onClick={() => this.$router.push({ name: 'b-theme-search' })}>
              <VIcon>mdi-magnify</VIcon>
            </VBtn>
          )}
        </VContainer>
      </VAppBar>
    );
  }
}
