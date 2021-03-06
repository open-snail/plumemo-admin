import { Vue, Component } from 'vue-property-decorator';
import { themeFuncs } from '@/includes/functions';
import classes from './PageLoading.scss?module';

@Component({
  name: 'pageLoading',
})
export default class PageLoading extends Vue {
  loading = false;

  get isDark() {
    return themeFuncs.isDarkTheme();
  }

  start() {
    this.loading = true;
  }

  finish() {
    this.loading = false;
  }

  render() {
    return this.loading ? (
      <div data-app="true" class={[`theme--${this.isDark ? 'dark' : 'light'}`, classes.container]}>
        <div class={classes.content}>
          <figure class={classes.logo}></figure>
          <p classes={classes.text}>{this.$tv('pageLoading.text', 'Loading...')}</p>
        </div>
      </div>
    ) : null;
  }
}
