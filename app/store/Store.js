import { toJS, observable, computed, action, extendObservable, when, runInAction } from 'mobx'

/**
 * Entire data structure is still broken.
 * Rehaul entire system for how we handle matches, preferably with little
 * data mutation as possible.
 */
const initialState = {
  anger: 0,
  contempt: 0,
  disgust: 0,
  fear: 0,
  happiness: 0,
  neutral: 0,
  sadness: 0,
  surprise: 0
}

const round = (value) => value.toFixed(3)

export class MainStore {
  @observable emotions = [initialState]

  @computed get happiness() {
    return round(this.emotions.slice(-1)[0]['happiness'])
  }

  @computed get neutral() {
    return round(this.emotions.slice(-1)[0]['neutral'])
  }

  @computed get fear() {
    return round(this.emotions.slice(-1)[0]['fear'])
  }

  @computed get surprise() {
    return round(this.emotions.slice(-1)[0]['surprise'])
  }

  @computed get anger() {
    return round(this.emotions.slice(-1)[0]['anger'])
  }

  @computed get disgust() {
    return round(this.emotions.slice(-1)[0]['fear'])
  }
  
}
