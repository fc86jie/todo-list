/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-11-04 11:35:19
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-11-04 20:29:51
 * @FilePath: \react\react-learn\todo-list\src\components\TodoItem.js
 * @Description:
 */
import { useState, useRef, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { del, toggle, update } from '../reducers/todo';
import { Checkbox, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './TodoItem.less';

function TodoItem(props) {
  const dispatch = useDispatch();
  const { id, text, completed } = props.data;
  const ipEle = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [ipVal, setIpVal] = useState(text);

  /**
   * 聚焦input
   */
  useEffect(() => {
    ipEle?.current?.focus();
  });

  /**
   * 删除当前项
   */
  const onDel = () => {
    dispatch(del(id));
  };

  /**
   * 切换完成状态
   */
  const onToggle = () => {
    dispatch(
      toggle({
        id,
        completed: !completed,
      })
    );
  };

  /**
   * 进入编辑状态
   */
  const enterEdit = () => {
    // 非完成状态可进入编辑态
    if (!completed) {
      setIsEdit(true);
    }
  };

  /**
   * input发生变化时
   * @param {*} e
   *
   */
  const onChange = e => {
    setIpVal(e.target.value);
  };

  /**
   * 重置输入框
   */
  const onRest = () => {
    setIpVal(text);
    setIsEdit(false);
  };

  /**
   * 更改条目
   */
  const onEnter = () => {
    dispatch(
      update({
        id,
        text: ipVal,
      })
    );
    setIsEdit(false);
  };

  return (
    <div className={'todo-item' + (completed ? ' completed' : '')}>
      <div className="left-ct">
        {isEdit ? (
          <Input value={ipVal} onChange={onChange} onBlur={onRest} onPressEnter={onEnter} ref={ipEle} />
        ) : (
          <>
            <Checkbox checked={completed} onChange={onToggle} />
            <div className="item-text" onClick={enterEdit}>
              {text}
            </div>
          </>
        )}
      </div>
      {isEdit ? '' : <CloseOutlined onClick={onDel} className="item-del" />}
    </div>
  );
}

export default memo(TodoItem, (prevProps, nextProps) => {
  // 优化子组件渲染，当数据发生变化在重新渲染
  return prevProps.data === nextProps.data;
});
