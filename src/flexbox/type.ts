export type FlexboxContext = {
  gutter?: number;
};

/*
// The direction text is laid out in a line
flex-direction: row;

// Like <row>, but reversed
flex-direction: row-reverse;

// The direction in which lines of text are stacked
flex-direction: column;

// Like <column>, but reversed
flex-direction: column-reverse;

// Global values
flex-direction: inherit;
flex-direction: initial;
flex-direction: revert;
flex-direction: unset;
*/
export type Direction =
  | 'initial'
  | 'inherit'
  | 'revert'
  | 'unset'
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';

/*
// Basic keywords
align-items: normal;
align-items: stretch;

// Positional alignment
// align-items does not take left and right values
align-items: center; // Pack items around the center
align-items: start; // Pack items from the start
align-items: end; // Pack items from the end
align-items: flex-start; // Pack flex items from the start
align-items: flex-end; // Pack flex items from the end

// Baseline alignment
align-items: baseline;
align-items: first baseline;
align-items: last baseline; // Overflow alignment (for positional alignment only)
align-items: safe center;
align-items: unsafe center;

// Global values
align-items: inherit;
align-items: initial;
align-items: revert;
align-items: unset;
*/
export type Align =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset';

/*
// Positional alignment 
justify-content: center;     // Pack items around the center 
justify-content: start;      // Pack items from the start 
justify-content: end;        // Pack items from the end 
justify-content: flex-start; // Pack flex items from the start 
justify-content: flex-end;   // Pack flex items from the end 
justify-content: left;       // Pack items from the left 
justify-content: right;      // Pack items from the right 

// Baseline alignment 
// justify-content does not take baseline values 

// Normal alignment 
justify-content: normal;

// Distributed alignment 
justify-content: space-between; // Distribute items evenly
                                   The first item is flush with the start,
                                   the last is flush with the end 
justify-content: space-around;  // Distribute items evenly
                                   Items have a half-size space
                                   on either end 
justify-content: space-evenly;  // Distribute items evenly
                                   Items have equal space around them 
justify-content: stretch;       // Distribute items evenly
                                   Stretch 'auto'-sized items to fit
                                   the container 

// Overflow alignment 
justify-content: safe center;
justify-content: unsafe center;

// Global values 
justify-content: inherit;
justify-content: initial;
justify-content: revert;
justify-content: unset;
*/
export type Justify =
  | 'initial'
  | 'inherit'
  | 'unset'
  | 'revert'
  | 'normal'
  | 'left'
  | 'right'
  | 'start'
  | 'end'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | 'stretch';

/*
flex-wrap: nowrap;  Default value
flex-wrap: wrap;
flex-wrap: wrap-reverse;

// Global values
flex-wrap: inherit;
flex-wrap: initial;
flex-wrap: revert;
flex-wrap: unset;
*/

export type Wrap =
  | 'nowrap'
  | 'wrap'
  | 'wrap-reverse'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset';
