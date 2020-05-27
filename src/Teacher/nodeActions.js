import { updateAdventureById } from './adventureActions'
import { fetchAuthPost, fetchAuthDelete, fetchAuthPut, fetchAuthPatch } from '../fetch'
import {
  NODE_ERROR,
  NODE_REQUEST,
  TOGGLE_ENDING,
  STAGE_CHILD_NODE,
  SET_CURRENT_NODE,
  TOGGLE_CHILD_TYPE,
  TOGGLE_UPDATE_FORM,
  CLEAR_CURRENT_NODE,
  UPDATE_NODE_SUCCESS,
  CREATE_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  TOGGLE_NODE_DELETING,
  NODE_FORM_WITH_POINTER,
} from './constants'

export const nodeError = (error) => ({
  type: NODE_ERROR,
  error,
})

export const nodeRequest = () => ({
  type: NODE_REQUEST,
})

export const nodeFormWithPointer = (parentInt) => ({
  type: NODE_FORM_WITH_POINTER,
  parentInt,
})

export const clearCurrentNode = () => ({
  type: CLEAR_CURRENT_NODE,
})

export const stageChildNode = (node) => ({
  type: STAGE_CHILD_NODE,
  node,
})

export const toggleChildType = () => ({
  type: TOGGLE_CHILD_TYPE,
})

// set current node will now also normalize isEnding in state to it so they are in  sync
export const setCurrentNode = (node) => ({
  type: SET_CURRENT_NODE,
  node,
})

export const createNodeSuccess = (nodeId) => ({
  type: CREATE_NODE_SUCCESS,
  nodeId,
})

export const toggleUpdateForm = (currentNode) => {
  return {
    type: TOGGLE_UPDATE_FORM,
    nodeId: currentNode ? currentNode.id : null,
    isEnding: currentNode ? currentNode.ending : false,
  }
}

export const updateNodeSuccess = (nodeId) => ({
  type: UPDATE_NODE_SUCCESS,
  nodeId,
})

export const deleteNodeSuccess = (nodeId) => ({
  type: DELETE_NODE_SUCCESS,
  nodeId,
})

export const toggleNodeDeleting = () => ({
  type: TOGGLE_NODE_DELETING,
})

export const toggleEnding = () => ({
  type: TOGGLE_ENDING,
})

export const createNode = (nodeData) => async (dispatch, getState) => {
  try {
    const { authToken } = getState().auth

    dispatch(nodeRequest())
    const res = await fetchAuthPost(authToken, `adventure/${nodeData.adventureId}/node/`, nodeData)
    const adventure = await dispatch(updateAdventureById(res.adventureId))

    const nodeId = nodeData.parentId ? nodeData.parentId : res.createdNode.id
    const updatedNode = getNodeFromCurrentAdventure(nodeId, adventure)

    dispatch(setCurrentNode(updatedNode))
    dispatch(createNodeSuccess(nodeId))
  } catch (err) {
    dispatch(nodeError(err))
  }
}

export const deleteNode = (adventureId, nodeId) => async (dispatch, getState) => {
  try {
    const { authToken } = getState().auth

    dispatch(nodeRequest())
    await fetchAuthDelete(authToken, `adventure/${adventureId}/node/${nodeId}`)

    const adventure = await dispatch(updateAdventureById(adventureId))

    dispatch(toggleNodeDeleting())
    dispatch(setCurrentNode(adventure.head))
    dispatch(deleteNodeSuccess())
  } catch (err) {
    dispatch(nodeError(err))
  }
}

export const linkNodesById = (idObjectWithParentInt) => async (dispatch, getState) => {
  try {
    const authToken = getState().auth.authToken
    const { adventureId, parentId } = idObjectWithParentInt

    dispatch(nodeRequest())
    await fetchAuthPost(authToken, `adventure/${adventureId}/node/linkNodes`, idObjectWithParentInt)

    const adventure = await dispatch(updateAdventureById(adventureId))
    const updatedNode = getNodeFromCurrentAdventure(parentId, adventure)

    dispatch(setCurrentNode(updatedNode))
    dispatch(updateNodeSuccess())
  } catch (err) {
    dispatch(nodeError(err))
  }
}

export const updateNode = (nodeData) => async (dispatch, getState) => {
  try {
    const { nodeId } = nodeData
    const { authToken } = getState().auth
    const adventureId = getState().adventure.currentAdventure.id

    dispatch(nodeRequest())
    await fetchAuthPut(authToken, `adventure/${adventureId}/node/${nodeId}`, nodeData)
    dispatch(toggleUpdateForm())

    const adventure = await dispatch(updateAdventureById(adventureId))
    const updatedNode = getNodeFromCurrentAdventure(nodeId, adventure)

    dispatch(setCurrentNode(updatedNode))
    dispatch(updateNodeSuccess())
  } catch (err) {
    dispatch(nodeError(err))
  }
}

export const removePointer = (nodeIdAndPointer) => async (dispatch, getState) => {
  try {
    const { authToken } = getState().auth
    const adventureId = getState().adventure.currentAdventure.id

    dispatch(nodeRequest())
    await fetchAuthPatch(
      authToken,
      `adventure/${adventureId}/node/${nodeIdAndPointer.nodeId}`,
      nodeIdAndPointer
    )

    const adventure = await dispatch(updateAdventureById(adventureId))
    const updatedNode = getNodeFromCurrentAdventure(nodeIdAndPointer.nodeId, adventure)

    dispatch(setCurrentNode(updatedNode))

    return dispatch(updateNodeSuccess())
  } catch (err) {
    dispatch(nodeError(err))
  }
}

// helper fn to find node in adventure
function getNodeFromCurrentAdventure(nodeId, adventure) {
  let nodeToReturn = adventure.nodes.find((node) => node.id === nodeId)
  return nodeToReturn
}
