import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Comment',
})
export default class Comment extends Vue {

  login() {
  }

  render() {
    return <div>
      <div class='comments-list-title'><span>30 条评论</span></div>
      <ul class="commentwrap">
        <li class="comment even thread-even depth-1" id="li-comment-">
          <div class="comment_body contents">
            <div class="profile">
              <img src="https://images.byteblogs.com/files/b641be4297fd9efb27266a44b4fc153e.png" class="gravatar" />
            </div>
            <div class="main shadow">
              <div class="commentinfo">
                <section class="commeta">
                  <div class="shang">
                    <h4 class="author">
                      <a href="" target="_blank">Plumemo</a>
                    </h4>
                  </div>
                </section>
              </div>
              <div class="body">
                <span>这个博客不错</span>
              </div>
              <div class="time-info">
                <span> 2018年3月9日</span>
                <span
                ><a
                  rel="nofollow"
                  class="comment-reply-link"
                >回复</a></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    
      <div id="respond" class="comment-respond">
        <div class="comment-form-info" >
          <div class="real-time-gravatar">
            <img src="https://images.byteblogs.com/files/b641be4297fd9efb27266a44b4fc153e.png" onClick={this.login}/>
          </div>
          <p class="input-row">
            <textarea
              class="text_area"
              rows="3"
              cols="80"
              name="comment"
              id="comment"
              tabindex="4"
              placeholder="输入评论"
              
            ></textarea>
            <input
              type="submit"
              name="submit"
              class="button"
              id="submit"
              tabindex="5"
              value="发送"
            />
          </p>
        </div>
      </div>
      
    </div>;
  }
}

