import { Vue, Component } from 'vue-property-decorator';

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
    return (
      <div class="cloud">
        <h2 class="hometitle">标签云</h2>
        <ul>
          {this.tags && this.tags.map(({ name }) => (<a href="/">{name}</a>))}
        </ul>
      </div>
    );
  }
}
