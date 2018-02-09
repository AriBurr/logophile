import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components'
import { connect } from 'react-redux'
import BookCover from './BookCover'
import { paginateText } from '../../utils/modules'
import { booksWithRatings } from '../../actions/books';
import { Rating, Header } from 'semantic-ui-react'

const Container = styled.div`
  margin: 0 auto;
  padding: 40px;
  width: 80%;
  color: #333;
  h1{
    margin-bottom: 2px !important;
    font-size: 32px !important;
  }
  hr{
    border: none;
    height: 3px;
    width: 25px;
    background-color: #1DD3B0;
    margin: 0;
  }
  h3{
    margin: 0 0 3px 0 !important;
    padding-top: 0 !important;
    font-weight: 400 !important;
    color: #939196 !important;
  }

  .slick-prev:before,
  .slick-next:before{
    color: black;
  }
`
const ImgContainer = styled.div`
  text-align: center;
  img{
    margin: 0 auto;
  }
`
function Arrow(props) {
  const {className, onClick} = props
  return (
    <div
      className={className}
      style={{display: 'block'}}
      onClick={onClick}
    ></div>
  );
}

class BooksCarousel extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(booksWithRatings())
  }

  mapTopBooks = () => {
    const { topBooks } = this.props
    return topBooks.map(book => (
      <ImgContainer key={book.item.id}>
        <BookCover style={{margin: '0 auto'}} book={book} />
        <Header>{ paginateText(book.item.volumeInfo.title, 15) }</Header>
        <Rating icon='star' defaultRating={book.avg} maxRating={5} disabled />
      </ImgContainer>
    ))
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      nextArrow: <Arrow />,
      prevArrow: <Arrow />,
      slidesToShow: 7,
      slidesToScroll: 7,
      initialSlide: 0,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };
    return (
      <Container>
        <Header as='h1'>Books</Header>
        <Header as='h3'>Read like you mean it.</Header>
        <hr />
        <Header as='h2'>Highest Rated</Header>
        <Slider {...settings}>
          {this.mapTopBooks()}
        </Slider>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topBooks: state.topBooks
  }
}

export default connect(mapStateToProps)(BooksCarousel);
