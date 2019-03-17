import React, { Component } from 'react';
import { FaSistrix } from 'react-icons/fa';
import { connect } from 'react-redux';
import { searchChange } from '../../../actions';
import history from '../../../history';

const mapStateToProps = state => ({ searchText: state.searchText.chars });

export default connect(
  mapStateToProps,
  { searchChange }
)(
  class SearchBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchDelayed: false,
      };

      this._searchRef = React.createRef();
    }

    componentDidMount() {
      this._searchRef.current.focus();
      this._searchRef.current.select();
    }

    onTextChange = event => {
      const ele = event.target;
      this.props.searchChange(event.target.value);

      if (ele.value && !this.state.searchDelayed) {
        this.setState({
          searchDelayed: true,
        });
        setTimeout(() => {
          this.props.updateSearchResults(this.props.searchText);
          this.setState({
            searchDelayed: false,
          });
        }, 500);
      }
    };

    render() {
      return (
        <label onClick={() => history.push('/search')} className="searchBar">
          <input
            ref={this._searchRef}
            type="text"
            placeholder="Search..."
            onChange={this.onTextChange}
            value={this.props.searchText}
          />
          <FaSistrix
            style={{
              color: '#fff',
              width: '25px',
              height: '25px',
              right: '15px',
              top: 'calc(50% - 12.5px)',
              position: 'absolute',
            }}
          />
        </label>
      );
    }
  }
);
