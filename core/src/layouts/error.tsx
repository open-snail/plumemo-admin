import { Vue, Component, Prop } from 'vue-property-decorator';
import classes from './styles/error.scss?module';

import { themeFuncs } from '@/includes/functions';

// Types
type Error = {
  statusCode: number;
  message: string;
};

@Component<LayoutPageError>({
  name: 'LayoutPageError',
  layout: 'root/index',
  head() {
    return {
      title: this.message,
    };
  },
})
export default class LayoutPageError extends Vue {
  @Prop({ type: Object, default: () => ({ statusCode: 500, message: '' }) }) error!: Error;

  get statusCode() {
    return (this.error && this.error.statusCode) || 500;
  }

  get message() {
    return this.error.message || (this.$tv(`error.${String(this.statusCode)}`, 'An error occurred') as string);
  }

  get isDark() {
    return themeFuncs.isDarkTheme();
  }

  render() {
    return (
      <div id="error-page" data-app="true" class={[`theme--${this.isDark ? 'dark' : 'light'}`, classes.container]}>
        <div class={classes.containerInner}>
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
            <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
          </svg>
          <div class={classes.title}>{this.message}</div>
          {this.statusCode === 404 ? (
            <p class={classes.description}>
              {typeof this.$route === 'undefined' ? (
                <a href="/" class={['primary', classes.btnGoHome]}>
                  {this.$tv('error.backToHomeBtnText', 'Back to the home page')}
                </a>
              ) : (
                <nuxt-link to="/" class={['primary', classes.btnGoHome]}>
                  {this.$tv('error.backToHomeBtnText', 'Back to the home page')}
                </nuxt-link>
              )}
            </p>
          ) : (
            <p class={classes.description}>
              {this.$tv(
                'error.description',
                'An error occurred while rendering the page. Check developer tools console for details.',
              )}
            </p>
          )}
        </div>
      </div>
    );
  }
}
