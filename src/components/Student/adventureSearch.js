import React from 'react';
import { connect } from 'react-redux';
import { getStudentSearch } from '../../actions/student';


let inputVal;
export class AdventureSearch extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = inputVal;
    this.props.dispatch(getStudentSearch(searchTerm));
  }

  onChange(e) {
    inputVal = e.target.value;
  }

  render() {
    return (
      <div role="search"

        className="">
          <h3 className="student-landing">Otherwise: search by keyword, Or browse the library Below</h3>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label className='above below' htmlFor='input-field'>Search By Keyword</label>
          <input
            className="search-input"
            placeholder="Example: Making Breakfast"
            onChange={e => this.onChange(e)} type="text"></input>
          <button
            className="search-adventures"
            type="submit">Search Adventures</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default (connect(mapStateToProps)(AdventureSearch));
