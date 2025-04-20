import React from 'react'
import Slider from "react-slick";
import styles from "./MainSlider.module.css"
import banner_1 from "../assets/images/banner-image.png"
import banner_3 from "../assets/images/banner-image2.png"
export default function MainSlider() {
    var settings = {
        // dots: true,
        infinite: true,
        arrows: false,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: true,
    };

    return (
        <div className=' my-5' >
            <Slider {...settings}>
                {/*----------------------------------------- first slide --------------------------------------- */}
                <div className="mainSlider_bg mt-3">
                    <div className={` d-flex flex-column-reverse flex-md-row align-items-center justify-content-between `}>
             

                        <div className="offset-md-1">
                            <div className="banner-content text-white p-2">
                                <h2>GoPro hero9 Black</h2>
                                <p>Limited stocks available. Grab it now!</p>
                               
                                <a href="shop.html" className='Slider-btn' > <button className="btn bg-main mt-3">Shop Collection</button></a>
                            </div>
                        </div>
                        <div className={`${styles.Slider_item_bg}  text-center p-2`}>
                           
                                <img src={banner_1} className="img-fluid w-75" alt="banner" />
                            
                        </div>

                    </div>
                </div>


   {/*----------------------------------------- second slide --------------------------------------- */}
             
              
      <div className="mainSlider_bg mt-3">
                    <div className={` d-flex flex-column-reverse flex-md-row align-items-center justify-content-between `}>
             

                        <div className="offset-md-1 p-2">
                            <div className="banner-content text-white ">
                                <h2>Macbook Collection</h2>
                                <p>Limited stocks available. Grab it now!</p>
                               
                                <a href="shop.html" className='Slider-btn' > <button className="btn bg-main mt-3">Shop Collection</button></a>
                            </div>
                        </div>
                        <div className={`${styles.Slider_item_bg}  text-center p-2`}>
                           
                                <img src={banner_3} className="img-fluid w-75" alt="banner" />
                            
                        </div>

                    </div>
                </div>


            </Slider>
        </div>
    )
}


