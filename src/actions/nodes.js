import { updateAdventureById } from './adventure'
import { fetchPost, fetchDelete, fetchPut, fetchPatch } from '../fetch'
import {
  TOGGLE_ENDING,
  STAGE_CHILD_NODE,
  SET_CURRENT_NODE,
  CREATE_NODE_ERROR,
  TOGGLE_CHILD_TYPE,
  UPDATE_NODE_ERROR,
  DELETE_NODE_ERROR,
  TOGGLE_UPDATE_FORM,
  CLEAR_CURRENT_NODE,
  DELETE_NODE_REQUEST,
  UPDATE_NODE_SUCCESS,
  CREATE_NODE_SUCCESS,
  CREATE_NODE_REQUEST,
  UPDATE_NODE_REQUEST,
  DELETE_NODE_SUCCESS,
  TOGGLE_NODE_DELETING,
  NODE_FORM_WITH_POINTER,
} from '../constants/node'

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

export const createNodeRequest = () => ({
  type: CREATE_NODE_REQUEST,
})

export const createNodeSuccess = (nodeId) => ({
  type: CREATE_NODE_SUCCESS,
  nodeId,
})

export const createNodeError = (error) => ({
  type: CREATE_NODE_ERROR,
  error,
})

export const toggleUpdateForm = (currentNode) => {
  return {
    type: TOGGLE_UPDATE_FORM,
    nodeId: currentNode ? currentNode.id : null,
    isEnding: currentNode ? currentNode.ending : false,
  }
}

export const updateNodeRequest = () => ({
  type: UPDATE_NODE_REQUEST,
})

export const updateNodeSuccess = (nodeId) => ({
  type: UPDATE_NODE_SUCCESS,
  nodeId,
})

export const updateNodeError = (error) => ({
  type: UPDATE_NODE_ERROR,
  error,
})

export const deleteNodeRequest = () => ({
  type: DELETE_NODE_REQUEST,
})

export const deleteNodeSuccess = (nodeId) => ({
  type: DELETE_NODE_SUCCESS,
  nodeId,
})

export const deleteNodeError = (error) => ({
  type: DELETE_NODE_ERROR,
  error,
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

    dispatch(createNodeRequest())
    const res = await fetchPost(authToken, `adventure/${nodeData.adventureId}/node/`, nodeData)
    const adventure = await dispatch(updateAdventureById(res.adventureId))

    const nodeId = nodeData.parentId ? nodeData.parentId : res.createdNode.id
    const updatedNode = getNodeFromCurrentAdventure(nodeId, adventure)

    dispatch(setCurrentNode(updatedNode))
    dispatch(createNodeSuccess(nodeId))
  } catch (err) {
    dispatch(createNodeError(err))
  }
}

export const deleteNode = (adventureId, nodeId) => async (dispatch, getState) => {
  try {
    const { authToken } = getState().auth

    dispatch(deleteNodeRequest())
    await fetchDelete(authToken, `adventure/${adventureId}/node/${nodeId}`)

    const adventure = await dispatch(updateAdventureById(adventureId))

    dispatch(toggleNodeDeleting())
    dispatch(setCurrentNode(adventure.head))
    dispatch(deleteNodeSuccess())
  } catch (err) {
    dispatch(deleteNodeError(err))
  }
}

export const linkNodesById = (idObjectWithParentInt) => async (dispatch, getState) => {
  try {
    const authToken = getState().auth.authToken
    const { adventureId, parentId } = idObjectWithParentInt

    dispatch(updateNodeRequest())
    await fetchPost(authToken, `adventure/${adventureId}/node/linkNodes`, idObjectWithParentInt)

    const adventure = await dispatch(updateAdventureById(adventureId))
    const updatedNode = getNodeFromCurrentAdventure(parentId, adventure)

    dispatch(setCurrentNode(updatedNode))
    dispatch(updateNodeSuccess())
  } catch (err) {
    dispatch(updateNodeError(err))
  }
}

export const updateNode = (nodeData) => async (dispatch, getState) => {
  try {
    const { nodeId } = nodeData
    const { authToken } = getState().auth
    const adventureId = getState().adventure.currentAdventure.id

    dispatch(updateNodeRequest())
    await fetchPut(authToken, `adventure/${adventureId}/node/${nodeId}`, nodeData)
    dispatch(toggleUpdateForm())

    const adventure = await dispatch(updateAdventureById(adventureId))
    const updatedNode = getNodeFromCurrentAdventure(nodeId, adventure)

    dispatch(setCurrentNode(updatedNode))
    dispatch(updateNodeSuccess())
  } catch (err) {
    dispatch(updateNodeError(err))
  }
}

export const removePointer = (nodeIdAndPointer) => async (dispatch, getState) => {
  try {
    const { authToken } = getState().auth
    const adventureId = getState().adventure.currentAdventure.id

    dispatch(updateNodeRequest())
    await fetchPatch(
      authToken,
      `adventure/${adventureId}/node/${nodeIdAndPointer.nodeId}`,
      nodeIdAndPointer
    )

    const adventure = await dispatch(updateAdventureById(adventureId))
    const updatedNode = getNodeFromCurrentAdventure(nodeIdAndPointer.nodeId, adventure)

    dispatch(setCurrentNode(updatedNode))

    return dispatch(updateNodeSuccess())
  } catch (err) {
    dispatch(updateNodeError(err))
  }
}

// helper fn to find node in adventure
function getNodeFromCurrentAdventure(nodeId, adventure) {
  let nodeToReturn = adventure.nodes.find((node) => node.id === nodeId)
  return nodeToReturn
}
