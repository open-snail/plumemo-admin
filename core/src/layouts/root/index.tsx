import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'layoutRoot',
})
export default class LayoutRoot extends Vue {
  render(h: any) {
    return <nuxt />;
  }
}
