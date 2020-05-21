/*
  ChildForms handles logic to display the correct child node edit/select/create functionality
  If slot has not been selected on parent (no parent int), display placeholder photo
*/

import React from 'react';
import EndingForm from './EndingNodeForm';
import NewNodeForm from './NewNodeForm';
import Button from '../../button';
import { getAnswerTextFromParentInt } from '../../../utils/index'
import ExistingNodeSelector from '../../Teacher/existingNodeSelector'


export default function ChildForms(props) {

  const {
    node,
    isEnding,
    parentInt,
    toggleIsEnding,
    useExistingNode,
    toggleChildType,
  } = props

  let parentAnswer = getAnswerTextFromParentInt(parentInt, node);
  parentAnswer = parentAnswer && parentAnswer.length > 50 ? parentAnswer.slice(0, 50).concat('...') : parentAnswer;

  const form = (
    <div className='form-field'>
      <h2>Create a New Node</h2>
      <h4>Choice {parentAnswer || ''} will lead to this node.</h4>
      <Button
        onClick={toggleChildType}
        text='Use existing Checkpoint'
      />

      <Button
        onClick={toggleIsEnding}
        text={isEnding ? 'Make Node a Checkpoint' : 'Make Node an Ending'}
      />
      {isEnding ? (
        <EndingForm />) : <NewNodeForm />}
    </div>
  )

  if (!parentInt) {
    return (
      <img
        alt="spiderweb"
        src={require('../../../images/spider.png')}
      />
    )
  }

  return useExistingNode ? <ExistingNodeSelector /> : form
}
