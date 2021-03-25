import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';
import marked from 'marked';

import WidgetMyInfo from '@/widgets/my-info';
import WidgetLinks from '@/widgets/links';
import WidgetRecommend from '@/widgets/recommend';
import WidgetRanking from '@/widgets/ranking';
import WidgetTag from '@/widgets/tag';
import WidgetSearch from '@/widgets/search'

// Types
import { Component as VueComponent, AsyncComponent, CreateElement } from 'vue';

@Component<ThemeArticle>({
  name: 'bThemeArticle',
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ params, articleApi }) {
    console.log(params.id)
    return articleApi.get(parseInt(params.id));
  },
})
export default class ThemeArticle extends Vue {
  id = null;
  title = '';
  author = '';
  thumbnail = '';
  content = '';
  tags = [];
  views = 0;
  createTime = null;

  pageBeforePlugins: Array<VueComponent | AsyncComponent> = [];
  pageAfterPlugins: Array<VueComponent | AsyncComponent> = [];
  pageSidebarPlugins: Array<VueComponent | AsyncComponent> = [];

  get hasSidebar() {
    return this.pageSidebarPlugins && this.pageSidebarPlugins.length;
  }

  get markedContent() {
    return this.content ? marked(this.content) : '';
  }

  created() {
    this.hook('article-before')
      .filter(this.pageBeforePlugins)
      .then((plugins: Array<VueComponent | AsyncComponent>) => (this.pageBeforePlugins = plugins));

    this.hook('article-after')
      .filter(this.pageAfterPlugins)
      .then((plugins: Array<VueComponent | AsyncComponent>) => (this.pageAfterPlugins = plugins));

    this.hook('article-sidebar')
      .filter(this.pageSidebarPlugins)
      .then((plugins: Array<VueComponent | AsyncComponent>) => (this.pageSidebarPlugins = plugins));
  }

  render(h: CreateElement) {
    return (

      <article>
        <div class="infos">
          <div class="newsview">
            <h3 class="news_title">{this.title}</h3>
            <div class="news_author"><span class="au01"><a href="mailto:dancesmiling@qq.com">{this.author}</a></span><span class="au02">{moment(this.createTime).format('YYYY-MM-DD')}</span><span class="au03">共<b><script src="/e/public/ViewClick/?classid=5&amp;id=816&amp;addclick=1"></script>{this.views}</b>人围观</span></div>
            <div class="tags">


              {this.tags && this.tags.length ? ([
                this.tags.map(({ name }) => (
                  <a href="/" target="_blank">{name}</a>
                )),
              ]) : ''}</div>
            <div class="news_infos" domPropsInnerHTML={this.markedContent}>
            </div>
          </div>
          <div class="share"> </div>
          <div class="news_pl">
            <h2>文章评论</h2>
            <ul>
              <div class="gbko">
                {this.pageAfterPlugins && this.pageAfterPlugins.length
                  ? this.pageAfterPlugins.map((plugin) => h(plugin, { props: { article: this.$data } }))
                  : null}</div>
            </ul>
          </div>
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
