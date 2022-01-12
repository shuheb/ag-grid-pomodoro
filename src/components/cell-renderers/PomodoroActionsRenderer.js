

import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
const PomodoroActionsRenderer = memo((props) => {
    // console.log('PomodoroActionsRenderer')
    const { markAsComplete, deletePomodoro} = useContext(PomodoroContext);
    const { themes } = props;
    const type = props.node.data.type;
    const { background } = themes[type]
    const { id } = props.node.data;
    return (
        <div>
            <button onClick={() => markAsComplete({ id })} style={{ color: background }}>
                Mark as complete
            </button>
            <button onClick={() => deletePomodoro({ id })}>Delete</button>
        </div>
    )
});

export default PomodoroActionsRenderer;