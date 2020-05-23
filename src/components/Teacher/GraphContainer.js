import React from 'react'
import { connect } from 'react-redux'
import { Graph } from 'react-d3-graph'

import { setCurrentNode } from '../../actions/node'
import { toggleOnboarding } from '../../actions/auth'

export class GraphContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }
  }
  onClickNode(nodeId) {
    let nodeArr = this.props.nodez.filter((node) => node.id === nodeId)
    this.props.dispatch(setCurrentNode(nodeArr[0]))
    // this.props.dispatch(reRenderGraph())
  }

  getFullNode(nodeId) {
    //get full node is outside of the class due to *this* being binded to the graph
    const nodeArr = this.props.nodez.filter((node) => node.id === nodeId)
    return nodeArr[0]
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  populateGraph() {
    let chartData = {
      nodes: [],
      links: [],
    }
    for (let i = 0; i < this.props.nodez.length; i++) {
      if (i === 0) {
        chartData.nodes.push({
          id: this.props.nodez[i].id,
          title: this.props.nodez[i].title
            ? this.props.nodez[i].title
            : this.props.nodez[i].question,
          color: '#FF00FF',
          symbolType: 'triangle',
        })
        if (this.props.nodez[i].pointerA) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerA,
          })
        }
        if (this.props.nodez[i].pointerB) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerB,
          })
        }
        if (this.props.nodez[i].pointerC) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerC,
          })
        }
        if (this.props.nodez[i].pointerD) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerD,
          })
        }
      } else {
        chartData.nodes.push({
          id: this.props.nodez[i].id,
          title: this.props.nodez[i].title
            ? this.props.nodez[i].title
            : this.props.nodez[i].question,
          color: this.props.nodez[i].ending ? '#474554' : '#ACA7CB',
          symbolType: this.props.nodez[i].ending ? 'square' : 'circle',
        })
        if (this.props.nodez[i].pointerA) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerA,
          })
        }
        if (this.props.nodez[i].pointerB) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerB,
          })
        }
        if (this.props.nodez[i].pointerC) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerC,
          })
        }
        if (this.props.nodez[i].pointerD) {
          chartData.links.push({
            source: this.props.nodez[i].id,
            target: this.props.nodez[i].pointerD,
          })
        }
      }
    }
    chartData.nodes[0].x = this.state.windowWidth / 2.55
    chartData.nodes[0].y = this.state.windowHeight / 3
    return chartData
  }

  resizeGraph() {
    let cyStyle = {
      margin: 'auto',
      border: '2.5px solid grey',
    }
    cyStyle.maxHeight = Math.max(this.state.windowHeight * 0.9, 1000)
    cyStyle.maxWidth = Math.max(this.state.windowWidth * 0.8, 300)
    return cyStyle
  }

  //if you change this from an arrow function, this.setState fails
  handleResize = () => {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    this.setState({
      windowHeight,
      windowWidth,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.populateGraph()
    this.resizeGraph()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const myConfig = {
      nodeHighlightBehavior: true,
      directed: true,
      automaticRearrangeAfterDropNode: true,
      d3: {
        gravity: -300,
        linkLength: 120,
        forceManyBody: function strength() {
          return -1000
        },
      },
      minZoom: 0.5,
      maxZoom: 1.5,
      height: Math.max(this.state.windowHeight * 0.5, 500),
      width: Math.max(this.state.windowWidth * 0.8, 300),
      //There are height and widths available here, but they're for the graph itself, not the container of the graph
      node: {
        fontSize: 18,
        color: 'lightgreen',
        size: 400,
        highlightStrokeColor: 'blue',
        labelProperty: 'title',
        highlightFontSize: 'same',
      },
      link: {
        highlightColor: 'lightblue',
        strokeWidth: 4,
      },
    }
    if (!this.props.nodez) {
      return <div>Loading....</div>
    } else {
      if (this.props.reRender) {
        return (
          <div className="inner-graph-container" style={this.resizeGraph()}>
            {' '}
            {/*Make the cyStyle into a method like populateGraph for CSS RESPONSIVENESS*/}
            <Graph
              props={this.props}
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={this.populateGraph()}
              config={myConfig}
              onClickNode={this.onClickNode}
              // onRightClickNode={onRightClickNode}
              // onClickGraph={onClickGraph}
              // onClickLink={onClickLink}
              // onRightClickLink={onRightClickLink}
              // onMouseOverNode={onMouseOverNode}
              // onMouseOutNode={onMouseOutNode}
              // onMouseOverLink={onMouseOverLink}
              // onMouseOutLink={onMouseOutLink}
            />
          </div>
        )
      } else {
        return (
          <div className="inner-graph-container" style={this.resizeGraph()}>
            <Graph
              props={this.props}
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={this.populateGraph()}
              config={myConfig}
              onClickNode={this.onClickNode}
              // onRightClickNode={onRightClickNode}
              // onClickGraph={onClickGraph}
              // onClickLink={onClickLink}
              // onRightClickLink={onRightClickLink}
              // onMouseOverNode={onMouseOverNode}
              // onMouseOutNode={onMouseOutNode}
              // onMouseOverLink={onMouseOverLink}
              // onMouseOutLink={onMouseOutLink}
            />
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state) => ({
  nodez: state.adventure.currentAdventure.nodes,
  showUpdate: state.node.showUpdate,
  currentNode: state.node.currentNode,
  reRender: state.adventure.reRender,
  onboarding: state.auth.onboarding,
})

// connect(mapStateToProps)(Graph)
export default connect(mapStateToProps)(GraphContainer)
