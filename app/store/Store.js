import { toJS, observable, computed, action, extendObservable, when, runInAction } from 'mobx'

/**
 * Entire data structure is still broken.
 * Rehaul entire system for how we handle matches, preferably with little
 * data mutation as possible.
 */


export class MainStore {
  @observable user = null
}
