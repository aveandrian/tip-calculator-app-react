import { useEffect, useState } from 'react'
import './App.css'

const tipsArray = [
  {
    id: 0,
    value: 5,
    isSelected: false
  },
  {
    id: 1,
    value: 10,
    isSelected: false
  },
  {
    id: 2,
    value: 15,
    isSelected: false
  },
  {
    id: 3,
    value: 20,
    isSelected: false
  },
  {
    id: 4,
    value: 50,
    isSelected: false
  }
]

function App() {
  const [settings, setSettings] = useState({
    bill: null,
    tip: null,
    people: null
  })
  const [tips, setTips] = useState(tipsArray)
  const [totalAmount, setTotalAmount] = useState(parseFloat(0).toFixed(2))
  const [tipAmount, setTipAmount] = useState(parseFloat(0).toFixed(2))

  useEffect(()=> {
    if(settings.people > 0){
      let total = (settings.bill + (settings.bill * (settings.tip / 100))) / settings.people
      setTotalAmount(total.toFixed(2))
      let tipPerPerson = (settings.bill * (settings.tip / 100))/ settings.people
      setTipAmount(tipPerPerson.toFixed(2))
    }
  }, [settings])

  function handleSettingChange(e){
    if(e.target.value < 0){
      e.preventDefault()
      if(e.target.name == 'tip'){
        e.target.value = null
      }
      return
    }
    setSettings(prevSettings => ({...prevSettings, [e.target.name]: Number(e.target.value)}))
    if(e.target.name == 'tip'){
      setTips(prevTips => prevTips.map(tip=>{
        return {...tip, isSelected: tip.value == parseFloat(e.target.value)}
      }))
    }
  }

  function resetTips(e){
    setTips(prevTips => prevTips.map(tip=>{
      return {...tip, isSelected: false}
    }))
    setSettings(prevSettings => ({...prevSettings, [e.target.name]: Number(e.target.value)}))
  }

  const tipsElements = tips.map(tip => {
    return (
      <button className={`tip-selector tip-button ${tip.isSelected ? "selected" : ""}`} key={tip.id} value={tip.value} name='tip' onClick={handleSettingChange}>{tip.value}%</button>
    )
  })

  function resetSetttings(){
    setSettings({
      bill: null,
      tip: null,
      people: null
    })
    setTips(tipsArray)
    setTotalAmount(0)
    setTipAmount(0)
    document.getElementsByClassName('tip-input')[0].value = ""
  }

  return (
    <>
      <img src='/images/logo.svg' className='logo' alt='Logo'></img>
      <main>
        <section className='settings-section'>
          <div className='bill-container'>
            <p className='bill-text'>Bill</p>
            <div className='input-container'>
              <img className='icon dollar' src='/images/icon-dollar.svg' alt='Dollar Icon'></img>
              <input 
                type='number'
                min={0}
                className='bill-input' 
                name='bill' 
                placeholder='0'
                onChange={handleSettingChange}
                value={settings.bill ? settings.bill : ""}
              />
            </div>
          </div>
          <div className='tip-container'>
            <p className='tip-text'>Select Tip %</p>
            <div className='tip-select-container'>
              {tipsElements}
              <input 
                type='number' 
                min={0}
                pattern='[0-9]'
                placeholder='Custom' 
                className='tip-selector tip-input' 
                onClick={resetTips} 
                name='tip'
                onChange={handleSettingChange}
              />
            </div>
          </div>
          <div className='people-container'>
            <div className='people-text-container'>
              <p className='people-text'>Number of People</p>
              <p className='error'>{settings.people == 0 ? "Can't be zero" : "" }</p>
            </div>
           
            <div className='input-container'>
              <img className='icon person' src='/images/icon-person.svg' alt='People Icon'></img>
              <input 
                type='number'
                name="people"
                min={0}
                className={`people-input ${settings.people == 0 ? "input-error" : "" }`}
                placeholder='0'
                onChange={handleSettingChange}
                value={settings.people ? settings.people : ""}
              />
            </div>
          </div>
        </section>
        <section className='results-section'>
          <div className='amount-container'>
            <div className='amount-text'>
              <p className='amount-text-bold'>Tip amount</p>
              <p className='amount-text-normal'>/person</p>
            </div>
            <h1 className='amount-result'>${tipAmount}</h1>
          </div>
          <div className='total-container'>
            <div className='total-text'>
              <p className='total-text-bold'>Total</p>
              <p className='total-text-normal'>/person</p>
            </div>
            <h1 className='total-result'>${totalAmount}</h1>
          </div>
          <button className='reset-btn' disabled={totalAmount == 0} onClick={resetSetttings}>Reset</button>
        </section>
      </main>
      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
      </footer>
    </>
  )
}

export default App
