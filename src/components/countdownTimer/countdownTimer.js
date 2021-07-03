import React, { useEffect, useState, useRef } from 'react'


function CountdownTimer({ deadline=new Date(new Date().getTime() + 1 * 60000), onFinish}) {

    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    const timeinterval = useRef()

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date())
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        const days = Math.floor(total / (1000 * 60 * 60 * 24))
        
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }
      
      function initializeClock(endtime) {
      
        function updateClock() {
          const t = getTimeRemaining(endtime)

          setMinutes(('0' + t.minutes).slice(-2))
          setSeconds(('0' + t.seconds).slice(-2))
      
          if (t.total <= 0) {
            clearInterval(timeinterval.current)
            onFinish()
          }
        }
      
        updateClock()
        timeinterval.current = setInterval(updateClock, 1000)
      }
      
      useEffect(() => {
        initializeClock(deadline);
        return () => clearInterval(timeinterval.current)
      }, [])

      return (
        <div className="d-flex">
          <div>
            <div className="mr-1">{minutes}</div>
          </div>
          :
          <div>
            <div className="ml-1">{seconds}</div>
          </div>
        </div>
      )
}

export default CountdownTimer