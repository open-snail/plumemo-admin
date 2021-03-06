import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'theme-settings',
  head: {
    title: 'Settings',
  },
})
export default class ThemeSetting extends Vue {
  render() {
    return (
      <div class="settings">
        <h1>settings</h1>
      </div>
    );
  }
}
