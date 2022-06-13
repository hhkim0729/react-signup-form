import { useReducer, useCallback } from 'react';
import { CheckInfos } from '../interface';

type UseCheckInputsResult = [
  CheckInfos,
  ({ target }: React.ChangeEvent<HTMLInputElement>) => void
];

export function checkInputsReducer(
  state: CheckInfos,
  action: { type: string; payload: { key: string; value: boolean } }
) {
  const { key, value } = action.payload;
  switch (action.type) {
    case 'change':
      const newInfos = {
        ...state,
        [key]: value,
      };
      if (key === 'all') {
        newInfos.terms = value;
        newInfos.privacy = value;
        newInfos.marketing = value;
      }
      if (newInfos.terms && newInfos.privacy && newInfos.marketing) {
        newInfos.all = value;
      } else if (!value) {
        newInfos.all = value;
      }
      return newInfos;
    default:
      return state;
  }
}

export default function useCheckInputs(
  initialCheckInfos: CheckInfos
): UseCheckInputsResult {
  const [checkInfos, setCheckInfos] = useReducer(
    checkInputsReducer,
    initialCheckInfos
  );

  const onChangeCheckInfos = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setCheckInfos({
        type: 'change',
        payload: { key: target.id, value: target.checked },
      });
    },
    []
  );

  return [checkInfos, onChangeCheckInfos];
}
