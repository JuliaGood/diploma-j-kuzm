const WS_URL = 'ws://localhost:8080';
const BASE_URL = 'http://localhost:8080/api';
const SCHEDULES_URL = `${BASE_URL}/schedules`;
const HISTORY_URL = `${BASE_URL}/history`;
const ROOMS_URL = `${BASE_URL}/rooms`;

const ApiUrls = {
  WS_URL: WS_URL,
  GET_SCHEDULES: {
    method: 'GET',
    url: SCHEDULES_URL,
  },
  GET_SCHEDULE: {
    method: 'GET',
    url: (scheduleId) => `${SCHEDULES_URL}/${scheduleId}`,
  },
  ADD_SCHEDULE: {
    method: 'POST',
    url: SCHEDULES_URL,
  },
  EDIT_SCHEDULE: {
    method: 'PUT',
    url: (scheduleId) => `${SCHEDULES_URL}/${scheduleId}`,
  },
  REMOVE_SCHEDULE: {
    method: 'DELETE',
    url: (scheduleId) => `${SCHEDULES_URL}/${scheduleId}`,
  },
  GET_HISTORY: {
    method: 'POST',
    url: HISTORY_URL,
  },
  GET_HISTORY_FILTERS: {
    method: 'GET',
    url: `${HISTORY_URL}/filters`,
  },
  GET_HOME_ROOMS: {
    method: 'GET',
    url: '/placeholders/home-rooms-data.json'
  },
  GET_ROOMS: {
    method: 'GET',
    url: ROOMS_URL,
  },
}

export default ApiUrls;