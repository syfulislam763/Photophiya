import React from 'react';
import "./CarouselItem.css";
import { motion } from "framer-motion";


const CarouselItem = ({img}) => {
    return (
        <motion.div 
        initial="hidden"
        animate="visible"
        variants={ {
            visible: { opacity: 1, x:0 ,transition:{ duration: 3, times: [0, 0.2, 1] }
        },
            hidden: { opacity: 0 , x: -500, transition:{ duration: 3, times: [0, 0.2, 1] }},
          }}

        className="carousel-item">
            <img src={img} alt="Img"/>
        </motion.div>
    )
}

export default CarouselItem;
