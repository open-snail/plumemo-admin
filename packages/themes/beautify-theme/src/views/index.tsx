import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
import {
  VContainer,
  VRow,
  VCol,
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
  VDivider,
} from '@/components/vuetify-tsx';

// Default widgets (如果用户设置则按用户设置，用户设置可排序)
import WidgetMyInfo from '@/widgets/my-info';
import WidgetCategory from '@/widgets/category';
import WidgetTag from '@/widgets/tag';

// Types
import { Route } from 'vue-router';
import { ArticlePagerResponse } from '@plumemo/devtools/dev-core';

@Component({
  name: 'bThemeHome',
  head() {
    return {
      title: this.$tv('bTheme.page.title.home', 'Home') as string,
    };
  },
  asyncData({ query, articleApi }) {
    const { page = 1 } = query;
    return articleApi
      .getList({ page: parseInt(page as string), from: 'home' })
      .then((articles: ArticlePagerResponse) => ({ articles }));
  },
})
export default class ThemeHome extends Vue {
  beforeRouteUpdate(to: Route, from: Route, next: Function) {
    const { page = 1 } = to.query;
    this.loading = true;
    this.articleApi
      .getList({ page: parseInt(page as string), from: 'home' })
      .then((articles: ArticlePagerResponse) => {
        this.articles = articles;
      })
      .finally(() => {
        this.loading = false;
        next();
      });
  }

  loading = false;
  articles: ArticlePagerResponse = {
    rows: [],
    pager: {
      page: 1,
      size: 10,
      total: 0,
    },
  };

  // widget 参数
  get supportParams() {
    return {
      from: 'home',
    };
  }

  // 左侧菜单（只在 lg 及以上显示）
  get leftbarWidgets() {
    return this.getWidgets('leftbar').sort((a, b) => (a.order === b.order ? 0 : a.order > b.order ? 1 : -1));
  }

  // 侧边栏 (中在 md 及以上显示)
  get sidebarWidgets() {
    return this.getWidgets('sidebar').sort((a, b) => (a.order === b.order ? 0 : a.order > b.order ? 1 : -1));
  }

  get pageLength() {
    const { size, total } = this.articles.pager;
    if (total) {
      return Math.floor(total / size) + (total % size === 0 ? 0 : 1);
    }
    return 0;
  }

  handlePageChange(page: number) {
    this.$router.push({
      query: { ...this.$route.query, page: String(page) },
    });
  }

  render() {
    return (
      <VContainer class="home">
        <VRow>
          {this.$vuetify.breakpoint.lgAndUp ? (
            <VCol cols="3">
              {this.leftbarWidgets && this.leftbarWidgets.length
                ? this.leftbarWidgets.map((widget) => (
                    <VCard class="mb-3">
                      {widget.title
                        ? [
                            <p class="caption pa-3 mb-0">
                              <VIcon size="1rem" class="mr-1" style="vertical-align: text-bottom;">
                                mdi-menu
                              </VIcon>
                              {widget.title}
                            </p>,
                            <VDivider />,
                          ]
                        : null}
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
                      <p class="caption pa-3 mb-0">
                        <VIcon size="1rem" class="mr-1" style="vertical-align: text-bottom;">
                          mdi-menu
                        </VIcon>
                        {this.$tv('bTheme.widget.title.category', 'Categories')}
                      </p>
                      <VDivider />
                      <div class="pa-3">
                        <WidgetCategory />
                      </div>
                    </VCard>,
                  ]}
            </VCol>
          ) : null}
          <VCol cols="12" md="8" lg="6">
            {this.articles.rows && this.articles.rows.length ? (
              [
                this.articles.rows.map(({ id, title, summary, thumbnail, tags = [], views, createTime }) => (
                  <VCard
                    min-height="100"
                    class="mb-3"
                    hover
                    nuxt
                    to={{ name: 'b-theme-article', params: { id: String(id) } }}
                  >
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div style="width:100%">
                        {thumbnail ? <VImg src={thumbnail} class="hidden-sm-and-up" aspectRatio="1.7" /> : null}
                        <VCardTitle>{title}</VCardTitle>
                        <VCardSubtitle>
                          {summary}
                          <div style="min-height:18px">
                            {tags.map((tag: any) => (
                              <nuxt-link
                                to={{ name: 'b-theme-search-tag', params: { id: tag.id } }}
                                class="mr-2 primary--text"
                              >
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
                            <span class="ml-2">{moment(createTime).format('YYYY-MM-DD')}</span>
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
                <VIcon size="1.25em">mdi-information-outline</VIcon> 没有内容啦！
              </VSheet>
            )}
          </VCol>
          {this.$vuetify.breakpoint.mdAndUp ? (
            <VCol cols="4" lg="3">
              {this.sidebarWidgets && this.sidebarWidgets.length
                ? this.sidebarWidgets.map((widget) => (
                    <VCard class="mb-3">
                      {widget.title
                        ? [
                            <p class="caption pa-3 mb-0">
                              <VIcon size="1rem" class="mr-1" style="vertical-align: text-bottom;">
                                mdi-menu
                              </VIcon>
                              {widget.title}
                            </p>,
                            <VDivider />,
                          ]
                        : null}
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
                    !this.$vuetify.breakpoint.lgAndUp ? (
                      <VCard class="mb-3">
                        <p class="caption pa-3 mb-0">
                          <VIcon size="1rem" class="mr-1" style="vertical-align: text-bottom;">
                            mdi-menu
                          </VIcon>
                          {this.$tv('bTheme.widget.title.category', 'Categories')}
                        </p>
                        <VDivider />
                        <div class="pa-3">
                          <WidgetCategory />
                        </div>
                      </VCard>
                    ) : null,
                    <VCard class="mb-3">
                      <p class="caption pa-3 mb-0">
                        <VIcon size="1rem" class="mr-1" style="vertical-align: text-bottom;">
                          mdi-menu
                        </VIcon>
                        {this.$tv('bTheme.widget.title.tag', 'Tags')}
                      </p>
                      <VDivider />
                      <div class="pa-3">
                        <WidgetTag />
                      </div>
                    </VCard>,
                  ]}
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
