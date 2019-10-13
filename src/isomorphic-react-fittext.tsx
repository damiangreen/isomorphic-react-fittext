import { Children, cloneElement, useEffect, ReactNode } from "react";

const nodes = new Map<HTMLElement, ReactFitTextProps>();

let updateQueued = false;

function updateFontSize() {
  updateQueued = true;
  Array.from(nodes, ([element, options]) => ({
    element,
    options
  })).forEach(x => {
    const minimumDimension = Math.min(
      x.element.offsetWidth,
      x.element.offsetHeight
    );
    x.element.style.fontSize = `${Math.min(
      Math.max(
        minimumDimension / (x.options.compressor * 10),
        x.options.minFontSize
      ),
      x.options.maxFontSize
    )}px`;
  });
}

interface ReactFitTextProps {
  children: ReactNode;
  compressor: number;
  minFontSize: number;
  maxFontSize: number;
}

const ReactFitText = (props: ReactFitTextProps) => {
  let childRef: HTMLElement | undefined = undefined;

  useEffect(() => {
    window.addEventListener("resize", updateFontSize);
    window.addEventListener("load", updateFontSize);
    return () => {
      if (childRef) {
        nodes.delete(childRef);
      }
      window.removeEventListener("resize", updateFontSize);
      window.removeEventListener("load", updateFontSize);
    };
  }, [window]);

  useEffect(() => {
    if (!updateQueued && typeof window !== "undefined") {
      window.requestAnimationFrame(updateFontSize);
    }
  }, [updateQueued, window]);

  updateFontSize();

  return Children.map(props.children, (child: any) =>
    cloneElement(child, {
      ref: (element: HTMLElement) => {
        if (element) {
          nodes.set(element, props);
        }
        childRef = element;
      }
    })
  )[0];
};

ReactFitText.defaultProps = {
  compressor: 1.0,
  minFontSize: Number.NEGATIVE_INFINITY,
  maxFontSize: Number.POSITIVE_INFINITY
};
export default ReactFitText;
