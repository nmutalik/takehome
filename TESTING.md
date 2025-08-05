# Testing Strategy

_This documentation was artisinally hand-crafted and made without the use of any AI_

## Unit Tests

The most complicated bit of code is the store, and that would require a unit test for each state-updating function, specifically `setHistoryIndex` and `onPieceDrop`. These could be done with any testing framework, since Zustand isn't dependent on React. I would likely use Jest.

**`setHistoryIndex`**

I would write the following tests

- A test to show that when a valid history index is provided, the state is updated
- A test to show that when an invalid history index is provided, the state is not updated

**`onPieceDrop`**

Similarly, I would write the following

- A test to show that when a valid move is made, the state is updated accurately
- A test to show that when an invalid move is made, the state is not updated

Checking the state would involve more than just checking the chessboard, since this function also updates the history. This would mean:

- When a move is made from the latest board state, ensure the history is properly appended to.
- If a previous board state is selected and moved from, ensure that the former timeline is destroyed and the new one is accurately created.
- If an invalid move is made, ensure that history is not changed

Tests for the `leaderboard` query and `setLeaderboardCategory` functions are either trivial or redundant, and left as an exercise to the reader.

## End-to-End Tests

I'd further harden the testing strategy by adding end-to-end tests. These would automate a series of user flows and enforce stability with snapshots. I would likely use Cypress, and subdivide the tests by view

**Chess View**

Some user flows for the chess view would include:

- Playing out a scholar's mate and ensuring the game is over and the board cannot be changed afterwards
- Attempting a series of illegal moves and ensuring the view does not change
- Clicking through the history of a game and making sure the view updates as expected
- Making moves from a previous history and ensuring that both the board and the history update predictably.

This doesn't necessarily require mocked data, but it could provide speed and consistency

**Leaderboard View**

Flows here would be simple, since there are limited interactions on this view. Namely:

- Ensuring that the data provided renders accurately
- Ensuring that clicking different categories accurately renders the different data

This data would be mocked, both for speed and to allow offline testing.
