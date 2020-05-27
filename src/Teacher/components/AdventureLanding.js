import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import DeletePrompt from './DeletePrompt'
import { RequiresLogin } from '../../Auth'
import AdventureDetails from './AdventureDetails'
import AdventureBuilder from './adventureBuilder'
import { EditAdventureForm } from './forms'
import {
  deleteAdventure,
  getAdventureById,
} from '../adventureActions'

export class AdventureInfo extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(getAdventureById(id))
  }

  async onClickDelete(adId) {
    const { dispatch, history } = this.props

    await dispatch(deleteAdventure(adId))
    history.push('/dashboard')
  }

  render() {
    const { path, url } = this.props.match
    const { history, adventure } = this.props

    return (
      adventure && (
        <Switch>
          <Route exact path={path}>
            <AdventureDetails adventure={adventure} />
          </Route>

          <Route exact path={`${path}/delete`}>
            <DeletePrompt
              handleCancel={() => history.push(url)}
              handleDelete={() => this.onClickDelete(adventure.id)}
            >
              <h2>Are you sure you want to permanently delete Adventure {adventure.title}</h2>
              <h3>This cannot be undone</h3>
            </DeletePrompt>
          </Route>
          <Route exact path={`${path}/edit`} component={EditAdventureForm} />
          <Route exact path={`${path}/build`} component={AdventureBuilder} />
          <Redirect to='/404' />
        </Switch>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  adventure: state.adventure.currentAdventure,
  error: state.adventure.error
})

export default withRouter(
  RequiresLogin()(
    connect(mapStateToProps)(AdventureInfo)
  )
)
