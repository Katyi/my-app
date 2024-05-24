import { Autocomplete, InputBase } from "@mui/material";
import { Field } from "formik";
import { useEffect, useRef, useState } from "react";

function ExactAutocomplete({
  index,
  values,
  handleChange,
  suggestions,
  setFieldValue,
}) {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);
  const fieldOne = values.conditions[index].field;

  const getNameOfData = (fieldOne) => {
    switch (fieldOne) {
      case 'Функция растения':
      case 'Болезнь (как в источнике)':
      case 'Болезнь животного (как в источнике)':
      case 'Лекарственная форма':
      case 'Используемая часть растения':
      case 'Используемая часть растения (как в источнике)':
      case 'Способ обработки и запасания':
      case 'Этноним':
        case 'Место использования':
        return 'plantUsages'
      default:
        return 'usages'
    }
  };
  const nameOfData = getNameOfData(fieldOne);

  useEffect(() => {
    if (page > 1) loadMoreOptions();
  }, [page]);

  const loadMoreOptions = () => {
    console.log("загружаем следующую страницу", page);
    const value = inputRef.current.children[0].children[0].value || "";
    setOptions([...generateOptions()]);
    fetchOptions(values, value, index, suggestions);
  };
  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;
    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 1) {
      setPage((p) => p + 1);
    }
  };
  const generateOptions = () => {
    const options_new =
      values.conditions &&
      values.conditions.length > 0 &&
      values.conditions[index].field &&
      suggestions[values.conditions[index].field] &&
      suggestions[values.conditions[index].field].options.every(
        (r) => r[1].data
      )
        ? [
            ...new Map(
              suggestions[
                values.conditions[index].field
              ].options[0][1].data[nameOfData]
                .map((option) =>
                  suggestions[values.conditions[index].field].foldedSuggestions(
                    option
                  )
                )
                .concat(
                  suggestions[
                    values.conditions[index].field
                  ].options[1][1].data[nameOfData].map((option) =>
                    suggestions[
                      values.conditions[index].field
                    ].foldedSuggestions(option)
                  )
                )
                .flat(1)
                .map((e) => [e, ""])
            ).keys(),
          ]
        : [];
    return [...new Set([...options, ...options_new])];
  };
  function fetchOptions(values, value, index, suggestions) {
    if (
      values.conditions &&
      values.conditions.length > 0 &&
      values.conditions[index].field &&
      suggestions[values.conditions[index].field]
    ) {
      const requestData = {
        text: value,
        textSpace: ` ${value}`,
      };
      if (
        !!suggestions[values.conditions[index].field].options.every(
          (r) => r[1].data
        )
      ) {
        suggestions[values.conditions[index].field].options.forEach((r, ri) => {
          const requestBody =
            ri === 0
              ? {
                  text: requestData.text,
                }
              : {
                  text: requestData.textSpace,
                };
          r[1].refetch({
            ...requestBody,
            offset: (page - 1) * 10,
          });
        });
        // suggestions[
        //   values.conditions[index].field
        // ].options[1].refetch({
        //   ...requestData,
        // });
      } else {
        suggestions[values.conditions[index].field].options.forEach((r, ri) => {
          const requestBody =
            ri === 0
              ? {
                  text: requestData.text,
                }
              : {
                  text: requestData.textSpace,
                };
          r[0]({
            variables: {
              ...requestBody,
              offset: (page - 1) * 10,
            },
          });
        });
        // suggestions[
        //   values.conditions[index].field
        // ].options[0]({
        //   variables: { ...requestData },
        // });
      }
    }
  }
  const handleChangeInput = (e) => {
    if (options.length > 0) setOptions([]);
    if (page !== 1) setPage(1);
    const value = e.target.value;
    fetchOptions(values, value, index, suggestions);
  };

  return (
    <Autocomplete
      // component={Field}
      fullWidth
      freeSolo
      ref={inputRef}
      name={`conditions.${index}.text`}
      // value={values.conditions[index].text}
      value={`${values.conditions[index].text}`}
      onBlur={(e) => {
        handleChange(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleChange(e);
        }
      }}
      onChange={(e, value, reason) => {
        if (reason === "clear") {
          setFieldValue(`conditions.${index}.text`, "");
        } else {
          setFieldValue(`conditions.${index}.text`, value);
        }
      }}
      sx={{
        height: "100%",
        padding: "0",
        border: "0",
      }}
      options={generateOptions()}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <InputBase
            name={`conditions.${index}.text`}
            placeholder="Введите текст для поиска"
            type="text"
            {...params.InputProps}
            {...rest}
            variant="outlined"
            sx={{
              width: "100%",
            }}
            onChange={handleChangeInput}
            onFocus={handleChangeInput}
          />
        );
      }}
      ListboxProps={{
        onScroll: handleScroll,
      }}
    />
  );
}
export { ExactAutocomplete };
