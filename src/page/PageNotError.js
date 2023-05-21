import React from 'react'
import "../css/page404.css"
import { useNavigate } from 'react-router-dom';
export default function PageNotError() {
  let navigate=useNavigate();
    function drawVisor() {
        const canvas = document.getElementById('visor');
        
        
       
      }
      
      const cordCanvas = document.getElementById('cord');
     
      
      let y1 = 160;
      let y2 = 100;
      let y3 = 100;
      
      let y1Forward = true;
      let y2Forward = false;
      let y3Forward = true;
      
      function animate() {
        requestAnimationFrame(animate);
       
        
      
       
        
        if (y1 === 100) {
          y1Forward = true;
        }
        
        if (y1 === 300) {
          y1Forward = false;
        }
        
        if (y2 === 100) {
          y2Forward = true;
        }
        
        if (y2 === 310) {
          y2Forward = false;
        }
        
        if (y3 === 100) {
          y3Forward = true;
        }
        
        if (y3 === 317) {
          y3Forward = false;
        }
        
        y1Forward ? y1 += 1 : y1 -= 1;
        y2Forward ? y2 += 1 : y2 -= 1;
        y3Forward ? y3 += 1 : y3 -= 1;
      }
      
      drawVisor();
      animate();
      const back =()=>{
        navigate("/")

      }
  return (
    <div>
    <div class="moon"></div>
    <div class="moon__crater moon__crater1"></div>
    <div class="moon__crater moon__crater2"></div>
    <div class="moon__crater moon__crater3"></div>
    
    <div class="star star1"></div>
    <div class="star star2"></div>
    <div class="star star3"></div>
    <div class="star star4"></div>
    <div class="star star5"></div>
    
    <div class="error">
      <div class="error__title">404</div>
      <div class="error__subtitle">Hmmm...</div>
      <div class="error__description">It looks like one of the  developers fell asleep</div>
      <button class="error__button error__button--active" onClick={back}>LOGIN</button>
      <button class="error__button">CONTACT</button>
    </div>
    
    <div class="astronaut">
      <div class="astronaut__backpack"></div>
      <div class="astronaut__body"></div>
      <div class="astronaut__body__chest"></div>
      <div class="astronaut__arm-left1"></div>
      <div class="astronaut__arm-left2"></div>
      <div class="astronaut__arm-right1"></div>
      <div class="astronaut__arm-right2"></div>
      <div class="astronaut__arm-thumb-left"></div>
      <div class="astronaut__arm-thumb-right"></div>
      <div class="astronaut__leg-left"></div>
      <div class="astronaut__leg-right"></div>
      <div class="astronaut__foot-left"></div>
      <div class="astronaut__foot-right"></div>
      <div class="astronaut__wrist-left"></div>
      <div class="astronaut__wrist-right"></div>
      
      <div class="astronaut__cord">
        <canvas id="cord" height="500px" width="500px"></canvas>
      </div>
      
      <div class="astronaut__head">
        <canvas id="visor" width="60px" height="60px"></canvas>
        <div class="astronaut__head-visor-flare1"></div>
        <div class="astronaut__head-visor-flare2"></div>
      </div>
    </div>
    </div>
  )
}
