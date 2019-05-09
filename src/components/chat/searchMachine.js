import matchSorter from 'match-sorter';

const searchMachine = (searchedList, userInput) => {
  /**
   * matchSorter takes in `list` in which it performs the search
   * and filtering criteria (`userInput`) based on which search through the list
   * Passing an array in `keys` options tells match-sorter which keys to use for the ranking
   * more here: https://github.com/kentcdodds/match-sorter
   */
  let searchResults = matchSorter(searchedList, userInput, {
    keys: ['guest.name', 'room.name'],
  });

  return searchResults;
};

export default searchMachine;
