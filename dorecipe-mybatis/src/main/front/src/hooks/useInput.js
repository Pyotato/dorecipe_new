import { useState, useCallback } from "react";

export const useInput = (initialValue = null) => {
  const [value, setter] = useState(initialValue);
  /** input값의 state를 감지해서 해당되는 곳(e)에 값으로 
   이벤트 핸들링해주기 & 값변경 함수설정해주기 */

  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter];
};
