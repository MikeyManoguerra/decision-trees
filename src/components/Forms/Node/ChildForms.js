/*
  ChildForms handles logic to display the correct child node edit/select/create functionality
  If slot has not been selected on parent (no parent int), display placeholder photo
*/

import React from 'react';
import EndingForm from './EndingNodeForm';
import NewNodeForm from './new-node-form';
import ExistingNodeSelector from '../../Teacher/existingNodeSelector'

export default function ChildForms({ isEnding, useExistingNode, parentInt }) {

  if (!parentInt) {
    return (
      <img
        alt="spiderweb"
        src={require('../../../images/spider.png')}
      />
    )
  }

  const newNodeForm = isEnding ? <EndingForm /> : <NewNodeForm />

  return useExistingNode ? <ExistingNodeSelector /> : newNodeForm
}
