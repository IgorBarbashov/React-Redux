import React, { Fragment } from "react";

let lastCountInChild1;
let lastIncrementInChild1;
let lastBigCount;

const Child1 = React.memo(({ count, bigCount, increment, ...other }) => {
  console.log("enter to Child1");
  console.log("other", other);

  if (lastCountInChild1 !== count) {
    lastCountInChild1 = count;
    console.log("!!!!!!!!!!!!!!! new count in Child1", count);
  }

  if (lastIncrementInChild1 !== increment) {
    lastIncrementInChild1 = increment;
    console.log("!!!!!!!!!!!!!!! new increment in Child1");
  }

  if (lastBigCount !== bigCount) {
    lastBigCount = bigCount;
    console.log("!!!!!!!!!!!!!!! new bigCount in Child1", bigCount);
  }

  return (
    <Fragment>
      {console.log("render Child1")}
      <div onClick={increment}>{`${count} (bigCount: ${bigCount})`}</div>
    </Fragment>
  );
});

export { Child1 };
