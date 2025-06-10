import React, { forwardRef } from "react";
import { TextInput } from "react-native";

const TextField = forwardRef(({ style, ...rest }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={{
        padding: 10,
        color: "#FFFFFF",
        outline: "none",
        ...style,
      }}
      {...rest}
    />
  );
});

export default TextField;
