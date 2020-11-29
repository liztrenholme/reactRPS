import scissorsImg from './assets/scissors.png'

const Scissors = ({ handleClick, display }) => {
    return display ? (
      <div>
        <img 
        src={scissorsImg} 
        alt='scissors'
        onClick={handleClick} />
      </div>
    ) : null
  }
  
  export default Scissors;