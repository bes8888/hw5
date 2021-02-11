function levelOfService(ride) {
  let levelOfService
  if (ride.length > 1) {
    levelOfService = 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    levelOfService = 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    levelOfService = 'Noober XL'
  } else {
    levelOfService = 'Noober X'
  }
  return levelOfService
}

function renderRides(ridesArray) {
  for (let i = 0; i < ridesArray.length; i++) {
    let ride = ridesArray[i]

    document.querySelector('.rides').insertAdjacentHTML('beforeend', `
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        <i class="fas fa-car-side"></i>
        <span>${levelOfService(ride)}</span>
      </h1>
    `)

    let borderClass
    let backgroundClass
    if (levelOfService(ride) == 'Noober Purple') {
      borderClass = 'border-purple-500'
      backgroundClass = 'bg-purple-600'
    } else {
      borderClass = 'border-gray-900'
      backgroundClass = 'bg-gray-600'
    }

    for (let i = 0; i < ride.length; i++) {
      let leg = ride[i]

      document.querySelector('.rides').insertAdjacentHTML('beforeend', `
        <div class="border-4 ${borderClass} p-4 my-4 text-left">
          <div class="flex">
            <div class="w-1/2">
              <h2 class="text-2xl py-1">${leg.passengerDetails.first} ${leg.passengerDetails.last}</h2>
              <p class="font-bold text-gray-600">${leg.passengerDetails.phoneNumber}</p>
            </div>
            <div class="w-1/2 text-right">
              <span class="rounded-xl ${backgroundClass} text-white p-2">
                ${leg.numberOfPassengers} passengers
              </span>
            </div>
          </div>
          <div class="mt-4 flex">
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">PICKUP</div>
              <p>${leg.pickupLocation.address}</p>
              <p>${leg.pickupLocation.city}, ${leg.pickupLocation.state} ${leg.pickupLocation.zip}</p>
            </div>
            <div class="w-1/2">
              <div class="text-sm font-bold text-gray-600">DROPOFF</div>
              <p>${leg.dropoffLocation.address}</p>
              <p>${leg.dropoffLocation.city}, ${leg.dropoffLocation.state} ${leg.dropoffLocation.zip}</p>
            </div>
          </div>
        </div>
      `)
    }
  }
}





function buttonhightlight(selection) {
  // clear all backgrounds
    buttons = document.querySelectorAll('a')
    for (i=0; i<buttons.length; i++) {
      buttons[i].classList.remove('bg-gray-400')
    }
  
   
  // highlight selected button
   
  document.querySelector(`#${selection}`).classList.add('bg-gray-400')

 }

window.addEventListener('DOMContentLoaded', function() {
  // YOUR CODE
// optional assignment:  this section loops thru buttons to reduce amount of code


let buttons = document.querySelectorAll('a')

let servicelevel
let servicetag



for (i=0; i<buttons.length; i++) {

  buttons[i].addEventListener('click', async function () {

    servicelevel = event.target.innerHTML
    servicetag = event.target.getAttribute('id')
  
    
    let response = await fetch('https://kiei451.com/api/rides.json')
    let allrides = await response.json()

    // clear out HTML from any previous selections
        document.querySelector('.rides').innerHTML = null

    // Figure out which rides to display, pass to render function
      
      if (servicelevel == 'All Rides') {
        renderRides(allrides)
      }
      else {
        let selectedrides = []
        for (i=0; i<allrides.length; i++) {
              if (levelOfService(allrides[i]) ==`${servicelevel}`) {
                    selectedrides.push(allrides[i])
                  }
              }
        renderRides(selectedrides)
      }

        buttonhightlight(servicetag)
  })
  }




  // ----- this section codes each button seaparetly --- 

    // // All-button:  display all rides when clicked
    //   let allbutton = document.querySelector('#all-filter')
    //   allbutton.addEventListener('click', async function() {
        
       
    //       // go get the rides data
    //         let response = await fetch('https://kiei451.com/api/rides.json')
    //         let allrides = await response.json()
          
    //     console.log('All-Rides Selected')
    //     // clear out HTML from any previous selections
    //     document.querySelector('.rides').innerHTML = null
    //     renderRides(allrides)
    //     buttonhightlight(0)
    //      }
    //   )
    // //  Noober Purple Button:  Display only Noober-Purple Rides
    //   let purplebutton = document.querySelector('#noober-purple-filter')
    //   purplebutton.addEventListener('click', async function() {
        
    //       // go get the rides data
    //       let response = await fetch('https://kiei451.com/api/rides.json')
    //       let allrides = await response.json()
        
       
    //     console.log('Noober Purple Selected')
    //     // clear out HTML from any previous selections
    //     document.querySelector('.rides').innerHTML = null
    //     let selectedrides = []
    //     for (i=0; i<allrides.length; i++) {
    //         if (levelOfService(allrides[i]) =='Noober Purple') {
    //           selectedrides.push(allrides[i])
    //         }
    //     }
    //     renderRides(selectedrides)
    //     buttonhightlight(2)
    //   })

    //   //  Noober Pool Button:  Display only Noober-Pool Rides
    //   let poolbutton = document.querySelector('#noober-pool-filter')
    //   poolbutton.addEventListener('click', async function() {
        
    //       // go get the rides data
    //       let response = await fetch('https://kiei451.com/api/rides.json')
    //       let allrides = await response.json()
        
    //     console.log('Noober Pool Selected')
    //     // clear out HTML from any previous selections
    //     document.querySelector('.rides').innerHTML = null
    //     let selectedrides = []
    //     for (i=0; i<allrides.length; i++) {
    //         if (levelOfService(allrides[i]) =='Noober Pool') {
    //           selectedrides.push(allrides[i])
    //         }
    //     }
    //     renderRides(selectedrides)
    //     buttonhightlight(1)
    //   })

      
    //   //  Noober XL Button:  Display only Noober-XL Rides
    //   let xlbutton = document.querySelector('#noober-xl-filter')
    //   xlbutton.addEventListener('click', async function() {
        
    //       // go get the rides data
    //       let response = await fetch('https://kiei451.com/api/rides.json')
    //       let allrides = await response.json()
        
    //     console.log('Noober XL Selected')
    //     // clear out HTML from any previous selections
    //     document.querySelector('.rides').innerHTML = null
    //     let selectedrides = []
    //     for (i=0; i<allrides.length; i++) {
    //         if (levelOfService(allrides[i]) =='Noober XL') {
    //           selectedrides.push(allrides[i])
    //         }
    //     }
    //     renderRides(selectedrides)
    //     buttonhightlight(3)
    //   })

    //   //  Noober X Button:  Display only Noober-X Rides
    //   let xbutton = document.querySelector('#noober-x-filter')
    //   xbutton.addEventListener('click', async function() {
        
    //       // go get the rides data
    //       let response = await fetch('https://kiei451.com/api/rides.json')
    //       let allrides = await response.json()
        
    //     console.log('Noober X Selected')
    //       // clear out HTML from any previous selections
    //         document.querySelector('.rides').innerHTML = null
    //     let selectedrides = []
    //     for (i=0; i<allrides.length; i++) {
    //         if (levelOfService(allrides[i]) =='Noober X') {
    //           selectedrides.push(allrides[i])
    //         }
    //     }
    //     renderRides(selectedrides)
    //     buttonhightlight(4)
    //   })






})

