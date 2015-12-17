var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		)
	}
});

var CommentList = React.createClass({displayName: 'CommentList',
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} children={comment.text}>
					
				</Comment>
			);
		});	

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		)	
	}
});


var CommentForm = React.createClass({
	getInitialState: function() {
		return {author: '', text: ''};
	},
	handleAuthorChange: function(e) {
		this.setState({author: e.target.value});
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if(!text || !author) {
			return;
		}

		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="input name" value={this.state.author} onChange={this.handleAuthorChange} />
				<input type="text" placeholder="input something" value={this.state.text} onChange={this.handleTextChange} />
				<input type="submit" value="Post" />
			</form>
		)
	}
});


var CommentBox = React.createClass({
	handleCommentSubmit: function(comment) {
		this.props.data.push(comment);
		this.setState({data: data});
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.props.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		)
	}
});

ReactDOM.render(
	<CommentBox data={data} />,
	document.getElementById('example')
)