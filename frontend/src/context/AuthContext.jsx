import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

// possible actions for our auth state
const AUTH_ACTIONS = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING'
};

// reducer to manage auth state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        loading: false
      };
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// initial state - check localStorage for existing session
const getInitialState = () => {
  const token = localStorage.getItem('ci_token');
  const user = localStorage.getItem('ci_user');
  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    loading: !!token // if there's a token, we need to verify it
  };
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  // on mount, verify the stored token is still valid
  useEffect(() => {
    const verifyToken = async () => {
      if (!state.token) return;

      try {
        const res = await api.get('/user/profile');
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: { user: res.data.user, token: state.token }
        });
      } catch (err) {
        // token is bad or expired, clear everything
        localStorage.removeItem('ci_token');
        localStorage.removeItem('ci_user');
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };

    verifyToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // register a new user
  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user } = res.data;

    localStorage.setItem('ci_token', token);
    localStorage.setItem('ci_user', JSON.stringify(user));

    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: { user, token } });
    return res.data;
  };

  // log in existing user
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;

    localStorage.setItem('ci_token', token);
    localStorage.setItem('ci_user', JSON.stringify(user));

    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: { user, token } });
    return res.data;
  };

  // log out - clear everything
  const logout = () => {
    localStorage.removeItem('ci_token');
    localStorage.removeItem('ci_user');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // update local user data (e.g. after profile edit)
  const updateUser = (userData) => {
    localStorage.setItem('ci_user', JSON.stringify(userData));
    dispatch({
      type: AUTH_ACTIONS.SET_USER,
      payload: { user: userData, token: state.token }
    });
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      loading: state.loading,
      register,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
