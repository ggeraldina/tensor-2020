import React from 'react';
import { Transition } from 'react-transition-group';

interface FadeProps {
  stateIn?: boolean;
  children: JSX.Element;
  duration?: number;
  timeout?: {
    enter?: number;
    exit?: number;
  };
  unmountOnExit?: boolean;
  hideOnExit?: boolean;
}

const Fade: React.SFC<FadeProps> = ({
  stateIn,
  children,
  duration = 250,
  timeout = {
    enter: 0,
    exit: 250,
  },
  unmountOnExit = true,
  hideOnExit,
}: FadeProps): JSX.Element => {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    poinerEvents: 'none',
  };

  const transitionStyles: any = {
    entering: { opacity: 0, display: hideOnExit ? 'none' : 'block' },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transition: `opacity ${duration}ms ease-in-out ${timeout.exit}ms` },
    exited: { opacity: 0, transition: `opacity ${duration}ms ease-in-out ${timeout.exit}ms` },
  };

  return (
    <Transition in={stateIn} unmountOnExit={unmountOnExit} timeout={timeout}>
      {(state): JSX.Element => {
        return (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export default Fade;
