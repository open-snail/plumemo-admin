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
      <div class="my-info text-center">
        {pending || error ? (
          <div style="width:100%">
            <VAvatar size="66" class="mb-2">
              <VImg src={require('@/assets/images/avatar1.jpg')} />
            </VAvatar>
          </div>
        ) : (
          <div style="width:100%">
            <VAvatar size="66" class="mb-2">
              <VImg src={this.userInfo!.avatar || require('@/assets/images/avatar1.jpg')} />
            </VAvatar>
            <p class="body-2 mb-2">{this.userInfo!.email}</p>
          </div>
        )}
        <div class="d-flex">
          <div style="flex:auto">
            <h1 class="mb-2">{this.counts.post}</h1>
            <p class="mb-0 body-2 grey--text">{this.$tv('bTheme.widget.title.article', 'Posts')}</p>
          </div>
          <div style="flex:auto">
            <h1 class="mb-2">{this.counts.category}</h1>
            <p class="mb-0 body-2 grey--text">{this.$tv('bTheme.widget.title.category', 'Categories')}</p>
          </div>
          <div style="flex:auto">
            <h1 class="mb-2">{this.counts.tag}</h1>
            <p class="mb-0 body-2 grey--text">{this.$tv('bTheme.widget.title.tag', 'Tags')}</p>
          </div>
        </div>
      </div>
    );
  }
}
