import { Autocomplete, Box, Chip, InputBase, Popper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
const color = "#d0c7b6";

const CustomPopper = (props) => {
  return <Popper {...props} placement="bottom" sx={{}} />;
};

function ChipAutocomplete({
  index,
  field,
  values,
  handleChange,
  suggestions,
  setFieldValue,
}) {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const value = values.conditions[index].list;
  const inputRef = useRef(null);
  const fieldOne = values.conditions[index].field;

  const getNameOfData = (fieldOne) => {
    switch (fieldOne) {
      case 'Функция растения': // type 11
      case 'Болезнь (как в источнике)': // type 4
      case 'Болезнь животного (как в источнике)': // type 4
      case 'Лекарственная форма': // type 4
      case 'Используемая часть растения': // type 4
      case 'Используемая часть растения (как в источнике)': // type 4
      case 'Способ обработки и запасания': // type 13
      case 'Этноним': // type 4
      case 'Сословие': // type 4
      case 'Место использования': // type 9
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
    const value = inputRef.current.children[0].children[0].value || ""
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
  function handleClearAll() {
    setFieldValue(`conditions.${index}.${field}`, []);
  }

  const handleChangeInput = (e) => {
    if (options?.length>0) setOptions([])
    if (page !== 1) setPage(1);
    const value = e.target.value;
    fetchOptions(values, value, index, suggestions);
  };

  function fetchOptions(values, value, index, suggestions) {
    if (
      values.conditions &&
      values.conditions?.length > 0 &&
      fieldOne &&
      suggestions[fieldOne]
    ) {
      const requestData = {
        text: value,
        textSpace: ` ${value}`,
      };
      if (
        !!suggestions[fieldOne].options.every(
          (r) => r[1].data
        )
      ) {
        suggestions[fieldOne].options.forEach((r, ri) => {
          const requestBody =
            ri === 0
              ? { text: requestData.text }
              : { text: requestData.textSpace };
          r[1].refetch({
            ...requestBody,
            offset: (page - 1) * 10,
          });
        });
      } else {
        suggestions[fieldOne].options.forEach((r, ri) => {
          const requestBody =
            ri === 0
              ? { text: requestData.text }
              : { text: requestData.textSpace };
          r[0]({
            variables: { ...requestBody, offset: (page - 1) * 10 },
          });
        });
      }
    }
  }
  const generateOptions = () => {
    const options_new =
      values.conditions &&
      values.conditions?.length > 0 &&
      fieldOne &&
      suggestions[fieldOne] &&
      suggestions[fieldOne].options.every(
        (r) => r[1].data
      ) //&&
        ? [
            ...new Map(
              suggestions[
                fieldOne
              ].options[0][1].data[nameOfData]
                .map((option) =>
                  suggestions[fieldOne].foldedSuggestions(
                    option
                  )
                )
                .concat(
                  suggestions[
                    fieldOne
                  ].options[1][1].data[nameOfData].map((option) =>
                    suggestions[
                      fieldOne
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
  
  return (
    <Box sx={{ flexGrow: 1, height: "auto" }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        className="field"
        ref={inputRef}
        sx={{
          minHeight: "100%",
          padding: "0",
          border: "0",
          "&>#tags-outlined": {
            paddingLeft: "2px",
          },
        }}
        value={value}
        name={`conditions.${index}.list`}
        clearText={"очистить"}
        openText={"открыть"}
        popupIcon={<ExpandMoreIcon sx={{ color: color }} />}
        onBlur={(e) => {
          handleChange(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleChange(e);
          }
        }}
        PopperComponent={CustomPopper}
        onChange={(e, value, reason) => {
          switch (reason) {
            case "selectOption":
              handleChangeInput({ ...e, target: { value: "" } });
              setFieldValue(`conditions.${index}.list`, value);
              setFieldValue(`conditions.${index}.text`, "");
              break;
            case "removeOption":
              const deletedId = +e.currentTarget.parentElement.id;
              const filteredConditions = values.conditions[index].list.filter(
                (c, i) => i !== deletedId
              );
              handleChangeInput({ ...e, target: { value: "" } });
              setFieldValue(`conditions.${index}.list`, filteredConditions);
              setFieldValue(`conditions.${index}.text`, "");
              break;
            case "clear":
              handleClearAll();
              break;
            case "createOption":
            case "blur":
            default:
              break;
          }
        }}
        renderTags={(value, getTagProps) => {
          return value.map((chip, chipIndex) => {
            return (
              <Chip
                variant="filled"
                {...getTagProps({ chipIndex })}
                id={chipIndex}
                key={"chip-" + chipIndex + "-" + `conditions.${index}.list`}
                label={chip}
              />
            );
          });
        }}
        options={generateOptions()}
        filterSelectedOptions
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <InputBase
              placeholder="Введите текст для поиска"
              {...params.InputProps}
              {...rest}
              type="text"
              variant="outlined"
              sx={{
                width: "100%",
                minHeight: "50px"
              }}
              onFocus={handleChangeInput}
              onChange={handleChangeInput}
            />
          );
        }}
        clearIcon={<ClearIcon />}
        ListboxProps={{
          onScroll: handleScroll,
        }}
      />
    </Box>
  );
}

export default ChipAutocomplete;