import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateSearchTerms } from '../actions/index';

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  onSearchFieldClick = () => {
    this.inputRef.current.focus();
  };

  onChange = e => {
    this.props.updateSearchTerms(e.target.value);
  };

  render() {
    return (
      <div className="floq-search-field" onClick={this.onSearchFieldClick}>
        <i className="floq-search-field__icon material-icons dark-gray">search</i>
        <input
          ref={this.inputRef}
          type="text"
          className="floq-search-field__input"
          placeholder="Søk på navn, tittel, emoji"
          onChange={this.onChange}
          value={this.props.terms}
        />
      </div>
    );
  }
}

SearchField.propTypes = {
  terms: PropTypes.string.isRequired,
  updateSearchTerms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  terms: state.search.terms
});

const mapDispatchToProps = dispatch => ({
  updateSearchTerms: inputValue => {
    dispatch(updateSearchTerms(inputValue));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchField);
