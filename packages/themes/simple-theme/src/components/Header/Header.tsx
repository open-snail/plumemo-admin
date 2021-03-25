import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'bThemeHeader',
})
export default class Header extends Vue {
  render() {
    return (
      <header><div class="tophead">
        <div class="logo"><a href="/">Plumemo</a></div>
        <div id="mnav">
          <h2><span class="navicon"></span></h2>
          <ul>
            <li><a href="/" id="topnav_current">网站首页</a></li>
            <li><a href="/about">关于我</a></li>
          </ul>
        </div>
        <nav class="topnav" id="topnav">
          <ul>
            <li><a href="/" id="topnav_current">网站首页</a></li>
            <li><a href="/about">关于我</a></li>
          </ul>
        </nav>
      </div>
      </header>

    );
  }
}
