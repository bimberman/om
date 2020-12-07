import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      activeImg: 0
    };
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.intervalId = 0;
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.restartAutoScroll = this.restartAutoScroll.bind(this);
  }

  componentDidMount() {
    const imgList = this.props.imgList;
    this.setState({ imgList: imgList });
    this.intervalId = setInterval(this.next, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  next() {
    let newActiveImg = this.state.activeImg + 1;

    if (newActiveImg >= this.props.imgList.length) {
      newActiveImg = 0;
    }

    this.setState({
      activeImg: newActiveImg
    });
    this.restartAutoScroll();
  }

  previous() {
    let newActiveImg = this.state.activeImg;
    if (newActiveImg) {
      newActiveImg--;
    } else {
      newActiveImg = this.state.imgList.length - 1;
    }

    this.setState({
      activeImg: newActiveImg
    });
    this.restartAutoScroll();
  }

  handleArrowClick(event) {
    event.currentTarget.name === 'next'
      ? this.next()
      : this.previous();
  }

  restartAutoScroll() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.next, 5000);
  }

  handleNavClick(event) {
    this.restartAutoScroll();
    const newActiveImg = parseInt(event.currentTarget.id);
    this.setState({
      activeImg: newActiveImg
    });
  }

  render() {
    const mainImage = this.state.imgList[this.state.activeImg];
    const width = this.props.width;
    const navBar = this.state.imgList.map((image, index) => {
      return (<img
        key={index}
        id={index}
        alt="Responsive image"
        className="card-img-center border col-1 m-0 p-0"
        onClick={this.handleNavClick}
        src={image}
      />
      );
    });
    return (
      <div className={`${width}`}>
        <div className='row d-flex justify-content-between flex-row main'>
          <button
            name="previous"
            className="arrow nav-left border-0 m-0 p-0 col-1 bg-white column"
            onClick={this.handleArrowClick}>
            <i className="fa fa-angle-left"></i>
          </button>
          <img
            alt="Responsive image"
            className="col-10 m-0 p-0"
            src={mainImage}
          />
          <button
            name="next"
            className="arrow nav-right col-1 m-0 p-0 border-0 bg-white column"
            onClick={this.handleArrowClick}>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
        <div className={'row d-flex justify-content-center'}>
          {navBar}
        </div>
      </div>
    );
  }
}
