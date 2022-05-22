import {
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  Ref,
  useState,
} from "react";
import { usePopper } from "react-popper";
import { Transition } from "react-transition-group";

import { useDebounce, useHover } from "../../../hooks";

interface Props<T extends HTMLElement> {
  children: ReactElement<{ ref: Ref<T> }>;
  content?: ReactNode;
  shouldRender?: (referenceElement: T | null) => boolean;
  placement?: "top" | "bottom" | "right" | "left" | "auto";
}

const defaultShouldRender = () => true;
const Tooltip = <T extends HTMLElement>({
  children,
  content,
  shouldRender = defaultShouldRender,
  placement = "auto",
}: Props<T>) => {
  const [referenceElement, setReferenceElement] = useState<T | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const isReferenceHovered = useHover(referenceElement);
  const isPopperHovered = useHover(popperElement);
  const isHovered = useDebounce(isReferenceHovered || isPopperHovered, 250);

  const { styles, attributes, state } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowElement,
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top", "right"],
          },
        },
      ],
      placement,
    }
  );

  return (
    <Fragment>
      {cloneElement(children, { ref: setReferenceElement })}

      {shouldRender(referenceElement) && (
        <Transition in={isHovered} timeout={200} unmountOnExit>
          {(transitionState) => (
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <div
                tw="bg-white p-2 rounded"
                style={{
                  transition: "all 200ms ease-in-out",
                  transform:
                    transitionState === "entered" ||
                    transitionState === "entering"
                      ? "scale(1)"
                      : "scale(0)",
                  ...(state?.placement === "top" ? { transformOrigin: 'bottom center' } : {}),
                  ...(state?.placement === "bottom" ? { transformOrigin: 'top center' } : {}),
                  ...(state?.placement === "right" ? { transformOrigin: 'left center' } : {}),
                  ...(state?.placement === "left" ? { transformOrigin: 'right center' } : {}),
                }}
              >
                {content}
                <div
                  ref={setArrowElement}
                  style={{
                    ...styles.arrow,
                    transform: `${styles.arrow.transform} rotate(45deg)`,
                    ...(state?.placement === "top" ? { bottom: -2.5 } : {}),
                    ...(state?.placement === "bottom" ? { top: -2.5 } : {}),
                    ...(state?.placement === "right" ? { left: -2.5 } : {}),
                    ...(state?.placement === "left" ? { right: -2.5 } : {}),
                  }}
                  tw="bg-white w-2 h-2"
                />
              </div>
            </div>
          )}
        </Transition>
      )}
    </Fragment>
  );
};

export default Tooltip;
