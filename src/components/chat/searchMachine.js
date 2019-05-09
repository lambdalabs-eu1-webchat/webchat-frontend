import matchSorter from 'match-sorter';

const searchMachine = (searchedList, userInput) => {
  let searchResults = matchSorter(searchedList, userInput, {
    keys: ['guest.name', 'room.name'],
  });

  return searchResults;
};

export default searchMachine;
