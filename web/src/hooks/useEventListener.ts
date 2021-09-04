import { RefObject, useEffect } from 'react';

export const useEventListener = <K extends keyof GlobalEventHandlersEventMap>(
  ref: RefObject<HTMLElement | null>,
  event: K,
  listener: (e: GlobalEventHandlersEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const listenerWrapper = ((e: GlobalEventHandlersEventMap[K]) =>
      listener(e)) as EventListener;

    node.addEventListener(event, listenerWrapper, options);

    return () => node.removeEventListener(event, listenerWrapper);
  }, [ref, event, listener, options]);
};
