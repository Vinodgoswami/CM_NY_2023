/*
Add button Type and name in BUTTON_TYPE and BUTTON_NAME respectively
Add case in ButtonTags.ts
Apply ButttonTags.ts script to button and select button Type.

Add click event to button.
 */

export enum BUTTON_TYPE {
  NONE = 0,
  DEC_VALUE,
  INC_VALUE,
  SHOW_POPUP,
  SHOW_CIRCULAR_LOADER,
  SHOW_TIMER,
  SHOW_REGISTER_PANEl,
  SHOW_LEADER_BOARD,
  SHOW_SCORE_BOARD,
}

export const MUSIC_TYPE = {
  PAYLINE: 1,
  SLOT_CHIP_STACK: 2,
  SLOT_BACKGROUND: 3,
  SLOT_MACHINE: 4,
  WOF_BACKGROUND: 5,
  WOF_GLOWING: 6,
  WOF_ROLLING: 7,
  WOF_BETTER_LUCK: 8,
  POKER_BACKGROUND: 9,
  ROULETTE_BACKGROUND: 10,
  ROULETTE_WHEEL: 11,
  ROULETTE_BALL_STOP: 12,
  ROULETTE_CHIP_STACK: 13,
  CURRENCY_COUNT: 14,
  BUTTON_CLICK: 15,
  TIME_TICK: 16,
  DEFAULT_WIN: 17,
};

export enum UPDATION {
  INCREMENT = 0,
  DECREMENT = 1,
  INITIALIZE,
}

export const LOG_VISIBILITY = {
  NETWORK: true,
  CEHCK: false,
  INFO: true,
  MISCELLANEOUS: false,
  BLOCKCHAIN: false,
  DEBUGDRAW: false,
};

export const SOCKET_EVENT_KEYS = {
  GAME_DATA: "gameData",
  USER_STATUS: "userStatus",
  MATCH_MAKING: "startMatchMakingPoker",
  GAME_CLOSED: "gameClosedPoker",
  PLAYERS_CONNECTED: "playersConnectedPoker",
  USER_CARDS: "userCardsPoker",
  DISRIBUTE_CARDS: "distributeCardsPoker",
  PLAYER_LEFT: "playerLeftPoker",
  PLAYED_TURN: "playedTurnPoker",
  PLAYER_TURN: "playerTurnPoker",
  KICKOUT: "kickoutPoker",
  CURRENT_ROUND: "currentRoundPoker",
  GAME_WINNERS: "gameWinnersPoker",
  LEAVE_MATCH: "leaveMatchPoker",
  SOCKET_ERROR: "SockerErrorPoker",
  START_MATCH_MAKING: "startMatchMakingPoker",
  LOOSE_GAME: "looseGamePoker",
  PLAY_TURN: "playTurnPoker",
  RECONNECT_GAME: "reconnectGamePoker",
  SITTING_ARRANGEMENT: "sittingArrangementPoker",
  TOURNAMENT_COMPLETED: "tournamentCompletedPoker",
  IS_NEXT_ROUND_POSSIBLE: "isNextRoundPossiblePoker",
  GAME_COMPLETED: "gameCompletedPoker",
  GAME_JOINED: "gameJoinedPoker",
  RECONNETED: "reconnected",
  TRADE_IN: "tradeInPoker",
  TRADE_IN_USER_CARDS: "tradeInUserCardsPoker",
};

export const SOCKET_EVENTS = {
  Connect: "connect",
  Reconnect: "reconnect",
  Reconnecting: "reconnecting",
  Disconnect: "disconnect",
  Error: "error",
  Message: "message",
  EventTest: "Test",
  GameData: "GameData",
};

export const STRING = {
  WAITING: "Wainting for players to connect",
};

export enum TIMER_TYPE {
  NONE = 0,
  WAITING_TO_JOIN = 1,
  WAITING_FOR_TURN = 2,
}

export enum PLAYER_ACTION {
  SMALL_BLIND = 0,
  BIG_BLIND = 1,
  CHECK = 2,
  RAISE = 3,
  CALL = 4,
  FOLD = 6,
  TIMEOUT = 7,
  ALL_IN = 8,
  BET = 9, //for frontend purpose only
}

export const MAXIMUM_USER = 9;
export const CARD_DISTRIBUTION_TIME = 1; //seconds
export const PLAYER_CARD_DISTRIBUTION_TIME = 0.3; //seconds
export const CARD_ANIMATION_TIME = 0.3; //seconds
export const TOAST_HOLD_TIME = 1.5; //seconds
export const RUNNING_MSG_DELAY = 100; // milliseconds

export const CALL_BACK_EVENTS = {
  GUEST_POPUP_CLOSE_EVENT: "GUEST_POPUP_CLOSE_EVENT",
  GUEST_MEMBER_CLICKED: "GUEST_MEMBER_CLICKED",
  SCORE_BUTTON_CLICKED: "SCORE_BUTTON_CLICKED",
};
