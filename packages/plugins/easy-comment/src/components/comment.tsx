import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Comment',
})
export default class Comment extends Vue {
  render() {
    return <div>Comment Plugin</div>;
  }
}
