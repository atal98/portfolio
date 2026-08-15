import { assign, createMachine } from 'xstate'

export const initialContext = {
  currentChapter: null,
  previousChapter: null,
  visitedChapters: [],
  reducedMotion: false,
  audioEnabled: false,
  performanceTier: 'MEDIUM',
  transitionLocked: false,
}

export const experienceMachine = createMachine({
  id: 'portfolioExperience',
  initial: 'LOADING',
  context: initialContext,
  on: {
    SET_PREFERENCES: { actions: assign(({ event }) => event.preferences) },
  },
  states: {
    LOADING: { on: { LOADED: 'OUTSIDE_GATE', QUICK_EXPLORE: 'QUICK_EXPLORE' } },
    OUTSIDE_GATE: { on: { BELL_READY: 'BELL_READY', QUICK_EXPLORE: 'QUICK_EXPLORE' } },
    BELL_READY: { on: { RING_BELL: { target: 'BELL_RINGING', actions: assign({ transitionLocked: true }) }, QUICK_EXPLORE: 'QUICK_EXPLORE' } },
    BELL_RINGING: { on: { BELL_COMPLETE: 'GATE_OPENING', SKIP_TRANSITION: 'CORRIDOR' } },
    GATE_OPENING: { on: { GATE_COMPLETE: 'ENTERING_GATE', SKIP_TRANSITION: 'CORRIDOR' } },
    ENTERING_GATE: { on: { ENTER_COMPLETE: 'CORRIDOR', SKIP_TRANSITION: 'CORRIDOR' } },
    CORRIDOR: {
      entry: assign({ transitionLocked: false }),
      on: {
        SELECT_DOOR: { target: 'DOOR_APPROACHING', actions: assign({ currentChapter: ({ event }) => event.chapterId, transitionLocked: true }) },
        QUICK_EXPLORE: 'QUICK_EXPLORE',
      },
    },
    DOOR_APPROACHING: { on: { DOOR_APPROACH_COMPLETE: 'DOOR_OPENING', SKIP_TRANSITION: 'INSIDE_ROOM' } },
    DOOR_OPENING: { on: { DOOR_COMPLETE: 'INSIDE_ROOM', SKIP_TRANSITION: 'INSIDE_ROOM' } },
    INSIDE_ROOM: {
      entry: assign(({ context }) => ({
        visitedChapters: context.currentChapter && !context.visitedChapters.includes(context.currentChapter)
          ? [...context.visitedChapters, context.currentChapter]
          : context.visitedChapters,
        transitionLocked: false,
      })),
      on: { EXIT_ROOM: { target: 'LEAVING_ROOM', actions: assign({ transitionLocked: true }) }, QUICK_EXPLORE: 'QUICK_EXPLORE' },
    },
    LEAVING_ROOM: { on: { LEAVE_COMPLETE: 'RETURNING_TO_CORRIDOR', SKIP_TRANSITION: 'CORRIDOR' } },
    RETURNING_TO_CORRIDOR: { on: { RETURN_COMPLETE: 'CORRIDOR', SKIP_TRANSITION: 'CORRIDOR' } },
    QUICK_EXPLORE: {
      entry: assign({ transitionLocked: false }),
      on: {
        SELECT_CHAPTER: { target: 'DOOR_OPENING', actions: assign({ currentChapter: ({ event }) => event.chapterId }) },
        CLOSE_QUICK_EXPLORE: 'CORRIDOR',
      },
    },
  },
})
