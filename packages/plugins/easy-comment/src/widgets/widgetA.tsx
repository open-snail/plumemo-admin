import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'WidgetA',
})
export default class WidgetA extends Vue {
  render() {
    return <div>Widget A</div>;
  }
}
