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
import WidgetLinks from '@/widgets/links';
import WidgetRecommend from '@/widgets/recommend';
import WidgetRanking from '@/widgets/ranking';
import WidgetTag from '@/widgets/tag';
import WidgetSearch from '@/widgets/search'
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
      <article>
        <div class="blogs">
          {this.articles.rows && this.articles.rows.length ? ([
            this.articles.rows.map(({ id, title, summary, thumbnail, tags = [], views, createTime }) => (
              <li> <span class="blogpic"><a href="/"><img src={thumbnail} /></a></span>

                <h3 class="blogtitle"><a href="/">  
                <nuxt-link
                  to={{ name: 'b-theme-article', params: { id: String(id) } }}
                  class="mr-2 primary--text"
                >
                  {`#${title}`}
                </nuxt-link></a></h3>
                <div class="bloginfo">
                  <p>{summary}</p>
                </div>

                <div class="autor"><span class="lm">
                  <a href="/" title="CSS3|Html5" target="_blank" class="classname">
                    {tags && tags.length ? ([
                      tags.map(v => v.name).join('|'),
                    ]) : ''}</a>
                </span>
                  <span class="dtime">{moment(createTime).format('YYYY-MM-DD')}</span>
                  <span class="viewnum">浏览（<a href="/">0</a>）</span><span class="readmore"><a href="/">阅读原文</a></span></div>


              </li>
            )),
          ]
          ) : (
            <VSheet class="caption text-center pa-2">
              <VIcon size="1.25em">mdi-information-outline</VIcon> 没有内容啦！
            </VSheet>
          )}

        </div>
        <div class="sidebar">
          <WidgetMyInfo />
          <WidgetSearch />
          <WidgetTag />
          <WidgetRanking />
          <WidgetRecommend />
          <WidgetLinks />
        </div>
      </article>
    );
  }
}
