import React, { Fragment } from "react";

let lastValueInChild2;
let lastGenerateNewValueInChild2;
let lastBigValue;

const Child2 = React.memo(({ value, generateNewValue, bigValue, ...other }) => {
  console.log("enter to Child2");
  console.log("other", other);

  if (lastValueInChild2 !== value) {
    lastValueInChild2 = value;
    console.log("!!!!!!!!!!!!!!! new value in Child2", value);
  }

  if (lastGenerateNewValueInChild2 !== generateNewValue) {
    lastGenerateNewValueInChild2 = generateNewValue;
    console.log("!!!!!!!!!!!!!!! new generateNewValue in Child2");
  }

  if (lastBigValue !== bigValue) {
    lastBigValue = bigValue;
    console.log("!!!!!!!!!!!!!!! new bigValue in Child2", bigValue);
  }

  return (
    <Fragment>
      <div onClick={generateNewValue}>
        {console.log("render Child2")}
        {`${value} (bigValue: ${bigValue})`}
      </div>
    </Fragment>
  );
});

export { Child2 };
