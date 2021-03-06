import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'home',
  layout: 'root/index',
  head() {
    return {
      title: this.$tv('home.title', 'Home') as string,
    };
  },
})
export default class Home extends Vue {
  render() {
    return (
      <div class="home">
        <p style="text-align:center;padding: 20px;">{this.$tv('home.usage', 'How to use')}</p>
      </div>
    );
  }
}
