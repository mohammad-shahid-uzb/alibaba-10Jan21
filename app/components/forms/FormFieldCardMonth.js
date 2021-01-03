import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

function FormFieldCardMonth({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  const date = values.expire.replace(/^(\d\d)(\d)$/g, "$1/$2");

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={date}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormFieldCardMonth;

// addSlash(str) {
//     let newStr = "";
//     let len = str.length;
//     for (let i = 0; i<len; i++) {
//         newStr = newStr + str[i];
//         while(newStr.length % 2 === 0) {
//             newStr = newStr + "/";
//         }
//     }
//     return newStr.substr(0, newStr.length-1);
// }
