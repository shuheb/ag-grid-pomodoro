import { memo, useContext } from 'react';
import { PomodoroContext } from '../../PomodoroContext';
import TypeComponent from '../TypeComponent';

const TypeCellRenderer = memo(props => {
  console.log('TypeCellRenderer');
  const { changePomodoroType } = useContext(PomodoroContext);
  const {type, id} = props.node.data;

  return (<TypeComponent type={type} id={id} changePomodoroType={changePomodoroType} />)
});

export default TypeCellRenderer;