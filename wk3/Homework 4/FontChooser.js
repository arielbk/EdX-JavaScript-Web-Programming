class FontChooser extends React.Component {

  constructor(props) {
  	super(props);
    this.state = {
      toolsHide: true,
      checked: this.props.bold == 'true' ? true : false,
      size: this.initialSize(),
      color: Number(this.props.size) > Number(this.props.min) && Number(this.props.size) < Number(this.props.max) ? 'black' : 'red',
    };
  }

  initialSize() {
    var min = Number(this.props.min);
    var max = Number(this.props.max);
    var size = Number(this.props.size);

    // If min is greater than max, size is stuck on the greater value, 'min'
    if (min > max) {
      return min;
    }

    if (size > min && size < max) {
      return size;
    } else if (size <= min) {
      if (min < 1) {
        return 1;
      } else {
        return min;
      }
    } else { // if initial size is larger than or equal to max
      return max;
    }
  }

  toggler() {
    this.setState({toolsHide: !this.state.toolsHide});
  }

  checkHandler() {
    this.setState({checked: !this.state.checked});
  }

  sizeIncrement() {

    if (this.state.size < this.props.max)
    {
      this.setState({size: this.state.size + 1});
    }

    if (this.state.size >= Number(this.props.max) - 1) {
      this.setState({color: 'red'});
    } else {
      this.setState({color: 'black'});
    }
  }

  sizeDecrement() {

    if (this.state.size > this.props.min) {
      this.setState({size: this.state.size - 1});
    }

    if (this.state.size <= Number(this.props.min) + 1) {
      this.setState({color: 'red'});
    } else {
      this.setState({color: 'black'})
    }
  }

  resetSize() {
    this.setState({size: Number(this.props.size)});
  }

  render() {
    var boldInitial = this.state.checked ? 'true' : '';

    var sizeMin = Number(this.props.min);
    if (sizeMin < 1) {
      sizeMin = 1;
    }

    var sizeMax = Number(this.props.max);
    if (sizeMax < sizeMin) {
      sizeMax = sizeMin;
    }

    var weight = this.state.checked ? 'bold' : 'normal';
    var toolsHide = this.state.toolsHide ? 'true' : '';

    return(
       <div>
         <input onChange={this.checkHandler.bind(this)} type="checkbox" id="boldCheckbox" hidden={toolsHide} checked={boldInitial}/>
         <button onClick={this.sizeDecrement.bind(this)} id="decreaseButton" hidden={toolsHide}>-</button>
         <span onDoubleClick={this.resetSize.bind(this)} id="fontSizeSpan" style={{color: this.state.color}} hidden={toolsHide}>{this.state.size}</span>
         <button onClick={this.sizeIncrement.bind(this)} id="increaseButton" hidden={toolsHide}>+</button>
         <span onClick={this.toggler.bind(this)} id="textSpan" style={{ fontWeight: weight, fontSize: this.state.size+'px'}}>{this.props.text}</span>
       </div>
    );
  }
}
