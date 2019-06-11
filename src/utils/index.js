
export function getAnswerTextFromParentInt(parentInt, currentNode) {
  let parentAnswer;
  if (parentInt === 1) {
    parentAnswer = currentNode.answerA
  }
  if (parentInt === 2) {
    parentAnswer = currentNode.answerB
  }
  if (parentInt === 3) {
    parentAnswer = currentNode.answerC
  }
  if (parentInt === 4) {
    parentAnswer = currentNode.answerD
  }
  return parentAnswer;
}