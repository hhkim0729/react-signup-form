import React, { useReducer, useCallback } from 'react';
import { TextInfos } from '../interface';
import { checkRegex } from '../utils';
import { isExist } from '../api/users';

type UseTextInputsResult = [
  TextInfos,
  ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
  ({ target }: React.ChangeEvent<HTMLInputElement>) => void
];

export function textInputsReducer(
  state: TextInfos,
  action: { type: string; payload: { key: string; value: string } }
) {
  const { key, value } = action.payload;
  switch (action.type) {
    case 'change': {
      const newInfo = {
        ...state[key],
        value: value,
      };
      if (key === 'phone') {
        newInfo.value = value.slice(0, 11);
      }
      if (key !== 'confirm') {
        newInfo.isValidated = checkRegex(key, value);
      }
      return { ...state, [key]: newInfo };
    }
    case 'checkExist': {
      const newInfo = { ...state[key] };
      if (['email', 'phone', 'username'].includes(key)) {
        newInfo.isNotDuplicated = !isExist(key, value);
      }
      if (key === 'referral') {
        newInfo.isValidated = isExist('username', value);
      }
      return { ...state, [key]: newInfo };
    }
    default:
      return state;
  }
}

export default function useTextInputs(
  initialTextInfos: TextInfos
): UseTextInputsResult {
  const [textInfos, setTextInfos] = useReducer(
    textInputsReducer,
    initialTextInfos
  );

  const onChangeTextInfos = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setTextInfos({
        type: 'change',
        payload: { key: target.id, value: target.value },
      });
    },
    []
  );

  const checkExist = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setTextInfos({
        type: 'checkExist',
        payload: { key: target.id, value: target.value },
      });
    },
    []
  );

  return [textInfos, onChangeTextInfos, checkExist];
}
