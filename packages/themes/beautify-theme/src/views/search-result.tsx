import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import {
  VContainer,
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardActions,
  VAvatar,
  VImg,
  VIcon,
  VPagination,
  VProgressCircular,
  VDialog,
  VSheet,
  VCol,
  VRow,
  VDivider,
} from '@/components/vuetify-tsx';
import WidgetCategory from '@/widgets/category';
import WidgetTag from '@/widgets/tag';

// Types
import { Route } from 'vue-router';
import { Category, Tag, ArticlePagerResponse } from '@plumemo/devtools/dev-core';

@Component<ThemeSearchResult>({
  name: 'bThemeSearchResult',
  head() {
    return {
      title:
        this.type === 'category'
          ? (this.$tv('bTheme.page.title.searchForCategory', 'Category searching result') as string)
          : this.type === 'tag'
          ? (this.$tv('bTheme.page.title.searchForTag', 'Tag searching result') as string)
          : (this.$tv('bTheme.page.title.searchForKeyWorkd', `Keyworkd "${this.keywords}" searching result`, {
              keywords: this.keywords,
            }) as string),
    };
  },
  asyncData({ route, params, query, articleApi }) {
    const { page = 1 } = query;
    const { keywords = '', id } = params;
    const extendParams: Dictionary<any> = {};
    if (route.name === 'b-theme-search-category') {
      extendParams.categoryId = id;
    } else if (route.name === 'b-theme-search-tag') {
      extendParams.postTagId = id;
    } else {
      extendParams.keywords = keywords;
    }

    return articleApi
      .getList({ page: page as number, from: 'search', ...extendParams })
      .then((articles: ArticlePagerResponse) => ({ articles }));
  },
})
export default class ThemeSearchResult extends Vue {
  beforeRouteUpdate(to: Route, from: Route, next: Function) {
    const { page = 1 } = to.query;
    const extendParams: Dictionary<any> = {};
    if (this.type === 'category') {
      extendParams.categoryId = this.id;
    } else if (this.type === 'tag') {
      extendParams.postTagId = this.id;
    } else {
      extendParams.keywords = this.keywords;
    }
    this.loading = true;
    this.articleApi
      .getList({ page: page as number, from: 'search', ...extendParams })
      .then((articles: ArticlePagerResponse) => {
        this.articles = articles;
      })
      .finally(() => {
        this.loading = false;
        next();
      });
  }

  @Prop(String) keywords?: string;
  @Prop([String, Number]) id?: string | number;
  @Prop(String) type?: 'category' | 'tag';

  loading = false;
  resultTip = '';
  articles: ArticlePagerResponse = {
    rows: [],
    pager: {
      page: 1,
      size: 10,
      total: 0,
    },
  };

  get pageLength() {
    const { size, total } = this.articles.pager;
    if (total) {
      return Math.floor(total / size) + (total % size === 0 ? 0 : 1);
    }
    return 0;
  }

  get hasSidebar() {
    return this.$vuetify.breakpoint.mdAndUp && !!this.type;
  }

  handlePageChange(page: number) {
    this.$router.push({
      query: { ...this.$route.query, page: String(page) },
    });
  }

  created() {
    // todo: 没有单独查询
    if (this.type === 'category') {
      this.categoryApi.get(this.id! as number).then((category: Category | null) => {
        this.resultTip = category
          ? `分类 "${category.name}"， 搜索到 ${this.articles.pager.total} 条记录`
          : `搜索到 ${this.articles.pager.total} 条记录`;
      });
    } else if (this.type === 'tag') {
      this.tagApi.get(this.id! as number).then((tag: Tag | null) => {
        this.resultTip = tag
          ? `标签 "${tag.name}"， 搜索到 ${this.articles.pager.total} 条记录`
          : `搜索到 ${this.articles.pager.total} 条记录`;
      });
    } else {
      this.resultTip = `关键字 "${this.keywords}"，搜索到 ${this.articles.pager.total} 条记录`;
    }
  }

  render() {
    return (
      <VContainer class="search-result">
        <VRow>
          <VCol cols={this.hasSidebar ? 8 : 12}>
            {this.resultTip ? (
              <VSheet class="mb-3">
                <p class="mb-0 pa-2"> {this.resultTip}</p>
              </VSheet>
            ) : null}
            {this.articles.rows && this.articles.rows.length ? (
              [
                this.articles.rows.map(({ id, title, summary, thumbnail, tags = [], views, createTime }) => (
                  <VCard
                    min-height="100"
                    class="mb-3"
                    to={{ name: 'b-theme-article', params: { id: String(id) } }}
                    nuxt
                  >
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div style="width:100%">
                        {thumbnail ? <VImg src={thumbnail} class="hidden-sm-and-up" aspectRatio="1.7" /> : null}
                        <VCardTitle>{title}</VCardTitle>
                        <VCardSubtitle>
                          {summary}
                          <div>
                            {tags.map((tag: any) => (
                              <nuxt-link to={{ name: 'b-theme-search-tag', params: { id: tag.id } }} class="mr-2">
                                {`#${tag.name}`}
                              </nuxt-link>
                            ))}
                          </div>
                        </VCardSubtitle>
                        <VCardActions>
                          <p class="mb-0 caption grey--text">
                            <span>
                              <VIcon size="1.25em" class="mr-1" style="vertical-align: text-bottom; color: inherit;">
                                mdi-eye
                              </VIcon>
                              {views}
                            </span>
                            <span class="ml-2">发布于 {moment(createTime).format('YYYY-MM-DD')}</span>
                          </p>
                        </VCardActions>
                      </div>
                      {thumbnail ? (
                        <div class="hidden-xs-only">
                          <VAvatar class="ma-3" size="125" tile>
                            <VImg src={thumbnail} />
                          </VAvatar>
                        </div>
                      ) : null}
                    </div>
                  </VCard>
                )),
                this.pageLength ? (
                  <VPagination
                    v-model={this.articles.pager.page}
                    length={this.pageLength}
                    totalVisible="7"
                    onInput={(val: number) => this.handlePageChange(val)}
                  ></VPagination>
                ) : null,
              ]
            ) : (
              <VSheet class="caption text-center pa-2">
                <VIcon size="1.25em">mdi-information-outline</VIcon>没有搜索到您想要的结果！
              </VSheet>
            )}
          </VCol>

          {this.hasSidebar ? (
            <VCol cols="4">
              {this.type === 'category' ? (
                <VCard class="mb-3">
                  <p class="caption pa-3 mb-0">分类</p>
                  <VDivider />
                  <div class="pa-3">
                    <WidgetCategory />
                  </div>
                </VCard>
              ) : this.type === 'tag' ? (
                <VCard class="mb-3">
                  <p class="caption pa-3 mb-0">标签</p>
                  <VDivider />
                  <div class="pa-3">
                    <WidgetTag />
                  </div>
                </VCard>
              ) : null}
            </VCol>
          ) : null}
        </VRow>

        <VDialog
          v-model={this.loading}
          hideOverlay
          persistent
          noClickAnimation
          width="60px"
          style="box-shadow: none !important;"
        >
          <div style="height:60px">
            <VProgressCircular size="44" indeterminate></VProgressCircular>
          </div>
        </VDialog>
      </VContainer>
    );
  }
}
