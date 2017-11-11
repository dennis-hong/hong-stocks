export const GLOBAL_ERROR = 'GLOBAL_ERROR'
export const LOCAL_ERROR = 'LOCAL_ERROR'

export const INVALID_JSON_ERROR = {
  error: 'INVALID_JSON_ERROR',
  status: 400,
  message: ''
}

export const UNEXPECTED_RESPONSE_ERROR = {
  error:'UNEXPECTED_RESPONSE_ERROR',
  status: 500,
  message: ''
}

export const FETCH_REQUEST_ERROR = {
  error:'FETCH_REQUEST_ERROR',
  status: 444,
  message: '서버 연결에 실패하였습니다.'
}

export const FETCH_REQUEST_TIMED_OUT = {
//  error:'FETCH_REQUEST_TIMED_OUT',
  error: undefined,
  status: 599,
  message: '서버 응답 시간을 초과하였습니다.'
}

