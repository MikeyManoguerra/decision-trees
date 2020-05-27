/*
  ChildForms handles logic to display the correct child node edit/select/create functionality
  If slot has not been selected on parent (no parent int), display placeholder photo
*/

import React from 'react'
import Button from '../../components/Button'
import { EndingForm, CheckpointForm } from './forms'
import { getAnswerTextFromParentInt } from '../../utils/index'
import ExistingNodeSelector from './existingNodeSelector'

export default function ChildForms(props) {
  const {
    node,
    isEnding,
    parentInt,
    createNode,
    adventureId,
    toggleIsEnding,
    useExistingNode,
    toggleChildType,
  } = props

  const submitCheckpoint = (values) => {
    const { title, question, answerA, answerB, answerC, answerD, videoURL, textContent } = values

    const newNode = {
      title,
      answerA,
      answerB,
      answerC,
      answerD,
      videoURL,
      question,
      parentInt,
      textContent,
      adventureId,
      ending: false,
      parentId: node.id,
    }

    return createNode(newNode)
  }

  const submitEnding = (values) => {
    let { title, videoURL, textContent } = values
    let newNode = {
      title,
      videoURL,
      parentInt,
      adventureId,
      textContent,
      ending: true,
      parentId: node.id,
    }

    return createNode(newNode)
  }

  let parentAnswer = getAnswerTextFromParentInt(parentInt, node)
  parentAnswer =
    parentAnswer && parentAnswer.length > 50
      ? parentAnswer.slice(0, 50).concat('...')
      : parentAnswer

  const form = (
    <div className="form-field">
      <h2>Create a New Node</h2>
      <h4>Choice {parentAnswer || ''} will lead to this node.</h4>
      <Button onClick={toggleChildType} text="Use existing Checkpoint" />

      <Button
        onClick={toggleIsEnding}
        text={isEnding ? 'Make Node a Checkpoint' : 'Make Node an Ending'}
      />
      {isEnding ? (
        <EndingForm onSubmit={(values) => submitEnding(values)} />
      ) : (
          <CheckpointForm onSubmit={(values) => submitCheckpoint(values)} />
        )}
    </div>
  )

  if (!parentInt) {
    return <img alt="spiderweb" src={require('../../images/spider.png')} />
  }

  return useExistingNode ? <ExistingNodeSelector /> : form
}
