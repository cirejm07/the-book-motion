/* globals Chart:false, feather:false */

(() => {
    'use strict'
  
    feather.replace({ 'aria-hidden': 'true' })
  
    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: false
        }
      }
    })
  })()
  

  // searchForm = document.querySelector('.search-form');

  // document.querySelector('#search-btn').onclick = () =>{
  //   searchForm.classList.toggle('active');
  // }
  
  // let loginForm = document.querySelector('.login-form-container');
  
  // document.querySelector('#login-btn').onclick = () =>{
  //   loginForm.classList.toggle('active');
  // }
  
  // document.querySelector('#close-login-btn').onclick = () =>{
  //   loginForm.classList.remove('active');
  // }
  
  // window.onscroll = () =>{
  
  //   searchForm.classList.remove('active');
  
  //   if(window.scrollY > 80){
  //     document.querySelector('.header .header-2').classList.add('active');
  //   }else{
  //     document.querySelector('.header .header-2').classList.remove('active');
  //   }
  
  // }
  
  // window.onload = () =>{
  
  //   if(window.scrollY > 80){
  //     document.querySelector('.header .header-2').classList.add('active');
  //   }else{
  //     document.querySelector('.header .header-2').classList.remove('active');
  //   }
  
  //   fadeOut();
  
  // }
  
  // function loader(){
  //   document.querySelector('.loader-container').classList.add('active');
  // }
  
  // function fadeOut(){
  //   setTimeout(loader, 4000);
  // }
  
  // var swiper = new Swiper(".books-slider", {
  //   loop:true,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 9500,
  //     disableOnInteraction: false,
  //   },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },
  //     768: {
  //       slidesPerView: 2,
  //     },
  //     1024: {
  //       slidesPerView: 3,
  //     },
  //   },
  // });
  
  // var swiper = new Swiper(".featured-slider", {
  //   spaceBetween: 10,
  //   loop:true,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 9500,
  //     disableOnInteraction: false,
  //   },
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },
  //     450: {
  //       slidesPerView: 2,
  //     },
  //     768: {
  //       slidesPerView: 3,
  //     },
  //     1024: {
  //       slidesPerView: 4,
  //     },
  //   },
  // });
  
  // var swiper = new Swiper(".arrivals-slider", {
  //   spaceBetween: 10,
  //   loop:true,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 9500,
  //     disableOnInteraction: false,
  //   },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },
  //     768: {
  //       slidesPerView: 2,
  //     },
  //     1024: {
  //       slidesPerView: 3,
  //     },
  //   },
  // });
  
  // var swiper = new Swiper(".reviews-slider", {
  //   spaceBetween: 10,
  //   grabCursor:true,
  //   loop:true,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 9500,
  //     disableOnInteraction: false,
  //   },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },
  //     768: {
  //       slidesPerView: 2,
  //     },
  //     1024: {
  //       slidesPerView: 3,
  //     },
  //   },
  // });
  
  // var swiper = new Swiper(".categories-slider", {
  //   spaceBetween: 10,
  //   grabCursor:true,
  //   loop:true,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 10000000,
  //     disableOnInteraction: false,
  //   },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 5,
  //     },
  //     768: {
  //       slidesPerView: 5,
  //     },
  //     1024: {
  //       slidesPerView: 5,
  //     },
  //   },
  // });


  
document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        document.getElementById('navbar_top').classList.add('fixed-top');
        // add padding top to show content behind navbar
        navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        document.getElementById('navbar_top').classList.remove('fixed-top');
         // remove padding top from body
        document.body.style.paddingTop = '0';
      } 
  });
  
}); 