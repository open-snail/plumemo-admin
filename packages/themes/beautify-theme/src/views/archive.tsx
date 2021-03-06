import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
import {
  VContainer,
  VIcon,
  VList,
  VListItem,
  VListItemContent,
  VListItemSubtitle,
  VListItemAction,
  VListItemTitle,
  VSubheader,
  VDivider,
} from '@/components/vuetify-tsx';

// Types
import { ArticleArchive } from '@plumemo/devtools/dev-core';

@Component({
  name: 'bThemeArchive',
  head() {
    return {
      title: this.$tv('bTheme.page.title.archive', 'Archive') as string,
    };
  },
  asyncData({ articleApi }) {
    return articleApi.getArchive().then((archives: ArticleArchive[]) => ({ archives }));
  },
})
export default class ThemeArchive extends Vue {
  archives: ArticleArchive[] = [];

  render() {
    return (
      <VContainer class="archive">
        <VList twoLine subheader>
          {this.archives.map((item: ArticleArchive, index: number) => [
            index > 0 ? <VDivider /> : null,
            <VSubheader>
              <VIcon small class="mr-1">
                mdi-calendar-range
              </VIcon>
              {moment(item.date).format('YYYY-MM')}
            </VSubheader>,
            ...item.articles.map(({ id, title, summary, createTime }) => (
              <VListItem nuxt to={{ name: 'b-theme-article', params: { id: String(id) } }}>
                <VListItemContent>
                  <VListItemTitle>{title}</VListItemTitle>
                  {summary ? <VListItemSubtitle>{summary}</VListItemSubtitle> : null}
                </VListItemContent>
                <VListItemAction>
                  <span>{moment(createTime).format('YYYY-MM-DD')}</span>
                </VListItemAction>
              </VListItem>
            )),
          ])}
        </VList>
      </VContainer>
    );
  }
}
