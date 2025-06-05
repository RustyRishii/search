import * as React from "react";
import Svg, { Path } from "react-native-svg";

function HomeIcon(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={25}
      height={25}
      viewBox="0 0 40 40"
      {...props}
    >
      <Path fill="#dbf2ff" d="M3.5 38.5V13.286L19.998 3.58 36.5 13.286V38.5z" />
      <Path
        fill="#7496c4"
        d="M19.998 4.16L36 13.572V38H4V13.572L19.998 4.16m0-1.16L3 13v26h34V13L19.998 3z"
      />
      <Path fill="#b5ddf5" d="M4 34h32v4H4z" />
      <Path
        fill="#f78f8f"
        d="M19.998 4.645L1.5 15.955v-3.059l18.498-11.31L38.5 12.896v3.059z"
      />
      <Path
        fill="#c74343"
        d="M19.998 2.172L38 13.176v1.887L20.519 4.378l-.522-.319-.522.319L2 15.063v-1.887L19.998 2.172m0-1.172L1 12.615v4.231L19.998 5.231 39 16.846v-4.231L19.998 1z"
      />
      <Path fill="#ffc49c" d="M14.5 21.5h11v17h-11z" />
      <Path fill="#a16a4a" d="M25 22v16H15V22h10m1-1H14v18h12V21z" />
      <Path fill="#a16a4a" d="M23 30a1 1 0 100 2 1 1 0 100-2z" />
    </Svg>
  );
}

export default HomeIcon;
