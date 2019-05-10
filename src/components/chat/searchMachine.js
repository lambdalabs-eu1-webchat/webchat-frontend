import matchSorter from 'match-sorter';

const searchMachine = (searchedList, userInput) => {
  /**
   * matchSorter takes in an array (`searchedList`) in which it performs the search
   * and filtering criteria (`userInput`) based on which it search through the list.
   * Passing an array in `keys` options tells match-sorter which keys to use for the ranking.
   * More info here: https://github.com/kentcdodds/match-sorter
   */
  let searchResults = matchSorter(searchedList, userInput, {
    keys: ['guest.name', 'room.name'],
  });

  return searchResults;
};

export default searchMachine;
