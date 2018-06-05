var React = require('react');

class LikeButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { liked : false };
  }


  toggle() {
    this.setState({liked: !this.state.liked});
  }

  render() {
    var name = this.props.name;
    var txt = this.state.liked ? 'Unlike' : 'Like';
    //var color = this.state.liked ? '#3b5998' : '#627AAC';
    var color = this.state.liked ? 'red' : 'black';
    var bold = this.state.liked ? 'bold' : 'normal';
    return (
      <p>
      <span style={{color: color, fontWeight: bold}}>
        {name} </span><span onClick={this.toggle.bind(this)}> {'\ud83d\udc4d' + txt}
      </span>
      </p>
    );
  }
};

export default LikeButton;
