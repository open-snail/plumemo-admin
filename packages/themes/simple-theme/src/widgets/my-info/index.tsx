import { Vue, Component } from 'vue-property-decorator';
import { VAvatar, VImg } from '@/components/vuetify-tsx';

// Types
import { UserInfo } from '@plumemo/devtools/dev-core/types';

@Component({
  name: 'bThemeWidgetMyInfo',
})
export default class WidgetMyInfo extends Vue {
  fetch() {
    return Promise.all([this.$store.dispatch('bTheme/getUserInfo'), this.$store.dispatch('bTheme/getCounts')]).then(
      ([userInfo, counts]) => {
        this.userInfo = userInfo;
        this.counts = counts;
      },
    );
  }

  userInfo: UserInfo | null = null;
  counts = {
    post: 0,
    tag: 0,
    category: 0,
  };

  render() {
    const { pending, error } = this.$fetchState;
    return (
      <div class="about">
        <div class="avatar"> <img src={this.userInfo!.avatar} alt=""/> </div>
          <p class="abname">{this.userInfo!.name} </p>
          {/* <p class="abposition">Web前端设计师、网页设计</p>
          <div class="abtext">{this.userInfo!.desc} </div> */}
        </div>
    );
  }
}
