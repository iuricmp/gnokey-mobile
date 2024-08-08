// @generated by protoc-gen-connect-es v1.4.0
// @generated from file gnokey_mobile_rpc.proto (package land.gno.gnokey_mobile.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetRemoteRequest, GetRemoteResponse, ListKeyInfoRequest, ListKeyInfoResponse, SignTxRequest, SignTxResponse } from "./gnonativetypes_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * GnokeyMobileService is the service for dapps to interact with Gnokey Mobile
 *
 * @generated from service land.gno.gnokey_mobile.v1.GnokeyMobileService
 */
export const GnokeyMobileService = {
  typeName: "land.gno.gnokey_mobile.v1.GnokeyMobileService",
  methods: {
    /**
     * Get the connection address for the remote node as configured by the Gnokey Mobile app
     *
     * @generated from rpc land.gno.gnokey_mobile.v1.GnokeyMobileService.GetRemote
     */
    getRemote: {
      name: "GetRemote",
      I: GetRemoteRequest,
      O: GetRemoteResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Get the information for all keys in the keybase
     *
     * @generated from rpc land.gno.gnokey_mobile.v1.GnokeyMobileService.ListKeyInfo
     */
    listKeyInfo: {
      name: "ListKeyInfo",
      I: ListKeyInfoRequest,
      O: ListKeyInfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Sign the transaction using the active account.
     * If no active account has been set with SelectAccount, return [ErrCode](#land.gno.gnonative.v1.ErrCode).ErrNoActiveAccount.
     * If the password is wrong, return [ErrCode](#land.gno.gnonative.v1.ErrCode).ErrDecryptionFailed.
     *
     * @generated from rpc land.gno.gnokey_mobile.v1.GnokeyMobileService.SignTx
     */
    signTx: {
      name: "SignTx",
      I: SignTxRequest,
      O: SignTxResponse,
      kind: MethodKind.Unary,
    },
  }
};
