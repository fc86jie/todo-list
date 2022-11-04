/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-11-04 11:35:11
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-11-04 20:35:06
 * @FilePath: \react\react-learn\todo-list\src\components\TodoList.js
 * @Description:
 */
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { add, clear } from '../reducers/todo';
import TodoItem from './TodoItem';
import { Input, Button } from 'antd';
import './TodoList.less';

export default function TodoList() {
  const [ipVal, setIpVal] = useState('');
  const list = useSelector(state => state.todo.list);
  const dispatch = useDispatch();

  // 完成数
  const completeNum = useMemo(() => {
    return list.filter(item => item.completed).length;
  }, [list]);

  // 未完成数
  const incompleteNum = useMemo(() => {
    return list.filter(item => !item.completed).length;
  }, [list]);

  /**
   * 当输入框改变时保存输入框的值
   * @param {*} e
   */
  const onChange = e => {
    setIpVal(e.target.value);
  };

  /**
   * 当按回车键时保存到TodoList中
   * @param {*} e
   */
  const onEnter = e => {
    let val = e.target.value.trim();
    if (val) {
      dispatch(
        add({
          id: nanoid(),
          text: e.target.value,
        })
      );
      setIpVal('');
    }
  };

  /**
   * 清除所有已完成的项目
   */
  const onClear = () => {
    dispatch(clear());
  };

  return (
    <div className="todo-list-container">
      <header>Todo Task</header>
      <Input value={ipVal} onChange={onChange} onPressEnter={onEnter} placeholder="What needs to be done?" />
      <div className="container">
        {list.map(item => (
          <TodoItem key={item.id} data={item}></TodoItem>
        ))}
      </div>

      <footer>
        <div>
          <span className="num">{incompleteNum}</span>项待完成
        </div>
        <div>
          <Button type="link" onClick={onClear}>
            清除
          </Button>
          <span className="num">{completeNum}</span>项已完成
        </div>
      </footer>
    </div>
  );
}
