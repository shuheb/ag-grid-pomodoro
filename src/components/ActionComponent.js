const ActionComponent = ({background, id, timerStarted, stopTimer, startTimer}) => {
    return (<div className="btn-container" >
        <button className="p-button" style={{ color: background }}
            onClick={() => timerStarted ? stopTimer({ id }) : startTimer({ id })}>
            {timerStarted ? 'STOP' : 'START'}
        </button>
    </div>)
}
export default ActionComponent;