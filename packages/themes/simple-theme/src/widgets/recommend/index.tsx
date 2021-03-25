import { Vue, Component } from 'vue-property-decorator';

// Types
import { Tag } from '@plumemo/devtools/dev-core';

@Component({
  name: 'bThemeWidgetRecommend',
})
export default class WidgetRecommend extends Vue {
  fetch() {
    return this.tagApi.getList().then((items: Tag[] = []) => {
      this.tags = items;
    });
  }

  tags: Tag[] = [];

  render() {
    return (
      <div class="paihang">
        <h2 class="hometitle">站长推荐</h2>
        <ul>
          <li><b><a href="/download/div/2015-04-10/746.html" target="_blank">【活动作品】柠檬绿兔小白个人博客模板30...</a></b>
            <p><i><img src="images/t02.jpg" /></i>展示的是首页html，博客页面布局格式简单，没有复杂的背景，色彩局部点缀，动态的幻灯片展示，切换卡，标...</p>
          </li>
          <li><b><a href="/download/div/2014-02-19/649.html" target="_blank"> 个人博客模板（2014草根寻梦）30...</a></b>
            <p><i><img src="images/b03.jpg" /></i>2014第一版《草根寻梦》个人博客模板简单、优雅、稳重、大气、低调。专为年轻有志向却又低调的草根站长设...</p>
          </li>
          <li><b><a href="/download/div/2013-08-08/571.html" target="_blank">黑色质感时间轴html5个人博客模板30...</a></b>
            <p><i><img src="images/b04.jpg" /></i>黑色时间轴html5个人博客模板颜色以黑色为主色，添加了彩色作为网页的一个亮点，导航高亮显示、banner图片...</p>
          </li>
          <li><b><a href="/download/div/2014-09-18/730.html" target="_blank">情侣博客模板系列之《回忆》Html30...</a></b>
            <p><i><img src="images/b05.jpg" /></i>Html5+css3情侣博客模板，主题《回忆》，使用css3技术实现网站动画效果，主题《回忆》,分为四个主要部分，...</p>
          </li>
          <li><b><a href="/download/div/2014-04-17/661.html" target="_blank">黑色Html5个人博客模板主题《如影随形》30...</a></b>
            <p><i><img src="images/b06.jpg" /></i>014第二版黑色Html5个人博客模板主题《如影随形》，如精灵般的影子会给人一种神秘的感觉。一张剪影图黑白...</p>
          </li>
          <li><b><a href="/jstt/bj/2015-01-09/740.html" target="_blank">【匆匆那些年】总结个人博客经历的这四年…30...</a></b>
            <p><i><img src="images/mb02.jpg" /></i>博客从最初的域名购买，到上线已经有四年的时间了，这四年的时间，有笑过，有怨过，有悔过，有执着过，也...</p>
          </li>
        </ul>
      </div>
    );
  }
}
