/*
  ChildForms handles logic to display the correct child node edit/select/create functionality
  If slot has not been selected on parent (no parent int), display placeholder photo
*/

import React from 'react';
import EndingForm from './EndingNodeForm';
import NewNodeForm from './NewNodeForm';
import ExistingNodeSelector from '../../Teacher/existingNodeSelector'

export default function ChildForms({ isEnding, useExistingNode, parentInt }) {

  const newNodeForm = isEnding ? <EndingForm /> : <NewNodeForm />

  if (!parentInt) {
    return (
      <img
        alt="spiderweb"
        src={require('../../../images/spider.png')}
      />
    )
  }

  return useExistingNode ? <ExistingNodeSelector /> : newNodeForm
}
