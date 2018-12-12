import React, { Component } from "react";
import PlacesAutocomplete from "./LocationSearchInput";
import { classnames } from './helpers';
    
import './style/SearchBar.scss';
import './style/FontColors.scss';

class SearchBar extends Component{

  render(){
    return(
      <section className="SearchBar">
      <form onSubmit={event=>this.props.handleSubmit(event)}>
      <PlacesAutocomplete
          onChange={this.props.onChange}
          value={this.props.value}
          shouldFetchSuggestions={this.props.value.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',
                    })}
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>  
        <div className="search-btn">
            <button className="search-button">Search</button>
          </div>
        </form>
      </section>
    )
    
  }

}

export default SearchBar;