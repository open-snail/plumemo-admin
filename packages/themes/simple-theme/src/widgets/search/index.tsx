import { Vue, Component } from 'vue-property-decorator';

// Types
import { Tag } from '@plumemo/devtools/dev-core';

@Component({
  name: 'bThemeWidgetSearch',
})
export default class WidgetSearch extends Vue {
  fetch() {
    return this.tagApi.getList().then((items: Tag[] = []) => {
      this.tags = items;
    });
  }

  tags: Tag[] = [];

  render() {
    return (
      <div class="search">
        <form action="/e/search/index.php" method="post" name="searchform" id="searchform">
          <input name="keyboard" id="keyboard" class="input_text" value="请输入关键字" style="color: rgb(153, 153, 153);" type="text" />
          <input name="show" value="title" type="hidden" />
          <input name="tempid" value="1" type="hidden" />
          <input name="tbname" value="news" type="hidden" />
          <input name="Submit" class="input_submit" value="搜索" type="submit" />
        </form>
      </div>
    );
  }
}
