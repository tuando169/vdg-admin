export const ADMIN = {
  username: 'admin',
  password: 'admin',
}

export const has_permission = localStorage.getItem('token') == 'admin'
export const eventConsts = {
  reload: 'reload'
}

export const API_HEADER = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

