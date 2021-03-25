import { Vue, Component } from 'vue-property-decorator';

// Types
import { Tag } from '@plumemo/devtools/dev-core';

@Component({
    name: 'bThemeWidgetLinks',
})
export default class WidgetLinks extends Vue {
    fetch() {
        return this.tagApi.getList().then((items: Tag[] = []) => {
            this.tags = items;
        });
    }

    tags: Tag[] = [];

    render() {
        return (
            <div class="links">
                <h2 class="hometitle">友情链接</h2>
                <ul>
                    <li><a href="http://www.yangqq.com" title="杨青个人博客">杨青个人博客</a></li>
                    <li><a href="http://www.yangqq.com" title="杨青个人博客">杨青个人博客</a></li>
                    <li><a href="http://www.yangqq.com" title="杨青个人博客">杨青个人博客</a></li>
                </ul>
            </div>
        );
    }
}
