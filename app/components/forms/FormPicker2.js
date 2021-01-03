import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import categoriesApi from "../../api/subcategories";

import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker2({
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const getcategoriesApi = useApi(categoriesApi.getCategories);
  const [subcategory, setSubCategories] = useState();

  useEffect(() => {
    getcategoriesApi.request(values.category.value).then((response) => {
      setSubCategories(response.data);
    });
  }, [values.category.value]);

  return (
    <>
      <Picker
        items={subcategory}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker2;
