import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarouselItem from './CarouselItem';
import './Home.css';
import shortid from 'shortid';
import Caption from './Caption';
import { getAllServices } from '../../CommonFunc/CommonFunctions';
import ServiceCard from '../Services/ServiceCard';
import { Link } from 'react-router-dom';

const Home = () => {

      const [allServices, setAllServices] = useState([]);

  

    useEffect(() => {
      getAllServices(setAllServices);
    }, []);

    const carouselItems = allServices?.reverse()?.slice(0, 9);
    const latestService = allServices?.slice(0, 6);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 
        }
      };


    return (
        <div className="home-wrapper">
            {/* <div className="caption">
                <p>Hi. I am a photographer</p>
                <p>I capture <span className="highlight-w">impression</span></p>
            </div> */}
            <Caption/>

            <div className="carousel">
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                  autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={100}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    carouselItems.map(item => (
                        <CarouselItem img={item?.img} key={shortid.generate()}/>
                    ))
                }
            </Carousel>
            </div>

            <div className="service-container">
                <h3 style={{
                  color:"gray",
                  margin: "0px",
                  padding:"0px",
                  marginTop: "40px"
                }}>Services</h3>
                <div className="service-card-container">
                {
                    latestService?.map((item, i) => <ServiceCard i={item?._id} item={item} key={shortid.generate()}/>)
                }
                </div>

                <div style={{
                  width:"98%",
                  textAlign:"right",
                  paddingRight: "20px",
                  marginTop:"-30px"
                }}>
                    <Link style={{color:"gray", textDecoration:"none"}} to="/galary">
                    <p style={{
                      margin:"0px",
                      padding:"0px"
                    }}>See more</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
