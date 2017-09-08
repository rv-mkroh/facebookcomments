import React, { Component } from 'react';
import CommentForm from './CommentForm';
import Buttons from './Buttons';
import './index.css';
import data from './data';

class App extends Component {
  constructor() {
    super();
    this.state = data.initState;
    this.handleComment = this.handleComment.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }

  handleResponse(action, parent, child) {
    let state = Object.assign({},this.state);
    if ( child > -1 ) {
      state.comments[parent].replies[child][action]++;
    } else {
      state.comments[parent][action]++;
    }
    this.setState(state);
  }

  handleDelete(parent, child) {
    let state = Object.assign({},this.state);
    if ( child > -1 ) {
      state.comments[parent].replies.splice(child, 1);
    } else {
      state.comments.splice(parent, 1);
    }
    this.setState(state);
  }

  handleComment(event) {
    event.preventDefault();
    let state = Object.assign({},this.state);
    let newComment = data.commentTemplate;
    newComment.text = this.state.commentInput;
    state.comments.push(newComment);
    state.commentInput = '';
    this.setState(state);
  }

  handleCommentUpdate(event) {
    let state = Object.assign({},this.state);
    state.commentInput = event.target.value;
    this.setState(state);
  }

  handleReply(event, commentIndex) {
    event.preventDefault();
    let state = Object.assign({},this.state);
    let newReply = data.replyTemplate;
    newReply.replytext = state.comments[commentIndex].replyInput;
    state.comments[commentIndex].replies.push(newReply);
    state.comments[commentIndex].replyInput = '';
    this.setState(state);
  }

  handleReplyUpdate(event, commentIndex) {
    event.preventDefault();
    let state = Object.assign({},this.state);
    state.comments[commentIndex].replyInput = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div id="container">
        <h1>R2H Book</h1>
        <ul className="comments">
          <li>
            <CommentForm
              name="commentForm"
              label="What's on your mind?"
              commentInput={this.state.commentInput}
              onChange={(e)=>this.handleCommentUpdate(e)}
              onClick={(e)=>this.handleComment(e)}
              buttonText="Comment"
            />
          </li>
          {
            this.state.comments.map(function(comment, i){
              return (
                <li key={`upper${i}`}><span>{comment.text}</span>
                  <Buttons
                    like={()=>this.handleResponse('likes',i, -1)}
                    likes={comment.likes}
                    dislike={()=>this.handleResponse('dislikes',i, -1)}
                    dislikes={comment.dislikes}
                    delete={()=>this.handleDelete(i, -1)}
                  />
                  <ul className="replies">
                    <li>
                      <CommentForm
                        name=""
                        label=""
                        commentInput={this.state.comments[i].replyInput}
                        onChange={(event)=>this.handleReplyUpdate(event, i)}
                        onClick={(event)=>this.handleReply(event,i)}
                        iteration={i}
                        buttonText="Reply"
                      />
                    </li>
                    { comment.replies.map(function(reply, index){
                      return (
                        <li key={`${index}-${i}`}><span>{reply.replytext}</span>
                          <Buttons
                            like={()=>this.handleResponse('likes',i, index)}
                            likes={reply.likes}
                            dislike={()=>this.handleResponse('dislikes',i, index)}
                            dislikes={reply.dislikes}
                            delete={()=>this.handleDelete(i, index)}
                          />
                        </li>
                      );
                    }, this) }
                  </ul>
                </li>
              );
            }, this)
          }
        </ul>
      </div>
    );
  }
}

export default App;
