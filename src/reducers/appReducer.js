import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const generateResponseData = createAsyncThunk("exhibition/search", async (data, state) => {
    try {
      const { abortController, obj } = data;
      abortController.current = new AbortController();
      const response = await fetch(`/api/v1/exhibition/search/`, {
        signal: abortController.current.signal,
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const res = await response.json();
      return res;
    } catch (error) {
      console.log(`Ошибка передачи запроса ${error}`);
    } finally {
      // console.log(`${23}`)
    }
  }
);


const initialState = {
  data: false,
  result: null,
  loading:false,
  simpleFilter: [],
  temporary: null,
  advancedForm:[],
  yearPeriod:[1000,1825],
  fields: [
    { rus: "Лексема", formikName: "lexeme", type: 1,  path: "citation.lexema", pathLink: "lexeme.id", pathLinkName: "lexeme",  },
    { formikName: "copyOfOriginal", rus: "Источник", path: "citation.copyOfOriginal.encoding", pathLink: "citation.copyOfOriginal.id", pathLinkName: "source", },
    { formikName: "scientificName", rus: "Ботаническое название растения (лат.)", path: "scientificName", pathLinkName: "plant", },
  ],
};

const phytolexSlice = createSlice({
  name: "phytolex",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = Boolean(action.payload);
    },
    setAdvancedForm(state, action) {
      if (!!action.payload?.conditions) {
        state.advancedForm = action.payload.conditions
      }   else {
        state.advancedForm = []
      }
      if (!!action.payload?.yearPeriod) {
        state.yearPeriod = action.payload.yearPeriod
      }
    },
    addSimpleFilter(state, action) {
      if (state.simpleFilter[action.payload]) {
      } else {
        state.simpleFilter.push(action.payload);
      }
    },
    setFields(state, action) {
      if (Array.isArray(action.payload)) {
        state.fields = [...state.fields, ...action.payload]
      } else {
        state.fields = [...state.fields, action.payload]
      }
    },
    removeSimpleFilter(state, action) {
      state.simpleFilter = state.simpleFilter.filter(
        (element) => element !== action.payload
      );
    },
    removeField(state, action) {
      state.fields = state.fields.filter(
        (element) => element.formikName !== action.payload
      );
    },
    clearAllFields(state) {
      state.fields = initialState.fields
    },
    clearSimpleFilter(state, action) {
      state.simpleFilter = [];
    },
    setResultDataSet(state, action) {
      // const { usagesConnection } = action.payload;
      state.result = action.payload;
    },
    clearResultDataSet(state) {
      state.result = null;
    },
  },
  // extraReducers: {
  //   [generateResponseData.pending]: (state, action) => {},
  //   [generateResponseData.fulfilled]: (state, action) => {},
  // },
  // extraReducers: (builder) => {
  //   builder
  //     .pending(generateResponseData.pending, (state, action) => {})
  //     .fulfilled(generateResponseData.fulfilled, (state, action) => {})
  // },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setResultDataSet,
  addSimpleFilter,
  clearSimpleFilter,
  removeSimpleFilter,
  clearResultDataSet,
  setAdvancedForm,
  setFields,
  removeField,
  clearAllFields,
} = phytolexSlice.actions;

export default phytolexSlice.reducer;
