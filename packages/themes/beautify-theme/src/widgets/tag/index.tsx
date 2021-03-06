import { Vue, Component } from 'vue-property-decorator';
import { VAvatar, VChip } from '@/components/vuetify-tsx';

// Types
import { Tag } from '@plumemo/devtools/dev-core';

@Component({
  name: 'bThemeWidgetTag',
})
export default class WidgetTag extends Vue {
  fetch() {
    return this.tagApi.getList().then((items: Tag[] = []) => {
      this.tags = items;
    });
  }

  tags: Tag[] = [];

  render() {
    const { pending, error } = this.$fetchState;
    return (
      <div class="category">
        {pending ? (
          <p class="caption mb-0">{this.$tv('bTheme.widget.loading', 'Loading...')}</p>
        ) : !error && this.tags.length ? (
          this.tags.map((tag) => (
            <VChip small class="ma-2" color="accent" textColor="white" to={`/tag/${tag.id}`} nuxt>
              {tag.name}
              <VAvatar right class="accent darken-4">
                {tag.articleTotal}
              </VAvatar>
            </VChip>
          ))
        ) : (
          <p class="caption mb-0">{this.$tv('bTheme.widget.noTags', 'No tags')}</p>
        )}
      </div>
    );
  }
}
