import React from 'react';

export class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      value: ''
    };
  }
  onSearchFieldClick = () => {
    this.inputRef.current.focus();
  };
  onChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <div className='floq-search-field' onClick={this.onSearchFieldClick}>
        <i className='floq-search-field__icon material-icons dark-gray'>{'search'}</i>
        <input
          ref={this.inputRef}
          type='text'
          className='floq-search-field__input'
          placeholder='Søk på navn, tittel, emoji'
          onChange={this.onChange}
          value={this.state.value}
        />
      </div>
    );
  }
}
