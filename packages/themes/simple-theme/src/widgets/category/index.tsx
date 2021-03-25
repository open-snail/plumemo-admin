import { Vue, Component } from 'vue-property-decorator';

// Types
import { Category } from '@plumemo/devtools/dev-core';

@Component({
  name: 'bThemeWidgetCategory',
})
export default class WidgetCategory extends Vue {
  fetch() {
    return this.categoryApi.getList().then((items: Category[] = []) => {
      this.categories = items;
    });
  }

  categories: Category[] = [];

  render() {
    const { pending, error } = this.$fetchState;
    return (
      <div class="category">
        {pending ? (
          <p class="caption mb-0">{this.$tv('bTheme.widget.loading', 'Loading...')}</p>
        ) : !error && this.categories.length ? (
          <ul>
            {this.categories.map((category) => (
              <li>
                <nuxt-link to={`/category/${category.id}`} class="body-2 text-decoration-none">
                  {category.name}
                </nuxt-link>
              </li>
            ))}
          </ul>
        ) : (
          <p class="caption mb-0">{this.$tv('bTheme.widget.noCategories', 'No categories')}</p>
        )}
      </div>
    );
  }
}
