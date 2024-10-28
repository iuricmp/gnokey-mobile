import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GnoNativeApi, KeyInfo } from "@gnolang/gnonative";
import { ThunkExtra } from "@/src/providers/redux-provider";

export interface State {
  vaultToEdit: KeyInfo | undefined;
}

const initialState: State = {
  vaultToEdit: undefined,
};

interface SaveChangesParam {
  newName: string;
}

interface DeleteVaultParam {
  vault: KeyInfo;
}

export const deleteVault = createAsyncThunk<boolean, DeleteVaultParam, ThunkExtra>("vault/deleteVault", async (param, thunkAPI) => {
  const gnonative = thunkAPI.extra.gnonative as GnoNativeApi;
  const { vault } = param;

  await gnonative.deleteAccount(vault.name, undefined, true);

  return true
})

export const saveChanges = createAsyncThunk<boolean, SaveChangesParam, ThunkExtra>("vault/saveChanges", async (param, thunkAPI) => {
  const { newName } = param;

  const gnonative = thunkAPI.extra.gnonative as GnoNativeApi;

  // TODO: Implement the save changes logic using the gnonative.

  return true;
});

export const vaultSlice = createSlice({
  name: "vaultEdit",
  initialState,
  reducers: {
    setVaultToEdit: (state, action) => {
      state.vaultToEdit = action.payload.vault;
    }
  },
  selectors: {
    selectVaultToEdit: (state) => state.vaultToEdit,
  },
});

export const { setVaultToEdit } = vaultSlice.actions;

export const { selectVaultToEdit } = vaultSlice.selectors;
