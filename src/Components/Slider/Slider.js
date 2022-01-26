import React, {useState} from 'react';
import './Slider.css'
import dataSlider from './dataSlider'
import BtnSlider from './BtnSlider';

export default function Slider() {

const [slideAnim, setSlideAnim] = useState({
    index: 1,
    inProgress: false //va permettre d'empecher que l'animation se lance trop vite si les clics sont trop rapprochés
})


const nextSlide = () => {

    let newObj = {...slideAnim} 

    if(slideAnim.index < dataSlider.length && !slideAnim.inProgress){
        newObj.index = newObj.index + 1
        newObj.inProgress = true
        setSlideAnim(newObj)

        setTimeout(() => {
            newObj.index = newObj.index + 1
            newObj.inProgress = false
            setSlideAnim(newObj)
        }, 1000)

    } else if (slideAnim.index === dataSlider.length && !slideAnim.inProgress) {
        newObj.index = 1
        newObj.inProgress = true
        setSlideAnim(newObj)

        setTimeout(() => {
            newObj.index = 1
            newObj.inProgress = false
            setSlideAnim(newObj)
        }, 1000)
    }

    }


const prevSlide = () => {
    if(slideAnim.index > 1 && !slideAnim.inProgress) {

        setSlideAnim({index: slideAnim.index - 1, inProgress: true})

        setTimeout(() => {
            setSlideAnim({index: slideAnim.index - 1, inProgress: false})
        }, 400)

    } else if (slideAnim.index === 1 && !slideAnim.inProgress) {
        setSlideAnim({index: dataSlider.length, inProgress: true})

        setTimeout(() => {
            setSlideAnim({index: dataSlider.length, inProgress: false})
        }, 400)
    }
}


  return (
  <div className='container-slider'>
      {dataSlider.map((obj, index) => {
          return (
              <div
              key={obj.id}
              className={slideAnim.index === index + 1 ? "slide active-anim" : "slide"}
              >
                  <img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} alt="" />
              </div>
          )
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"}/>
      <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
  </div>
  )
}
