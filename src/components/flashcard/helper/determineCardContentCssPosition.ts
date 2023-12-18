const determineCardContentCssPosition = (
  textLength: number,
  otherTextLength: number
) => {
  return `${
    textLength > otherTextLength ? "relative" : "absolute"
  } [backface-visibility:hidden]`;
};

export default determineCardContentCssPosition;
