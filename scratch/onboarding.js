
import React from 'react';

function Onboarding(props) {

  if (props === 'edit-adventure') {
    return (<section className="narrowOnboarding arrowBox_Top onboarding">
      <span>This page will help you create the start of your LearnVenture. Use the form above to add a
      <strong> Title</strong>, an<strong> Introduction</strong> setting the stage, an <em>optional</em>
        <strong> YouTube URL</strong> with relevant content (<em>Only YouTube links work. Videos hosted
          on other sites are not supported at this time</em>), and an <em>optional</em>
        <strong> Password</strong> for potential learners to access your LearnVenture. Click cancel to undo
        any changes and go back to your LearnVenture info.</span>
      <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
    </section>
    )
  }

  if (props === 'checkpoint') {
    return (<div className="wideOnboarding arrowBox_Top onboarding">
      <span>This form is for creating the information of the new checkpoint which will stem from the Choice you selected above.
        If you'd like you can connect the selected Choice to an existing checkpoint by clicking <strong>Use Existing Checkpoint</strong>.
        Make this a standard checkpoint with a<strong> Title</strong>, <strong> Scenario Description</strong>, <em>optional</em>
        <strong> YouTube URL</strong> (<em>Only YouTube links work. Videos hosted
            on other sites are not supported at this time</em>), a<strong> Question</strong>, and <strong>Choices</strong>. Or you can set it as an ending.
          Endings only have an <em>optional</em> <strong> YouTube URL</strong> and an<strong> Ending Description</strong>. If a learner
gets to an ending, their LearnVenture will be over and they will be prompted to start over if they'd like. Once create, you will
          see your new checkpoint in the graph above.</span>
      <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
    </div>)
  }

  if (props === 'new-adventure') {
    return (
      <section className="narrowOnboarding arrowBox_Top onboarding">
        <span>This page will help you create the start of your LearnVenture. Use the form above to add a
        <strong> Title</strong>, an<strong> Introduction</strong> setting the stage, an <em>optional</em>
          <strong> YouTube URL</strong> with relevant content (<em>Only YouTube links work. Videos hosted
            on other sites are not supported at this time</em>), and an <em>optional</em>
          <strong> Password</strong> for potential learners to access your LearnVenture. Next we'll build
          the first checkpoint where learners will have to make a decision on how they want to continue.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </section>
    );
  }

  if (props === 'adventure-info') {
    return (<div className="wideOnboarding arrowBox_Top onboarding">
      <span>This page contains the basic info for you LearnVenture. Use the <strong>Adventure Code</strong> to share this LearnVenture.
      Potential Learners can use it to find this LearnVenture in the Student Portal. You can use the buttons at the bottom of the info
        section to go to the <strong>LearnVenture Builder</strong> to begin or continue building the checkpoints and pathways,
        <strong>Edit LearnVenture Starting Info</strong> to change the information you see here, <strong>Delete LearnVenture</strong>
        to permanently delete this LearnVenture, or <strong>Show Analytics</strong> to view info about how learners have used this
        LearnVenture.</span>
      <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
    </div>
    )
  }

  if (props.text === 'dashboard') {
    return (
      <div className="wideOnboarding arrowBox_Top onboarding">
        <span>Welcome to LearnVenture! You can use the buttons in the navigation bar at the top of the page to <strong>Log Out</strong>,
           get back here (the <strong>Dashboard</strong>), Or go to the <strong>Home page</strong>,
     where you can switch between building and embarking on LearnVentures. If you'd like help learning how to use this site, click "Create LearnVenture" above. Or close me
          using the button below. You can turn help on and off on every page of the site to use when you need it!</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>

    )
  }

  if (props.text === 'update-form') {
    return (<div className="wideOnboarding arrowBox_Top onboarding">
      <span>This form is for changing the information of your current checkpoint. You can use it to change or add
      the <strong> Title</strong>, <strong> Scenario Description</strong>, <em>optional</em>
        <strong> YouTube URL</strong>,<strong> Question</strong>, and <strong>Choices</strong>. You can also change
        a checkpoint to and ending or delete it. Click cancel to undo any changes and go back to the LearnVenture builder.</span>
      <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
    </div>)
  }


  if (props.text === 'node-brancher') {
    return (<div className="wideOnboarding arrowBox_Top arrowBox_Bottom onboarding">
      <span>This is the LearnVenture Builder. It is used to add new pathways to your LearnVenture for each
        Choice of the current Checkpoint. You can click on any of the <strong>New Pathway</strong> buttons to
         open a from below which you will use to create a new checkpoint that stems from the choice you clicked on OR connect that choice
        to an existing checkpoint. If a choice already has a pathway, you will not be able to select <strong>New Pathway </strong>
        and the button will disappear. However, you can edit any checkpoint by setting it to the current Checkpoint. Lastly, if
        you delete the pathway that stems from any given choice, the option to connect it will appear once more.</span>
      <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
    </div>)
  }

  if (props.text === 'graph`') {
    return (<div className="wideOnboarding arrowBox_Top onboarding">
      <span>This is a graph of all the checkpoints and pathways of your LearnVenture. Clicking on a checkpoint
      will set it to the current Checkpoint for the tools below which you can use to build new pathways, connect
      checkpoints and expand your LearnVenture. You can also change the Current Checkpoint with the dropdown menu above.
      The Orange Triangle is the start of your LearnVenture and the Blue Squares are endpoints. Feel free to drag
          checkpoints around so you can better see how things connect.</span>
      <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
    </div>)
  }
  let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>This form is for changing the information of your current checkpoint. You can use it to change or add
        the <strong> Title</strong>, <strong> Scenario Description</strong>, <em>optional</em>
          <strong> YouTube URL</strong>,<strong> Question</strong>, and <strong>Choices</strong>. You can also change
          a checkpoint to and ending or delete it. Click cancel to undo any changes and go back to the LearnVenture builder.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }
}
export default Onboarding;